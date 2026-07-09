# 💰 Expense Tracker

A full-stack MERN (MongoDB, Express, React, Node.js) web application for tracking personal income and expenses, built as a 4-member college group project.

![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started (Local Setup)](#-getting-started-local-setup)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Testing](#-testing)
- [Deployment Guide](#-deployment-guide)
- [Screenshots](#-screenshots)
- [Team & Git Workflow](#-team--git-workflow)
- [Git Commit History](#-git-commit-history-example)

---

## ✨ Features

**Authentication**
- Signup / Login / Logout with JWT sessions
- Passwords hashed with bcrypt
- Protected routes (frontend + backend)
- Forgot password flow (bonus)

**Dashboard**
- Total balance, total income, total expenses
- Monthly income vs. expenses bar chart
- Spending-by-category pie chart
- Recent transactions list

**Expense Management**
- Add / edit / delete / search / filter expenses
- Fields: title, amount, category, note, date
- Categories: Food, Travel, Shopping, Bills, Education, Health, Entertainment, Others

**Income Management**
- Add / edit / delete income entries
- Sources: Salary, Freelancing, Investments, Others

**Reports**
- Monthly & yearly breakdowns
- Pie / bar / line charts
- Export to CSV and PDF

**Profile & Settings**
- Update name/email, change password
- Dark / light mode toggle
- Notification preferences

**UI/UX**
- Fully responsive (mobile, tablet, desktop)
- Sidebar + navbar layout, toast notifications, loading spinners

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS, React Router, Axios, Chart.js |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT + bcrypt |
| Deployment | Vercel (frontend) · Render (backend) · MongoDB Atlas (DB) |
| CI | GitHub Actions |

---

## 📁 Folder Structure

```
expense-tracker/
├── client/                      # React frontend (Vite)
│   ├── src/
│   │   ├── components/          # Reusable UI components + charts/
│   │   ├── pages/                # Route-level pages
│   │   ├── context/              # AuthContext, ThemeContext
│   │   ├── services/              # Axios API service modules
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/                      # Express backend
│   ├── controllers/
│   ├── models/                   # User, Expense, Income
│   ├── routes/
│   ├── middleware/                # auth + error handling
│   ├── config/                   # db.js
│   ├── utils/                     # token + validators
│   ├── tests/                    # Jest + Supertest
│   ├── server.js
│   └── package.json
├── .github/workflows/ci.yml     # GitHub Actions CI
├── vercel.json                  # Vercel deployment config
├── render.yaml                  # Render deployment config
├── .env.example (client & server)
└── README.md
```

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js 18+ and npm
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone the repo
```bash
git clone https://github.com/<your-org>/expense-tracker.git
cd expense-tracker
```

### 2. Backend setup
```bash
cd server
npm install
cp .env.example .env       # then fill in your own MONGO_URI and JWT_SECRET
npm run dev                # starts on http://localhost:5000
```

### 3. Frontend setup
Open a second terminal:
```bash
cd client
npm install
cp .env.example .env       # VITE_API_URL=http://localhost:5000/api
npm run dev                # starts on http://localhost:5173
```

### 4. Open the app
Visit `http://localhost:5173`, sign up for a new account, and start tracking!

---

## 🔑 Environment Variables

**server/.env**
```
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=replace_with_a_long_random_string
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

**client/.env**
```
VITE_API_URL=http://localhost:5000/api
```

> ⚠️ Never commit real `.env` files. Only `.env.example` files are tracked in git.

---

## 📡 API Documentation

Base URL (local): `http://localhost:5000/api`

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/signup` | Public | Register a new user |
| POST | `/auth/login` | Public | Log in, returns JWT + user |
| POST | `/auth/logout` | Private | Clear auth cookie |
| POST | `/auth/forgot-password` | Public | Generate a password reset token |
| POST | `/auth/reset-password/:token` | Public | Reset password using token |

### Expenses
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/expenses` | Private | List expenses (supports `?search=&category=&startDate=&endDate=&page=&limit=`) |
| POST | `/expenses` | Private | Create an expense |
| PUT | `/expenses/:id` | Private | Update an expense |
| DELETE | `/expenses/:id` | Private | Delete an expense |

### Income
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/income` | Private | List income entries (supports `?search=&source=&startDate=&endDate=&page=&limit=`) |
| POST | `/income` | Private | Create an income entry |
| PUT | `/income/:id` | Private | Update an income entry |
| DELETE | `/income/:id` | Private | Delete an income entry |

### Profile
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/profile` | Private | Get current user's profile |
| PUT | `/profile` | Private | Update name/email/avatar/password |

### Reports (dashboard/report aggregation)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/reports/summary` | Private | Total income, expenses, balance, recent transactions |
| GET | `/reports/monthly?year=2026` | Private | Month-by-month income vs expenses |
| GET | `/reports/by-category` | Private | Expense totals grouped by category |

All private routes require an `Authorization: Bearer <token>` header (the token is also set as an httpOnly cookie on login).

---

## 🗄 Database Schema

**User**
```js
{ name, email (unique), password (hashed), avatar, resetPasswordToken, resetPasswordExpire, createdAt }
```

**Expense**
```js
{ userId (ref User), title, amount, category (enum), note, date, createdAt }
```

**Income**
```js
{ userId (ref User), source (enum), amount, note, date, createdAt }
```

---

## 🧪 Testing

Backend tests use **Jest + Supertest** and hit a real MongoDB connection (point `MONGO_URI` at a disposable test database/cluster — never production data).

```bash
cd server
npm test
```

Covers: signup/login/duplicate-email validation, protected-route rejection without a token, and full expense CRUD flow.

---

## ☁️ Deployment Guide

### Frontend → Vercel
1. Push the repo to GitHub.
2. In Vercel, "Add New Project" → import the repo.
3. **Root Directory**: `client`
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. Add environment variable: `VITE_API_URL=https://<your-render-service>.onrender.com/api`
7. Deploy. (A ready-made `vercel.json` at the repo root already encodes these settings if you deploy from the repo root instead.)

### Backend → Render
1. In Render, "New Web Service" → connect the repo.
2. **Root Directory**: `server`
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL` (your Vercel URL), `NODE_ENV=production`.
6. Deploy. (`render.yaml` at the repo root can also be used for "Blueprint" deploys.)

### Database → MongoDB Atlas
1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a database user (username/password).
3. Under **Network Access**, add `0.0.0.0/0` (allow from anywhere) for simplicity in a college project, or your Render service's static IP for tighter security.
4. Copy the connection string, replace `<password>`, and use it as `MONGO_URI`.

### CORS
The backend's `CLIENT_URL` env var must exactly match the deployed frontend origin (no trailing slash), or the browser will block requests from Vercel to Render.

---

## 📸 Screenshots

> Add screenshots here after running the app locally:
- `docs/screenshots/landing.png`
- `docs/screenshots/dashboard.png`
- `docs/screenshots/expenses.png`
- `docs/screenshots/reports.png`

---

## 👥 Team & Git Workflow

| Member | Module | Responsibilities |
|---|---|---|
| Member 1 | Authentication | Landing page, signup, login, logout, JWT setup, protected routes |
| Member 2 | Dashboard | Dashboard layout, sidebar, navbar, stat cards, charts |
| Member 3 | Expense & Income | CRUD for expenses/income, categories, search, filters |
| Member 4 | Reports & Deployment | Reports, profile, settings, deployment, testing, docs |

**Branching model**
- `main` — protected, production-ready code only
- `member1-auth`, `member2-dashboard`, `member3-expense`, `member4-report` — feature branches
- All changes land in `main` via **Pull Requests** with at least one reviewer; no direct pushes to `main`.

```bash
git checkout -b member1-auth
# ... work, commit ...
git push origin member1-auth
# open a PR into main on GitHub
```

---

## 📝 Git Commit History (example)

A realistic commit log spanning the project lifecycle:

```
1.  Initial project setup
2.  Setup React frontend with Vite
3.  Setup Express backend
4.  Connect MongoDB Atlas
5.  Create User model
6.  Implement signup API
7.  Implement login API
8.  Add JWT auth middleware
9.  Build protected route wrapper
10. Build dashboard layout (sidebar + navbar)
11. Implement expense CRUD (backend)
12. Implement expense CRUD (frontend)
13. Implement income CRUD (backend + frontend)
14. Add search and category filters
15. Integrate Chart.js (pie, bar, line)
16. Build reports module with CSV/PDF export
17. Build profile page + change password
18. Add dark/light mode toggle
19. Apply responsive design across breakpoints
20. Add input validation (client + server)
21. Add global error handling middleware
22. Add Jest/Supertest test suite
23. Configure GitHub Actions CI
24. Configure Vercel + Render deployment
25. Finalize documentation
```

---

## 📄 License

MIT — built for educational purposes as a college group project.
