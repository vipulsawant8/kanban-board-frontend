# Kanban Frontend

Frontend client for a **Kanban-style task management application** built with **React and Vite**.

The application allows authenticated users to organize work using **custom lists and tasks**. Each list acts as a container where users can create and manage tasks.

The frontend communicates with a RESTful backend API and manages authentication, state, and user interactions.

# Core Features

* React + Vite development environment
* Authentication with backend API
* Create, update, and delete lists
* Create, update, and delete tasks
* Move tasks between lists
* Global state management
* Reusable UI components
* API integration using Axios
* Error handling and loading states

# Tech Stack

Frontend technologies used in this project:

* **React**
* **Vite**
* **Redux Toolkit**
* **Axios**
* **JavaScript (ES6+)**
* **CSS**

# Data Model

The frontend works with the following structure returned from the backend API:

User → Lists → Tasks

Example structure:

```id="79f9fe"
User
 ├── List
 │     ├── Task
 │     ├── Task
 │
 ├── List
 │     ├── Task
 │
 └── List
       ├── Task
```

Lists are **user-defined containers**, and tasks belong to specific lists.

# Demo Account

You can use the following demo credentials to explore the application.

Email:
demo.user1.chariot057@aleeas.com

Password:
demo@1234

These credentials allow access to a sample account with predefined lists and tasks.

# Authentication Flow

1. User logs in through the login form.
2. Backend verifies credentials and returns authentication tokens.
3. Frontend stores authentication state in Redux.
4. Authenticated users can access the dashboard and manage lists and tasks.

# API Integration

All API requests are handled through a centralized Axios instance.

Location:

```id="zpry3o"
src/api/axios.js
```

Responsibilities:

* API base URL configuration
* Request configuration
* Error handling
* Sending authenticated requests

# State Management

Global state is managed using **Redux Toolkit**.

State slices include:

**Auth Slice**

Handles:

* user authentication state
* login status
* logout functionality

**Task/List Slice**

Handles:

* fetching lists
* managing tasks
* updating tasks
* deleting tasks

# Environment Variables

Create a `.env` file in the project root.

Example configuration:

```id="x2ovxg"
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

# Local Development

Install dependencies:

```id="5f07m5"
npm install
```

Start the development server:

```id="jipx6u"
npm run dev
```

The application will run using **Vite's development server**.

# Backend Integration

This frontend connects to the **Kanban Backend API**, which provides:

* authentication endpoints
* list management
* task management
* data persistence

Ensure the backend server is running before starting the frontend.

# Future Improvements

Possible enhancements for the application:

* Drag-and-drop task movement
* Task priority levels
* Due dates
* Real-time updates
* Activity history
* Task labels or tags

# License

MIT License