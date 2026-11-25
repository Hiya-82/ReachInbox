# ReachInbox – Email Scheduler
A full-stack email scheduling application with a dashboard for creating, managing, and tracking email campaigns.

## Project Overview
ReachInbox is designed to help users organize email campaigns and schedule emails for future delivery through a simple and user-friendly dashboard.

## Features
- Interactive email campaign dashboard
- Campaign statistics and status overview
- Create and manage email campaigns
- Email scheduling interface
- REST API backend
- PostgreSQL database setup
- Redis service setup using Docker

## Technology Stack

### Frontend
- React.js
- TypeScript
- Vite
- CSS

### Backend
- Node.js
- Express.js
- TypeScript

### Database and Infrastructure
- PostgreSQL
- Prisma ORM
- Redis
- Docker
- Docker Compose

## Project Structure

```text
ReachInbox/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── queues/
│   │   ├── workers/
│   │   └── utils/
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js and npm
- Docker Desktop
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Hiya-82/ReachInbox.git
cd ReachInbox
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

http://localhost:5173

### 3. Install backend dependencies

Open another terminal:

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=4000
DATABASE_URL="postgresql://postgres:reachinbox123@localhost:5432/reachinbox?schema=public"
REDIS_HOST=localhost
REDIS_PORT=6379
```

Use your own database credentials when configuring your environment.

### 4. Start PostgreSQL and Redis

From the project root:

```bash
docker compose up -d
```

### 5. Start the backend

```bash
cd backend
npm run dev
```

Backend health-check endpoint:

http://localhost:4000/api/health

## Database

The project uses PostgreSQL with Prisma ORM for database management.

The Prisma schema defines:

- Campaign
- Email

Run database migration after configuring the database:

```bash
npx prisma migrate dev --name init
```

## Current Implementation Status
- React dashboard prototype created.
- Express backend and health-check API implemented.
- PostgreSQL and Redis Docker containers configured.
- Prisma database schema created.
- Database migration and authentication troubleshooting in progress.
- Email delivery and background scheduling are not yet implemented.

## Future Enhancements
- Background email processing using BullMQ.
- Email delivery using Nodemailer.
- Google OAuth authentication.
- Slack notifications.
- Campaign search and filtering.
- Email delivery tracking and retry handling.

## Author
Hiya Dhakad

GitHub: https://github.com/Hiya-82