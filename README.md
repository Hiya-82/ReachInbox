# ReachInbox – Email Scheduler
A full-stack email scheduling application designed to create and manage email campaigns through a dashboard.

## Features
- Dashboard to view email campaign statistics
- Create and schedule email campaigns
- React-based user interface
- Node.js and Express backend
- REST API health-check endpoint
- PostgreSQL and Redis integration planned

## Tech Stack

**Frontend**
- React
- TypeScript
- Vite
- CSS

**Backend**
- Node.js
- Express.js
- TypeScript

**Planned Integrations**
- PostgreSQL
- Prisma ORM
- Redis
- BullMQ
- Nodemailer

## Project Structure
```text
ReachInbox_Scheduler/
├── frontend/
├── backend/
├── README.md
└── docker-compose.yml
```

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ReachInbox_Scheduler
```

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:5173

### 3. Start the backend

Open another terminal:

```bash
cd backend
npm install
npm run dev
```

Backend health check: http://localhost:4000/api/health

## Current Status
The frontend dashboard prototype and backend health-check API are running. Database persistence, queue processing, and actual email delivery are not yet implemented.

## Author
Developed as a software engineering project.