const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("./config/google.strategy");

const app = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://ai-interview-preparation-coral.vercel.app",
        ],
        credentials: true,
    })
);

// Express Session (required by Passport)
app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
        },
    })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

/* API Routes */
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;