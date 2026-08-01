const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userModel = require("../models/user.model");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;

                let user = await userModel.findOne({ email });

                if (!user) {
                    // Generate a unique username
                    let username = profile.displayName.replace(/\s+/g, "").toLowerCase();

                    let usernameExists = await userModel.findOne({ username });

                    while (usernameExists) {
                        username = username + Math.floor(Math.random() * 10000);

                        usernameExists = await userModel.findOne({ username });
                    }

                    // Random hashed password
                    const randomPassword = await bcrypt.hash( Math.random().toString(36), 10 );

                    user = await userModel.create({
                        username,
                        email,
                        password: randomPassword,
                    });
                }

                const token = jwt.sign(
                    {
                        id: user._id,
                        username: user.username,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1d",
                    }
                );

                return done(null, {
                    user,
                    token,
                });

            } catch (err) {
                return done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;