![Vercel](https://vercelbadge.vercel.app/api/vipulsawant8/kanban-board-task-management-app-frontend)
![CI](https://github.com/vipulsawant8/kanban-board-task-management-app-frontend/actions/workflows/vercel-deploy.yml/badge.svg)

# Kanban Board — Task Management App

A clean and modular Kanban board built with React, Redux Toolkit, Axios, and Drag & Drop.  
Designed to demonstrate strong frontend architecture suitable for entry-level developer roles.

## Features

### Kanban
- Create, edit, delete lists
- Create, edit, delete tasks
- Drag & drop to reorder lists
- Drag & drop to reorder tasks
- Move tasks between lists
- Instant UI update + server persistence

### Authentication
- Login / Register
- Auto session load via `getMe`
- Protected routes
- Refresh-token retry flow using Axios interceptor
- Auto logout when refresh fails

### Reusable Form System
- Dynamic field rendering
- react-hook-form integration
- Custom input components (text, textarea, checkbox, select, file)
- Resettable forms via forwardRef

## Tech Stack
- React + Vite
- Redux Toolkit (Entity Adapter)
- React Router v6
- React-Bootstrap
- @hello-pangea/dnd
- Axios
- react-hook-form

## Folder Structure
```
src
├── api
│   └── axios.js
├── app
│   ├── features
│   │   ├── auth
│   │   ├── lists
│   │   └── tasks
│   ├── logoutHandler.js
│   └── store.js
├── components
│   ├── auth
│   ├── lists
│   ├── tasks
│   ├── form
│   ├── common
│   └── navbar
├── layout
├── middleware
├── pages
│   ├── auth
│   ├── board
│   └── NotFound.jsx
├── router
└── utils
```

## Authentication Flow
1. App loads → `getMe` checks session  
2. If unauthorized → Axios calls `/auth/refresh-token`  
3. If refresh succeeds → retry the original request  
4. If refresh fails → logout triggered → redirect to login  

## Kanban Logic

### Lists
- Normalized using Redux Entity Adapter  
- Sorted by `position`  
- Reordered with:
```js
reorderList()
persistReorderLists()
```

### Tasks
- Normalized state structure
- Grouped by list via `useMemo`
- Supports same-list reorder + cross-list moves
- Instant UI updates + async persistence

## Setup

### Install dependencies
```sh
npm install
```

### Create `.env`
```
VITE_API_URL=http://localhost:4000
```

### Run project
```sh
npm run dev
```

## Demo Credentials

Use the following demo account to explore the application:

Email: demo.user@kanban.test  
Password: Demo@1234

⚠️ This account contains only mock data and is reset periodically.

## Notes for Reviewers

The demo board uses fictional names (e.g., Justice League, Superman)
purely for demonstration purposes.
