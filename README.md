# Flow Ledger

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18+-blue)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)](https://www.mongodb.com/cloud/atlas)
[![Vite](https://img.shields.io/badge/Vite-v5+-purple)](https://vitejs.dev/)
[![Status](https://img.shields.io/badge/Status-Active-success)](https://github.com)

### Modern Personal Finance Tracking Platform

Track income, monitor expenses, visualize financial habits, and manage your money with a clean fintech-inspired experience.

[Live Demo](https://flow-ledger.onrender.com) • [Features](#features) • [Tech Stack](#tech-stack) • [Setup](#installation--setup)

</div>

---

## Overview

Flow Ledger is a full-stack MERN finance tracker built with a modern SaaS-inspired UI and production-ready architecture.

The application allows users to securely manage expenses and income, upload profile pictures, visualize financial analytics through interactive charts, and export reports directly to Excel.

Flow Ledger started as a personal project to learn production-grade MERN deployment, authentication systems, and modern fintech UI architecture.

---

## Live Demo

### 🌐 https://flow-ledger.onrender.com

---

# Features

## Financial Management

* Add and manage income sources
* Track expenses with categories
* View transaction history
* Delete and organize financial records
* Download reports as Excel files

## Dashboard Analytics

* Interactive charts and graphs
* Expense breakdown visualization
* Income distribution overview
* Recent transaction summaries
* Financial insights dashboard

## Authentication & Security

* JWT-based authentication
* Protected API routes
* Password hashing with bcryptjs
* Persistent login sessions
* Secure user-specific financial data

## User Experience

* Responsive design for desktop and mobile
* Clean modern fintech aesthetic
* Fast navigation with React Router
* Toast notifications and smooth interactions
* Profile image upload support

---

# Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Recharts
* React Hot Toast

## Backend

* Node.js
* Express.js
* JWT Authentication
* Multer
* bcryptjs
* CORS

## Database

* MongoDB Atlas
* Mongoose ODM

## Deployment

* Render

---

# Project Structure

```bash
Flow-Ledger/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   └── assets/
│   │
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── config/
│   └── server.js
│
├── package.json
└── README.md
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/PrithwishDas101/Flow-Ledger.git

cd Flow-Ledger
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_key

PORT=8000
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`

```env
VITE_API_URL=http://localhost:8000
```

---

# Run Locally

## Start Backend

```bash
cd backend
npm run dev
```

## Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Production Build

```bash
npm run build
```

---

# API Endpoints Overview

## Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/getUser
POST /api/v1/auth/upload-image
```

## Dashboard

```http
GET /api/v1/dashboard
```

## Income

```http
POST   /api/v1/income/add
GET    /api/v1/income/
DELETE /api/v1/income/:id
GET    /api/v1/income/download-excel
```

## Expense

```http
POST   /api/v1/expense/add
GET    /api/v1/expense/
DELETE /api/v1/expense/:id
GET    /api/v1/expense/download-excel
```

---

# Screenshots

## Dashboard

<img width="100%" alt="Dashboard Screenshot" src="https://via.placeholder.com/1200x650.png?text=Flow+Ledger+Dashboard" />

## Expense Tracking

<img width="100%" alt="Expense Tracking Screenshot" src="https://via.placeholder.com/1200x650.png?text=Expense+Tracking" />

## Analytics

<img width="100%" alt="Analytics Screenshot" src="https://via.placeholder.com/1200x650.png?text=Financial+Analytics" />

---

# Deployment

Flow Ledger is deployed as a full-stack application on Render.

## Production Setup

* Frontend built using Vite
* Express serves frontend static files
* MongoDB Atlas for cloud database
* Environment variables configured securely on Render

---

# Environment Variables

## Backend

```env
MONGO_URI=
JWT_SECRET=
PORT=
```

## Frontend

```env
VITE_API_URL=
```

---

# Future Improvements

* Budget planning system
* Recurring transactions
* AI-powered spending insights
* Dark mode support
* Advanced filtering & search
* Multi-currency support
* Monthly PDF reports
* Cloud image storage integration
* PWA/mobile app version

---

# Author

## Prithwish Das

* GitHub: https://github.com/PrithwishDas101

---

# License

This project is licensed under the MIT License.

---
