import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import Loader from "../components/Loader"

const features = [
    {
        icon: "</>",
        title: "Technical questions",
        desc: "Master coding challenges and system design tailored to your target role."
    },
    {
        icon: "🧠",
        title: "Behavioral questions",
        desc: "Nail the STAR method with AI-driven feedback on your responses."
    },
    {
        icon: "🗓",
        title: "7 day roadmap plan",
        desc: "Follow a structured, daily preparation schedule to stay on track."
    },
    {
        icon: "📄",
        title: "ATS downloadable resume",
        desc: "Generate and export optimized resumes that pass automated screening."
    }
]

const Register = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const { loading, handleRegister, error, clearError } = useAuth()

    useEffect(() => {
        clearError()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const success = await handleRegister({ username, email, password })

        if (success) {
            navigate("/")
        }
    }

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`;
    };

    if (loading) {
        return <Loader message="Creating your account..." />
    }

    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumberOrSymbol = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);

    const isPasswordValid = hasMinLength && hasUppercase && hasNumberOrSymbol;

    return (
        <main>
            <div className="brand-header">
                <img src="/assets/ai_interview_prep_logo.png" alt="logo" className="brand-logo" />
                <span>InterviAI</span>
            </div>

            <div className="auth-layout">
                <div className="pitch-panel">
                    <h1>Start Your Journey Towards <span className="highlight">Success.</span></h1>

                    <ul className="feature-list">
                        {features.map((f, i) => (
                            <li key={i}>
                                <div className="feature-icon">{f.icon}</div>
                                <div>
                                    <h3>{f.title}</h3>
                                    <p>{f.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="form-container">
                    <h1>Create Account</h1>

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                onChange={(e) => { setUsername(e.target.value) }}
                                type="text" id="username" name='username' placeholder='Enter username' />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="email" id="email" name='email' placeholder='Enter email address' />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-wrapper">
                                <input
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    type={showPassword ? "text" : "password"}
                                    id="password" name='password' placeholder='Create password' />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "🙈" : "👁"}
                                </button>
                            </div>
                        </div>

                        <div className="password-checklist">
                            <span className={hasMinLength ? "valid" : ""}>✓ Minimum 8 chars</span>
                            <span className={hasUppercase ? "valid" : ""}>✓ One Uppercase</span>
                            <span className={hasNumberOrSymbol ? "valid" : ""}>✓ One Number/Symbol</span>
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button className='button primary-button' disabled={!isPasswordValid}>Register</button>

                        <div className="oauth-divider">
                            <span>OR</span>
                        </div>

                        <button type="button" className="google-button" onClick={handleGoogleLogin}>
                            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z" />
                                <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18z" />
                                <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33z" />
                                <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58z" />
                            </svg>
                            Continue with Google
                        </button>

                    </form>

                    <p>Already have an account? <Link to={"/login"}>Login</Link></p>
                </div>
            </div>
        </main>
    )
}

export default Register