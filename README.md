# Flow Ledger

A modern personal-finance tracker for recording income and expenses, reviewing spending habits, and exploring financial summaries through a clean, fintech-inspired interface.

[Live demo](https://flow-ledger.onrender.com)

## Features

- Record and manage income and expense entries
- Review transaction history and financial summaries
- Visualize financial activity with dashboard charts
- Manage account/profile information and profile-picture uploads
- Export financial reports to Excel
- Responsive React interface
- Light and dark themes with a persistent theme toggle
- Focused form, navigation, chart, and card styling across themes

Availability of account, persistence, upload, and reporting features depends on the configured backend and external services.

## Tech stack

**Frontend**
- React 18
- Vite
- React Router
- Tailwind CSS / project styling
- Charting library for financial visualizations

**Backend**
- Node.js and Express
- MongoDB and Mongoose
- Authentication and profile management
- File upload support

## Repository layout

```text
Flow-Ledger/
├── frontend/   # React + Vite user interface
├── backend/    # Express API and data models
└── package.json
```

## Getting started

Requirements: Node.js, npm, and a MongoDB database.

```bash
git clone https://github.com/PrithwishDas101/Flow-Ledger.git
cd Flow-Ledger
npm install
```

The root scripts install nested dependencies and build the frontend. For local development, install and run each application from its own directory:

```bash
cd backend
npm install
npm run dev
```

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Confirm the available scripts in each nested `package.json` and set the frontend API base URL to the local backend.

## Environment variables

Configure the backend's MongoDB connection, authentication settings, port, and any upload-provider credentials used by the code. Configure the frontend with the API URL and any public configuration it requires. Use the exact variable names referenced in the project's configuration files; never commit secrets.

## Theme and accessibility

The interface includes a persistent light/dark theme preference and consistent theme tokens for navigation, cards, forms, and charts. When changing components, ensure text, focus indicators, and interactive states remain legible in both themes.

## Deployment

The live demo is hosted at [flow-ledger.onrender.com](https://flow-ledger.onrender.com). For self-hosting, deploy the frontend and API with matching environment settings, allow the frontend origin in CORS, and provision the database and any upload service before enabling production traffic.

---

Built by [Prithwish Das](https://github.com/PrithwishDas101).