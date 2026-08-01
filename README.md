# 🎯 InterviAI

![Stack](https://img.shields.io/badge/Stack-MERN-green)
![AI](https://img.shields.io/badge/AI-Gemini-blueviolet)
![Auth](https://img.shields.io/badge/Auth-JWT%20%2B%20Google%20OAuth-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

> An AI-powered full-stack web application that analyzes your resume and a target job description to generate personalized interview questions, ideal answers, a tailored ATS-friendly resume, and a structured day-by-day preparation roadmap.

🔗 **Live Demo:** [ai-interview-preparation-coral.vercel.app](https://ai-interview-preparation-coral.vercel.app)
📦 **Repo:** [github.com/GirishBishwanath](https://github.com/GirishBishwanath)

---

## ✨ Features

### 🔐 Authentication
- Register, login, and logout with JWT-secured sessions (HTTP-only cookies)
- **Google OAuth 2.0** — one-click "Continue with Google" login/register
- Auto-login on page refresh via a `/get-me` session check
- Password strength validation on registration (min length, uppercase, number/symbol) with a live checklist and submit button that stays disabled until requirements are met
- Show/hide password toggle on both Login and Register
- Meaningful, field-specific error messages (e.g. distinguishing "email already exists" from "username already exists," and "invalid email" from "incorrect password") instead of generic errors

### 📄 Resume & Job Matching
- Upload a resume (PDF or DOCX, max 5MB) via click-to-upload or drag & drop
- Visual confirmation of the uploaded file (filename shown with a remove/replace option) instead of a silent, stateless upload
- Alternative **Quick Self-Description** field for users without a resume handy
- Paste a target job description (up to 5,000 characters, with a live, working character counter)

### 🤖 AI-Generated Interview Prep
- Technical and behavioral interview questions tailored to the target role, powered by the **Google Gemini API**
- Each question includes the interviewer's likely intention and a model answer
- **Match Score** showing how well the candidate's profile fits the job description
- **Skill Gap analysis** with severity ratings (low / medium / high)
- **7-day preparation roadmap** with daily focus areas and actionable tasks

### 📝 AI Resume Builder
- Generates a new resume rewritten and tailored to match the target job description's keywords and requirements
- ATS-friendly formatting
- **Downloadable as a PDF** directly from the app (server-side HTML-to-PDF generation)

### 🖥️ UI/UX
- Complete two-column, dark-themed auth pages (Login & Register) with a feature-highlight panel, matching brand lockup, and consistent card styling
- Reusable animated **Loader** component (spinner + contextual message) replacing static "Loading..." text across the app — used for auth checks, report generation, and protected-route gating
- Recent Interview Plans list with match-score badges
- Responsive layout across screen sizes

### 🏷️ Branding
- Custom neon-style brand mark and app icon
- Consistent dark theme (`#161616` background, `#e1034d` accent) across all pages
- Custom favicon and browser tab title

---

## 🛠️ Tech Stack

| Layer      | Technology                                   |
|------------|-----------------------------------------------|
| Frontend   | React, Vite, SCSS, React Router DOM           |
| Backend    | Node.js, Express.js                           |
| Database   | MongoDB (Mongoose ODM)                        |
| AI Service | Google Gemini API (`gemini-2.5-flash`)        |
| PDF Generation | Puppeteer (HTML → PDF)                    |
| Auth       | JWT (JSON Web Tokens) + Passport.js (Google OAuth 2.0) |
| File Handling | Multer (in-memory resume uploads), pdf-parse |

---

## ☁️ Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

Production issues worth noting for anyone replicating this setup:
- **CORS blocked by a trailing slash** — the Vercel origin in the backend's CORS config must exactly match the deployed URL with no trailing `/`.
- **404 on direct route refresh** — client-side routes like `/login` returned 404 on Vercel until a `vercel.json` rewrite was added to redirect all paths to `index.html`, letting React Router handle routing.
- **Gemini API billing** — preview models (e.g. `gemini-3-flash-preview`) may require prepaid billing credits with no free tier. Stable models like `gemini-2.5-flash` offer a genuine free tier (rate-limited) suitable for development and low-volume use.

---

## 📁 Project Structure

```
AI_Interview_Prep/
├── Backend/
│   ├── package.json
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── config/          # DB connection, Passport/Google strategy, env config
│       ├── controllers/     # Route handler logic (auth, interview)
│       ├── middlewares/     # Auth (JWT), file upload (Multer)
│       ├── models/          # Mongoose schemas (User, InterviewReport, TokenBlacklist)
│       ├── routes/          # Express routers
│       └── services/        # Gemini AI integration, resume PDF generation, file parsing
│
├── Frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json
│   ├── index.html
│   ├── public/
│   │   └── assets/          # Logo, favicon
│   └── src/
│       ├── App.jsx
│       ├── app.routes.jsx
│       ├── components/      # Shared components (Loader, etc.)
│       └── features/
│           ├── auth/        # Login, Register, Protected route, useAuth hook
│           └── interview/   # Home (report generation), Interview (report view), useInterview hook
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- npm
- MongoDB (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Google Gemini API key](https://ai.google.dev/) (with billing/prepay enabled, or using a free-tier-eligible model)
- A [Google Cloud OAuth 2.0 Client ID](https://console.cloud.google.com/) (for Google Sign-In)

---

### Backend Setup

```bash
git clone https://github.com/GirishBishwanath/AI-Interview-Preparation
cd AI-Interview-Preparation/Backend
npm install
npm run dev
```

The backend server will start on `http://localhost:5000` by default.

---

### Frontend Setup

```bash
cd ../Frontend
npm install
npm run dev
```

The frontend dev server will start on `http://localhost:5173` by default.

---

## 🔑 Environment Variables

Create a `.env` file inside the `Backend/` directory with the following keys:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_GENAI_API_KEY=your_gemini_api_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

> ⚠️ Never commit your `.env` file. It is already included in `.gitignore`.

Create a `.env` file inside `Frontend/`:
```env
VITE_API_BASE_URL=http://localhost:5000
```

> ⚠️ Always include the `https://` (or `http://`) prefix in this URL — a missing protocol causes the browser to treat it as a relative path instead of an absolute backend URL in production.

---

## ⚠️ A Note on the Gemini API & Billing

This project uses the Google Gemini API for report generation and resume building. Google's API keys are tied to a Google Cloud project's billing status:

- **Preview models** (e.g. `gemini-3-flash-preview`) typically require prepaid billing credits with no free allowance — using them without funding the project will return `429 RESOURCE_EXHAUSTED` errors.
- **Stable models** (e.g. `gemini-2.5-flash`) offer a genuine free tier (rate-limited to a set number of requests per minute/day) suitable for development.
- If you delete and recreate a Google Cloud project, a new API key does **not** inherit billing from the old project — prepay/billing must be configured again from scratch.
- Check your current usage and billing status any time at [Google AI Studio](https://aistudio.google.com/).

---

## 📖 Usage

1. **Register** a new account or **log in** with email/password or **Google**.
2. On the home page, **paste the job description** and **upload your resume** (PDF or DOCX, max 5MB) — or use the Quick Self-Description field instead.
3. Click **"Generate My Interview Strategy"** and wait ~30 seconds for the AI to analyze your profile.
4. Browse your **Technical Questions**, **Behavioral Questions**, and **7-Day Preparation Roadmap**.
5. Review your **Match Score** and identified **Skill Gaps**, and use the roadmap to close them before your interview.
6. Use **Download Resume** to generate and export a tailored, ATS-friendly resume as a PDF.
7. Revisit past plans anytime from **My Recent Interview Plans**.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 🔜 Roadmap

- [ ] Drag & drop resume upload wired to the same visual upload-confirmation state as click-to-upload
- [ ] Toast/banner-based error handling instead of native browser alerts
- [ ] Distinguish and surface "billing required" vs. "rate limit" AI errors clearly in the UI
- [ ] Additional micro-interactions (hover effects, transitions)
- [ ] Expanded test coverage

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.