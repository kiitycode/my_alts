# 📋 React Task App – Frontend Engineering Exam Project (Tinyuka24, 2nd Semester)

This is a comprehensive Todo application built as part of the AltSchool of Engineering Second Semester Examination (Frontend Track). The project demonstrates core frontend engineering skills using React and modern development tools.

---

## Features

- Fetch todos from Base URL: https://api.oluwasetemi.dev API
- Display todos with **client-side pagination** (10 items per page)
- View individual todo details on a nested route
- Search todos by title
- Filter todos by completion status (all / complete / incomplete)
- Error handling with Error Boundaries and a custom 404 page
- Responsive and accessible UI (WCAG AA compliant)
- Keyboard navigation support
- Hosted on Vercel

## Bonus Features

- Create new tasks
- Edit and delete todos with confirmation
- Data caching with localStorage
- Offline support with IndexedDB (Dexie.js)

---

## Tech Stack

- React 19+ (functional components & hooks)
- React Router v7 (for routing)
- Fetch (API calls)
- TanStack Query (data fetching & caching)
- Vanilla CSS (styling)
- ShadCN UI (component library)
- React Icons / Lucide React (icons)
- React Hook Form (form management)

---

## Installation and Setup

```bash
git clone https://github.com/kiitycode/React_app_Oluwatosin/tree/main/todo-app
cd todo-app
npm install
npm run dev
```

---

## Available Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production

---

## Project Structure

- `/src/components` - Error Boundary
- `/src/pages` – Route pages (Crash, CreateTask, DetailPage, EditTask, Home, NOtFound)
- `/src/services` – API logic
- `/src/hooks` – useCachedTodos Logic
- `/src/styles` – Vanilla CSS
- `/src/db` - Dexie Offline Storage

---

## Known Issues / Limitations

- JSONPlaceholder API is read-only (for mock data only)
- Some CRUD features are simulated locally

---

## Future Improvements

- Full backend integration
- User authentication
- Drag-and-drop for task reordering

---

## Deployment

Deployed to: [Live Demo URL Here]

---

## 👨‍🏫 Submission

- GitHub repo: [GitHub Repo URL]
- Submitted to: [AltSchool Exam Submission Link]