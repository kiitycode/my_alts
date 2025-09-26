# React Todo App – Frontend Engineering Exam Project (Tinyuka24, 2nd Semester)

A comprehensive Todo/Task management application built for the AltSchool of Engineering Second Semester Examination (Frontend Track). Demonstrates modern frontend engineering practices with React, featuring user-specific task management, offline capabilities, and robust error handling.

## Key Features

### User Authentication System

- **Simulated Login Flow** with persistent session (using localStorage)
- User-specific task fetching (only shows tasks for logged-in user)
- Secure logout that clears all user data from memory
- Session management with automatic redirects

The app implements a realistic authentication flow without backend persistence:
> Note: This is a simulation - the API doesn't actually persist user accounts, but demonstrates proper frontend auth patterns.

```javascript
// Simplified auth context example
const login = (username) => {
  const userId = generateUniqueId(); // Creates a simulated user ID
  localStorage.setItem('currentUser', JSON.stringify({ username, userId }));
  // All subsequent API calls include this userId
};

const logout = () => {
  localStorage.removeItem('currentUser');
  // Clears all user-specific data from IndexedDB
  indexedDB.deleteDatabase('userTasksDB');
};
```

### Task Management

- **Personalized Task Lists** (filtered by user ID)
- Create, Read, Update, Delete (CRUD) operations
- Rich task details (name, description, status, priority)
- Instant search and multi-criteria filtering
- Client-side pagination (10 tasks per page)

### Technical Features

- **Offline-First Architecture** with IndexedDB fallback
- Optimistic UI updates for smooth interactions
- Comprehensive error boundaries and fallback UIs
- Responsive design (mobile-first approach)
- Dark-mode optimized interface

### Data Synchronization

- Dual-layer caching (IndexedDB + localStorage)
- Automatic API retry mechanism
- Background sync simulation
- Conflict resolution for offline edits

### User-Specific Task Handling

- `/tasks?userId=<ID>` API filtering
- IndexedDB stores tasks partitioned by user
- Visual confirmation of user ownership
- Automatic data segregation between users

### Offline Capabilities

- Tasks created offline queue for sync
- Dexie.js powers local database
- Conflict-free replicated data types (CRDTs)
- Storage quotas and cleanup

### Performance Optimizations

- Lazy-loaded route components
- Smart task prefetching
- Memory-efficient pagination
- Debounced search inputs

## Tech Stack

Categor         |       Tool / Library
Framework       |    React 19+
Routing         |    React Router v7
Forms           |    React Hook Form
API Handling    |    fetch (custom services)
Offline Caching |    Dexie.js (IndexedDB)
Styling         |    Vanilla CSS (Utility First)
UI Components   |    ShadCN/UI
Icons           |    React Icons, Lucide React

## API Documentation

Base URL: [https://api.oluwasetemi.dev](https://api.oluwasetemi.dev)

Method      |   Endpoint       |    Description
GET/        |   tasks          |    Fetch all tasks
GET/        |   tasks/:id      |    Fetch single task
POST/       |   tasks          |    Create a task
PUT/        |   tasks/:id      |    Update task
DELETE/     |   tasks/:id      |    Delete task
API fields: id, name, description, status, priority, createdAt

## Project Structure

todo-app/
├── public/                # Image folder
├── src/
│   ├── components/        # ErrorBoundary, shared UI
|   ├── context/
│   ├── pages/             # Home, DetailPage, CreateTask, EditTask, NotFound, CrashPage
│   ├── hooks/             # useCachedTodos (Dexie & API fallback)
│   ├── services/          # API logic (fetch, create, update, delete)
│   ├── styles/            # CSS styling
│   └── db/                # Dexie.js database setup
├── README.md
└── vite.config.js

## Future Roadmap

### Enhanced Security

- JWT token simulation
- Passwordless auth flow
- Session expiration

### Collaboration Features

- Shared task lists
- Task assignment
- Activity feeds

### Advanced UI

- Kanban view
- Calendar integration
- Custom themes

## Installation & Setup

git clone [https://github.com/kiitycode/React_app_Oluwatosin.git](https://github.com/kiitycode/React_app_Oluwatosin.git)
cd React_app_Oluwatosin/todo-app
npm install
npm run dev
>Make sure you have Node.js and npm installed.

### CI/CD Pipeline:

- Push to `main` triggers Vercel build
- Automated tests run via GitHub Actions
- Zero-downtime deployments
- Performance budgets enforced

## Submission & Deployment Details

- **Student**: Oluwatosin Bolumole
- **Reg No.**: ALT-SOE/024/2933
- **Track**: Frontend Engineering  
- **Semester**: 2 (Tinyuka24)
- **Production URL:** [https://react-app-oluwatosin.vercel.app](https://react-app-oluwatosin.vercel.app)
- **Repository**: [github.com/kiitycode/React_app_Oluwatosin](https://github.com/kiitycode/React_app_Oluwatosin)
- **Institution**: AltSchool Africa