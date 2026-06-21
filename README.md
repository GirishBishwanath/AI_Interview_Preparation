# 🎯 AI Interview Preparation Platform

![Stack](https://img.shields.io/badge/Stack-MERN-green)
![AI](https://img.shields.io/badge/AI-Gemini-blueviolet)
![Auth](https://img.shields.io/badge/Auth-JWT-orange)

> An AI-powered full-stack web application that analyzes your resume and a target job description to generate personalized interview questions, ideal answers, a tailored resume, and a structured day-by-day preparation roadmap.

🔗 **Live Demo:** [ai-interview-preparation-coral.vercel.app](https://ai-interview-preparation-coral.vercel.app)
📦 **Repo:** [github.com/GirishBishwanath](https://github.com/GirishBishwanath)

---

## ✨ Features

- 🔐 **User Authentication** — Register, login, and logout with JWT-secured sessions
- 📄 **Resume & JD Upload** — Upload your resume (PDF/DOCX) and paste the job description
- 🤖 **AI-Generated Questions** — Technical and behavioral questions tailored to the role, powered by the Gemini API
- 🗺️ **Personalized Roadmap** — A structured day-by-day prep plan based on your identified skill gaps
- 📝 **AI Resume Builder** — Generates a new, tailored resume rewritten to match the target job description's keywords and requirements
- 📥 **Downloadable Resume** — Export and download the tailored resume directly from the app
- 📱 **Responsive UI** — Clean, modern interface that works across all screen sizes

---

## 🛠️ Tech Stack

| Layer      | Technology                              |
|------------|------------------------------------------|
| Frontend   | React, Vite, SCSS, React Router DOM     |
| Backend    | Node.js, Express.js                     |
| Database   | MongoDB (Mongoose ODM)                  |
| AI Service | Google Gemini API                       |
| Auth       | JWT (JSON Web Tokens)                   |

---

## ☁️ Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

Two production issues came up during deployment, worth noting for anyone replicating this setup:
- **CORS blocked by a trailing slash** — the Vercel origin in the backend's CORS config must exactly match the deployed URL with no trailing `/`.
- **404 on direct route refresh** — client-side routes like `/login` returned 404 on Vercel until a `vercel.json` rewrite was added to redirect all paths to `index.html`, letting React Router handle routing.

---

## 📁 Project Structure

```
AI_Interview_Prep/
├── Backend/
│   ├── package.json
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── config/          # DB connection, env config
│       ├── controllers/     # Route handler logic
│       ├── middlewares/     # Auth, error handling
│       ├── models/          # Mongoose schemas
│       ├── routes/          # Express routers
│       └── services/        # AI integration, file parsing, resume generation
│
├── Frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── app.routes.jsx
│       ├── features/        # Page components (Home, Interview, Resume Builder, etc.)
│       └── style/           # Global SCSS files
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- npm
- MongoDB (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Google Gemini API key](https://ai.google.dev/)

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
```

> ⚠️ Never commit your `.env` file. It is already included in `.gitignore`.

If your frontend makes API calls via an environment variable, create a `.env` file inside `Frontend/`:
```env
VITE_BACKEND_URL=http://localhost:5000
```

> ⚠️ Always include the `https://` (or `http://`) prefix in this URL — a missing protocol causes the browser to treat it as a relative path instead of an absolute backend URL in production.

---

## 📖 Usage

1. **Register** a new account or **log in** to an existing one.
2. On the home page, **paste the job description** and **upload your resume** (PDF or DOCX, max 5MB).
3. Click **"Generate My Interview Strategy"** and wait ~30 seconds for the AI to analyze your profile.
4. Browse your **Technical Questions**, **Behavioral Questions**, and **7-Day Preparation Roadmap**.
5. Review identified **Skill Gaps** and use the roadmap to close them before your interview.
6. Use the **Resume Builder** to generate a new resume tailored to the job description's keywords and requirements, then download it directly from the app.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.