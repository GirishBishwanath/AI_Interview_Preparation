<p align="center">
  <img src="./Frontend/public/assets/ai_interview_prep_logo.png" alt="InterviAI logo" width="96" />
</p>

<h1 align="center">InterviAI</h1>

<p align="center">
  AI-powered interview preparation built around your target role, profile, and skill gaps.
</p>

<p align="center">
  <a href="https://ai-interview-preparation-coral.vercel.app/">Live Demo</a>
  &nbsp;•&nbsp;
  <a href="https://github.com/GirishBishwanath/AI_Interview_Preparation">Source Code</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite 7" />
  <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" alt="Express 5" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/AI-Google%20Gemini-4285F4?logo=googlegemini&logoColor=white" alt="Google Gemini" />
  <img src="https://img.shields.io/badge/Auth-JWT%20%2B%20Google%20OAuth-8A2BE2" alt="JWT and Google OAuth" />
  <img src="https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Backend-Render-46E3B7?logo=render&logoColor=111111" alt="Render" />
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License" /></a>
</p>

---

## Overview

**InterviAI** is a full-stack AI interview preparation platform that turns a target job description and candidate profile into a structured preparation plan.

The application can generate:

- Role-specific **technical interview questions**
- **Behavioral questions** with interviewer intent and model answers
- A **match score** between the candidate profile and target role
- **Skill-gap analysis**
- A structured **7-day preparation roadmap**
- A tailored, **ATS-oriented resume** that can be exported as a PDF
- Saved **interview plans** that can be revisited later

The project is designed as a real deployed application rather than a single AI prompt demo, with authentication, persistent reports, protected API routes, Google OAuth, server-side AI orchestration, and PDF generation.

## Product Preview

The following screenshots show the complete user journey from authentication through AI-generated interview preparation and resume export.

<table>
  <tr>
    <th width="50%">Register</th>
    <th width="50%">Login</th>
  </tr>
  <tr>
    <td valign="top"><img src="./assets/screenshots/01-register.png" alt="InterviAI registration page" width="100%" /></td>
    <td valign="top"><img src="./assets/screenshots/02-login.png" alt="InterviAI login page" width="100%" /></td>
  </tr>
</table>

### Create an Interview Plan

<img src="./assets/screenshots/03-home.png" alt="InterviAI interview plan creation page" width="100%" />

### Technical Questions

<img src="./assets/screenshots/04-technical-questions.png" alt="InterviAI technical interview questions" width="100%" />

### Behavioral Questions

<img src="./assets/screenshots/05-behavioral-questions.png" alt="InterviAI behavioral interview questions" width="100%" />

### 7-Day Preparation Roadmap

<img src="./assets/screenshots/06-roadmap.png" alt="InterviAI seven day preparation roadmap" width="100%" />

### Generated ATS-Oriented Resume

<img src="./assets/screenshots/07-generated-resume.png" alt="InterviAI generated resume PDF" width="100%" />

> **Screenshot assets:** all product screenshots are stored under [`assets/screenshots/`](./assets/screenshots/) so the README remains reproducible and the images are versioned with the repository.

---

## Core Features

### Authentication & Account Management

- Email/password registration and login
- JWT authentication stored in **HTTP-only cookies**
- Google OAuth 2.0 through Passport.js
- Protected frontend routes and protected backend APIs
- Automatic session restoration through `GET /api/auth/get-me`
- Password visibility toggle
- Registration password checklist
- User-facing authentication errors instead of a single generic error message

### AI Interview Preparation

- Accepts a target job description up to **5,000 characters** in the current frontend
- Generates technical and behavioral questions using Google Gemini
- Produces an interviewer **intention** for each question
- Produces a corresponding **model answer**
- Calculates a **0–100 match score**
- Identifies skill gaps
- Creates a structured preparation roadmap
- Persists generated reports in MongoDB

### Resume & PDF Generation

- Resume upload through the web interface
- Server-side resume text extraction for supported PDF uploads
- AI-generated tailored resume content
- HTML-to-PDF generation with Puppeteer Core and `@sparticuz/chromium`
- Direct **Download Resume** workflow from the interview report

### Frontend Experience

- Dark SaaS-style visual design
- Custom InterviAI logo and favicon
- Responsive React UI
- Recent interview-plan history
- Reusable loading state for authentication and AI generation flows
- Expandable technical and behavioral question cards
- Match-score and skill-gap side panel

---

## How It Works

```text
┌──────────────────────┐
│   Candidate Profile  │
│ Resume / Profile     │
└──────────┬───────────┘
           │
           │ + Target Job Description
           ▼
┌──────────────────────────────┐
│        InterviAI Backend     │
│       Node.js + Express      │
└────────────┬─────────────────┘
             │
       ┌─────┴─────────┐
       │               │
       ▼               ▼
┌──────────────┐  ┌────────────────┐
│ Google Gemini│  │ MongoDB Atlas  │
│ AI analysis  │  │ Reports/users  │
└──────┬───────┘  └────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Structured Interview Report  │
│ • Match Score                │
│ • Technical Questions        │
│ • Behavioral Questions       │
│ • Skill Gaps                 │
│ • 7-Day Roadmap              │
└────────────┬─────────────────┘
             │
             ▼
┌──────────────────────────────┐
│ Tailored Resume HTML → PDF   │
│ Puppeteer + Chromium         │
└──────────────────────────────┘
```

---

## Technical Architecture

### Frontend

The frontend is a React application built with Vite. It handles routing, authentication state, interview-plan creation, report navigation, and the interactive report experience.

### Backend

The backend is an Express API responsible for:

- Authentication and session cookies
- Google OAuth callback handling
- JWT verification
- Resume upload handling
- Resume text extraction
- Gemini API orchestration
- Interview report persistence
- Tailored resume generation and PDF export

### Persistence

MongoDB with Mongoose stores users and generated interview reports. Report queries are scoped to the authenticated user for the main report/list endpoints.

### AI Layer

The backend uses Google's `@google/genai` SDK and requests structured JSON output validated against a Zod schema. The generated data is then stored as an interview report rather than being returned as unstructured text only.

### PDF Layer

Resume output is generated as HTML and rendered server-side into an A4 PDF using Puppeteer Core and `@sparticuz/chromium`, making the generated document downloadable from the application.

---

## Authentication & Security

The current authentication design uses:

```text
Email/Password ───────┐
                      │
Google OAuth 2.0 ─────┼──> JWT ──> HTTP-only Cookie
                      │
                      └──> Protected API Requests
```

Security-related implementation details include:

- Password hashing with `bcryptjs`
- JWT-based authentication
- HTTP-only authentication cookies
- Production cookie settings using `secure` and `sameSite: none` for the cross-origin deployment model
- Auth middleware on protected interview endpoints
- User-scoped report retrieval for normal interview-report APIs
- Passport.js for Google OAuth 2.0

> **Security note:** one remaining hardening item is the resume-PDF generation controller, which should verify that the requested report belongs to the authenticated user before generating the file. This is explicitly called out rather than hidden from repository readers.

---

## API Reference

### Authentication

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/auth/register` | Create an account and issue an auth cookie |
| `POST` | `/api/auth/login` | Authenticate with email/password |
| `GET` | `/api/auth/google` | Start Google OAuth flow |
| `GET` | `/api/auth/google/callback` | Complete Google OAuth flow |
| `GET` | `/api/auth/get-me` | Return the currently authenticated user |
| `GET` | `/api/auth/logout` | Clear the authenticated session |

### Interview Preparation

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/interview/` | Generate and persist an interview plan |
| `GET` | `/api/interview/` | List the authenticated user's interview plans |
| `GET` | `/api/interview/report/:interviewId` | Retrieve one interview plan |
| `POST` | `/api/interview/resume/pdf/:interviewReportId` | Generate/download the tailored resume PDF |

All interview endpoints are protected by authentication middleware.

---

## AI Output Shape

The interview-generation service validates the AI response against a structured schema containing fields such as:

```text
matchScore
technicalQuestions[]
behavioralQuestions[]
skillGaps[]
preparationPlan[]
title
```

Each interview question is designed to carry enough context for the UI to show both the question and the expected reasoning behind it, rather than presenting a flat list of questions.

---

## Project Structure

```text
AI_Interview_Preparation/
├── Backend/
│   ├── package.json
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── config/
│       │   ├── database.js
│       │   └── google.strategy.js
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   └── interview.controller.js
│       ├── middlewares/
│       │   ├── auth.middleware.js
│       │   └── file.middleware.js
│       ├── models/
│       │   ├── user.model.js
│       │   ├── interviewReport.model.js
│       │   └── tokenBlacklist.model.js
│       ├── routes/
│       │   ├── auth.routes.js
│       │   └── interview.routes.js
│       └── services/
│           └── ai.service.js
│
├── Frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json
│   ├── index.html
│   ├── public/
│   │   └── assets/
│   │       └── ai_interview_prep_logo.png
│   └── src/
│       ├── App.jsx
│       ├── app.routes.jsx
│       ├── components/
│       │   └── Loader.jsx
│       └── features/
│           ├── auth/
│           └── interview/
│
├── assets/
│   └── screenshots/
│       ├── 01-register.png
│       ├── 02-login.png
│       ├── 03-home.png
│       ├── 04-technical-questions.png
│       ├── 05-behavioral-questions.png
│       ├── 06-roadmap.png
│       └── 07-generated-resume.png
│
├── LICENSE
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js **20+**
- npm
- MongoDB, either locally or through [MongoDB Atlas](https://www.mongodb.com/atlas)
- Google Gemini API key
- Google Cloud OAuth 2.0 credentials for Google Sign-In

### 1. Clone the repository

```bash
git clone https://github.com/GirishBishwanath/AI_Interview_Preparation.git
cd AI_Interview_Preparation
```

### 2. Configure the backend

```bash
cd Backend
npm install
npm run dev
```

The current backend server implementation listens on:

```text
http://localhost:3000
```

### 3. Configure the frontend

Create `Frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Then run:

```bash
cd ../Frontend
npm install
npm run dev
```

The Vite development server runs on the default local URL:

```text
http://localhost:5173
```

---

## Environment Variables

### Backend — `Backend/.env`

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_jwt_secret
GOOGLE_GENAI_API_KEY=your_gemini_api_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
BACKEND_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

> The current `Backend/server.js` listens on port `3000`. Keep the local `BACKEND_URL` consistent with that value until the server is changed to read a configurable port.

### Frontend — `Frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:3000
```

Never commit real credentials or API keys.

---

## Google OAuth Configuration

For local development, configure the Google OAuth client with a callback URL matching:

```text
http://localhost:3000/api/auth/google/callback
```

For production, the callback must point to the deployed backend URL:

```text
https://<your-backend-domain>/api/auth/google/callback
```

The frontend Google button starts the flow through the backend rather than handling the Google OAuth exchange in the browser.

---

## Deployment

The current deployment topology is:

| Component | Platform |
|---|---|
| React frontend | Vercel |
| Express backend | Render |
| MongoDB | MongoDB Atlas |
| AI provider | Google Gemini API |

For production, keep these values aligned:

```env
NODE_ENV=production
BACKEND_URL=https://<your-render-backend>
FRONTEND_URL=https://<your-vercel-frontend>
```

The backend CORS allowlist must contain the exact frontend origin, without an accidental trailing slash.

The frontend repository contains a Vercel rewrite so client-side routes such as `/login` and `/interview/:interviewId` can be refreshed without returning a static-host 404.

---

## Current Implementation Notes & Limitations

This section intentionally documents places where the UI and backend still need alignment.

### Resume format and size

The current frontend copy advertises **PDF or DOCX, max 5 MB**, but the backend currently uses a **3 MB Multer limit** and the interview controller parses the uploaded buffer through `pdf-parse`. In practice, the current implemented parsing path is PDF-focused.

### Self-description fallback

The UI includes a **Quick Self-Description** path for candidates without a resume, but the current backend generation flow still expects an uploaded file in its primary path. The frontend and backend should be aligned before presenting fileless generation as fully production-complete.

### Automated testing and CI

The repository currently does not contain a dedicated automated test suite or GitHub Actions CI workflow. Adding unit/integration tests and CI validation is an important next engineering step.

### Resume authorization

The resume-PDF endpoint should enforce ownership of the requested interview report against the authenticated user before generating the file.

### Error UX

AI quota/billing failures and other server errors can be surfaced more explicitly in the UI instead of relying on generic error states.

---

## Roadmap

- [ ] Align resume upload validation across frontend and backend; add real DOCX parsing
- [ ] Complete the self-description-only generation path
- [ ] Add ownership checks to resume PDF generation
- [ ] Add automated unit/integration tests
- [ ] Add GitHub Actions CI and deployment checks
- [ ] Improve AI error states for quota, billing, and transient failures
- [ ] Add richer interview-session features and deeper personalization

---

## Development Commands

### Backend

```bash
npm install
npm run dev
npm start
```

### Frontend

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

---

## Contributing

Contributions and engineering improvements are welcome.

```bash
git checkout -b feature/your-feature
git add .
git commit -m "feat: describe your change"
git push origin feature/your-feature
```

Then open a Pull Request with a clear description of the change, implementation details, and verification performed.

---

## License

This project is licensed under the **MIT License**. See [`LICENSE`](./LICENSE) for the full license text.

---

<p align="center">
  Built by <a href="https://github.com/GirishBishwanath">Girish Bishwanath</a>
</p>