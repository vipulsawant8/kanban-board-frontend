![Vercel](https://vercelbadge.vercel.app/api/vipulsawant8/kanban-board-task-management-app-frontend)
![CI](https://github.com/vipulsawant8/kanban-board-task-management-app-frontend/actions/workflows/ci.yml/badge.svg)

# Kanban Board — Task Management App (Frontend)

A Kanban board frontend built with React and Redux Toolkit, featuring authentication,
drag & drop, and optimistic UI updates.  
Designed to demonstrate scalable frontend architecture and real-world state management patterns.

> Frontend-only repository.  
> Communicates with a backend via REST APIs using **HTTP-only cookie authentication**.

---

## Key Features
- Create, edit, delete lists and tasks
- Drag & drop reordering (lists and tasks)
- Cross-list task movement
- Optimistic UI updates with async persistence
- Authentication with protected routes and auto session restore
- Reusable form system using `react-hook-form`

---

## Tech Stack
React · Vite · Redux Toolkit · React Router · React-Bootstrap · Axios · @hello-pangea/dnd

---

## Architecture Highlights
- Feature-based folder structure for scalability
- Normalized Redux state for lists and tasks
- Centralized Axios instance with auth handling
- Drag & drop reorder logic isolated in utilities

---

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

---

## Environment Variables

Create a `.env` file using the provided example:

```bash
cp .env.example .env
```

Required variable:

```env
VITE_API_URL=http://localhost:4000
```

> `.env` files are ignored by Git. Never commit secrets.

---

## Demo Credentials

Email: `demo.user@kanban.test`  
Password: `Demo@1234`

⚠️ Mock data only. Reset periodically.

---

## Notes for Reviewers

The demo board uses fictional names (e.g., Justice League, Superman)
purely for demonstration purposes.
