# Kanban Board — Frontend (React + Redux)

[![Vercel](https://img.shields.io/badge/vercel-deployed-success?logo=vercel&logoColor=white)](https://kanban-board-front-end.vercel.app)
![License](https://img.shields.io/github/license/vipulsawant8/notes-app-frontend)
![React](https://img.shields.io/badge/react-19.x-blue)
![Redux Toolkit](https://img.shields.io/badge/redux-toolkit-purple)
![Vite](https://img.shields.io/badge/vite-build-646CFF)


**Live App:** https://kanban-board-front-end.vercel.app

Frontend for a Kanban Board application, built with React, Redux Toolkit, and Vite.  
This application demonstrates authentication-aware UI, layout-based route protection, and ordered task workflows, integrating with a separately deployed backend API.

## Architecture Overview

The frontend is designed to stay UI-focused, with security and session handling delegated to the backend.

Key responsibilities:
- Rendering authenticated and public views
- Managing global UI state using Redux Toolkit
- Orchestrating API communication via Axios
- Handling session expiry and forced logout gracefully
- Authentication secrets are never stored on the client.

## Authentication & Session Handling

This frontend integrates with a **cookie-based authentication with refresh token rotation** provided by the backend.

### Key characteristics  

- Tokens are stored in **HTTP-only cookies** (server-managed)
- No access or refresh tokens are stored in localStorage or Redux
- Redux stores only user identity and authentication state
- A persistent `deviceId` is generated client-side to support secure multi-device sessions

### Session lifecycle

1. On application load, authentication state is restored via `/auth/me`
2. Protected routes are guarded using layout-based access control
3. Axios interceptors automatically attempt token refresh on `401` responses from protected endpoints
4. Failed refresh triggers a **global logout**
5. Requests are retried **once** after a successful refresh to prevent loops

## Routing & Access Control

Routing is layout-driven, not page-driven.

```bash
/login, /register
 └── PublicLayout

/board
 └── AuthLayout (protected)
     ├── Lists
     └── Tasks
```

## Design decisions

- Public and authenticated routes are structurally separated
- Auth checks live in layouts, not inside pages
- Pages remain focused on rendering and interaction logic
- Route-level lazy loading improves performance

## Features

- Login / register / logout flow
- Protected routes using layout guards
- Kanban lists and tasks
- Create / update / delete lists
- Create / update / delete tasks
- Task reordering within a list
- Task movement across lists
- Ordered task rendering
- Centralized toast notifications

## Demo Environment (For Reviewers)

To simplify evaluation:

- A demo account is used for demonstration.
- All boards, lists, and tasks are fictional.
- No real user or production data is stored.
- Demo data may reset periodically.

This environment exists only for UI and UX evaluation.

A demo account is provided:

- **Email:** demo.user@kanban.test
- **Password:** Demo@1234

Demo credentials are provided only for UI and UX evaluation.

## Project Structure

```bash
src
├── api
│   └── axios.js
├── app
│   ├── features
│   │   ├── auth
│   │   │   └── authSlice.js
│   │   ├── lists
│   │   │   └── listSlice.js
│   │   └── tasks
│   │       └── taskSlice.js
│   ├── logoutHandler.js
│   └── store.js
├── App.css
├── App.jsx
├── assets
│   ├── logo.png
│   └── react.svg
├── components
│   ├── auth
│   │   ├── AuthInitializer.jsx
│   │   ├── index.js
│   │   ├── LoginForm.jsx
│   │   ├── LogoutButton.jsx
│   │   └── RegisterForm.jsx
│   ├── common
│   │   └── PageLoader.jsx
│   ├── form
│   │   ├── CustomForm.jsx
│   │   ├── index.js
│   │   ├── InputCheckbox.jsx
│   │   ├── InputFile.jsx
│   │   ├── InputSelect.jsx
│   │   ├── InputText.jsx
│   │   ├── InputTextarea.jsx
│   │   └── SubmitButton.jsx
│   ├── lists
│   │   ├── AddList.jsx
│   │   ├── index.js
│   │   ├── ListAddTask.jsx
│   │   ├── ListColumn.jsx
│   │   ├── ListDeleteModal.jsx
│   │   ├── ListEditForm.jsx
│   │   ├── ListHeader.jsx
│   │   └── ListTasks.jsx
│   ├── navbar
│   │   └── NavbarComponent.jsx
│   └── tasks
│       ├── DeleteTaskModal.jsx
│       ├── index.js
│       ├── TaskEditForm.jsx
│       └── TaskItem.jsx
├── config
│   └── toast.config.js
├── index.css
├── layout
│   ├── AppLayout.jsx
│   ├── AuthLayout.jsx
│   └── PublicLayout.jsx
├── main.jsx
├── middleware
│   └── errorMiddleware.js
├── pages
│   ├── auth
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── board
│   │   └── BoardPage.jsx
│   └── NotFound.jsx
├── router
│   └── router.jsx
└── utils
    ├── asyncThunkWrapper.js
    ├── notify.js
    ├── deviceId.js
    └── reorder.js
```

## Environment Configuration

Create a local environment file:

```bash
cp .env.example .env
```

### Required variable:

- VITE_API_URL — backend API base URL

No secrets are stored in the frontend.

## Backend Integration

This frontend communicates with a separately deployed backend API.

- Backend Repository: https://github.com/vipulsawant8/kanban-board-backend
- Backend Deployment: Render
- Auth Strategy: Cookie-based authentication with refresh token rotation
- Session Restoration: `/auth/me`
- Device Tracking: Client-generated `deviceId`

## License

This project is licensed under the MIT License.

## Final note

This frontend is designed for portfolio demonstration and technical evaluation.
It is not intended for real user data or production use.