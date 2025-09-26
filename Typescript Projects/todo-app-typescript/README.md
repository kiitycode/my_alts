# 📌 React + TypeScript Todo App – AltSchool Frontend Engineering Exam Project Conversion (Tinyuka24, 3rd Semester)

A comprehensive Todo/Task management application built for the **AltSchool of Engineering (Frontend Track)**.
This version refactors the original **React JavaScript app** into **React + TypeScript**, styled with **TailwindCSS v3**, featuring user-specific task management, offline capabilities, and robust error handling.

---

## Key Features

### User Authentication System
- Simulated login/logout with persistent session (`localStorage`)
- User-specific task fetching (only logged-in user sees their tasks)
- Secure logout clears session + local database
- Redirects ensure proper session handling

### Task Management
- CRUD operations (Create, Read, Update, Delete)
- Rich task details: `name`, `description`, `status`, `priority`
- Search and multi-criteria filtering
- Client-side pagination (10 per page)

### Technical Features
- Offline-first with **Dexie.js (IndexedDB)**
- Optimistic UI updates
- Error boundaries & fallback UIs
- Responsive + mobile-first
- Dark-mode optimized interface
- Built-in API adapters: `local`, `jsonserver`, `mockapi`, `jsonplaceholder`

### Data Synchronization
- Dual-layer caching (IndexedDB + LocalStorage)
- Automatic API retry & background sync simulation
- Partitioned tasks by user ID
- Conflict-free offline edits

### Performance
- Lazy-loaded routes
- Prefetching & debounced search
- Efficient pagination

---

## Tech Stack

Category          | Tool / Library
------------------|----------------------
Framework         | React 19 + TypeScript
Routing           | React Router v7
Forms             | React Hook Form
Styling           | TailwindCSS v3
UI Components     | Custom classes + Tailwind, React Icons, Lucide React
Offline Caching   | Dexie.js (IndexedDB)
API               | JSON Server / MockAPI.io / JSONPlaceholder
State/Context     | React Context API
Build Tool        | Vite

---

## API Options

You can switch backend in `src/services/tasks.ts`:
```ts
const BACKEND: "local" | "jsonserver" | "mockapi" | "jsonplaceholder" = "jsonserver";
```

### JSON Server (default)
Base URL (proxied via Vite):  
```
http://localhost:3001/tasks
```

### MockAPI.io (optional)
Add `.env`:
```env
VITE_MOCKAPI_URL=https://your-subdomain.mockapi.io/api
```

### JSONPlaceholder (read-only demo)
```
https://jsonplaceholder.typicode.com/todos
```

---

## Project Structure
```
todo-app-typescript/
├── public/                 # Static assets
├── src/
│   ├── components/         # Shared UI components
│   ├── context/            # Auth context
│   ├── hooks/              # Custom hooks (e.g., useCachedTodos)
│   ├── pages/              # Page components
│   ├── services/           # API services (tasks.ts)
│   ├── styles/             # Tailwind utils + custom CSS
│   ├── types/              # TypeScript interfaces
│   ├── App.tsx             # Root component
│   └── main.tsx            # Vite entry
├── db.json                 # JSON Server db
├── vite.config.ts          # Vite config (proxy setup)
├── tailwind.config.cjs     # Tailwind theme config
├── tsconfig.json           # TS settings
└── package.json
```

---

## Installation & Setup

### 1. Clone repo
```bash
git clone https://github.com/kiitycode/todo-app-typescript.git
cd todo-app-typescript
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run frontend
```bash
npm run dev
```
App: [http://localhost:5173](http://localhost:5173)

### 4. Run backend (JSON Server)
```bash
npm run api
```
API: [http://localhost:3001/tasks](http://localhost:3001/tasks)

---

## Requirements Checklist
- [x] React + TypeScript setup  
- [x] Tailwind v3 styling  
- [x] Task CRUD operations  
- [x] Offline-first IndexedDB fallback  
- [x] Authentication simulation  
- [x] JSON Server integration  
- [x] Deployed to Vercel  

---

## Deployment on Vercel
1. Push repo to GitHub
2. Import repo into [Vercel](https://todo-typescript-phi.vercel.app/)
3. Build Command → `npm run build`
4. Output Directory → `dist`
5. Add `.env.production` if using MockAPI
6. Deploy

Live: [your-vercel-link](https://todo-typescript-phi.vercel.app/)

---

##  Author
**Student**: Bolumole Oluwatosin  
**Reg No.**: ALT-SOE/024/2933  
**Track**: Frontend Engineering  
**Semester**: 3 (Tinyuka24)
**Group**: Circle 17
**Repo**: [kiitycode/todo-app-typescript](https://github.com/kiitycode/todo-app-typescript)  
**Deployment**: [todo-app-typescript.vercel.app](https://todo-typescript-phi.vercel.app/)  

---

This project demonstrates **real-world frontend engineering skills**: TypeScript safety, API integrations, offline handling, and responsive UI with TailwindCSS.