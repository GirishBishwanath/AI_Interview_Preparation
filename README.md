# 🎯 AI Interview Prep

> An AI-powered full-stack web application that analyzes your resume and a target job description to generate personalized interview questions, ideal answers, and a structured day-by-day preparation roadmap.

---

## ✨ Features

- 🔐 **User Authentication** — Register, login, and logout with JWT-secured sessions
- 📄 **Resume & JD Upload** — Upload your resume (PDF/DOCX) and paste the job description
- 🤖 **AI-Generated Questions** — Technical and behavioral questions tailored to the role
- 🗺️ **Personalized Roadmap** — A structured day-by-day prep plan based on your skill gaps
- 📥 **Downloadable Resume** — Export and share your resume directly from the app
- 📱 **Responsive UI** — Clean, modern interface that works across all screen sizes

---

## 🛠️ Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React, Vite, SCSS, React Router DOM     |
| Backend   | Node.js, Express.js                     |
| Database  | MongoDB (Mongoose ODM)                  |
| AI Service| Pluggable — OpenAI API / Google Gemini  |
| Auth      | JWT (JSON Web Tokens)                   |

---

## 📁 Folder Structure

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
│       └── services/        # AI integration, file parsing
│
├── Frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── app.routes.jsx
│       ├── features/        # Page components (Home, Interview, etc.)
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

---

### Backend Setup

```bash
cd Backend
npm install
npm run dev
```

The backend server will start on `http://localhost:5000` by default.

---

### Frontend Setup

```bash
cd Frontend
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
AI_API_KEY=your_openai_or_gemini_api_key
```

> ⚠️ Never commit your `.env` file. It is already included in `.gitignore`.

---

## 📖 Usage

1. **Register** a new account or **log in** to an existing one.
2. On the home page, **paste the job description** and **upload your resume** (PDF or DOCX, max 5MB).
3. Click **"Generate My Interview Strategy"** and wait ~30 seconds for the AI to analyze your profile.
4. Browse your **Technical Questions**, **Behavioral Questions**, and **7-Day Preparation Roadmap**.
5. Review identified **Skill Gaps** and use the roadmap to close them before your interview.

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