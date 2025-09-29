# Todo-Next — Next.js Todo app

    A small Next.js (App Router) todo app with auth, create/view/edit/delete flows, offline-friendly API fallbacks, and a simple client-side task list.
    This README collects how the app is wired, how to run it, important implementation details, and common troubleshooting tips.

## Table of contents

    1. Overview
    2. Features
    3. Project structure (important files)
    4. Local setup & run
    5. Environment variables
    6. Routes / UX flow
    7. API module — exports you need to know
    8. Key implementation notes (offline cache, routing, refresh)
    9. Troubleshooting (common errors)

1. Overview

    This repo implements a small task manager using the Next.js App Router. Key pages live under /app and include:

    Home (/) — lists tasks, search, filter, links to create and details

    Create (/create) — form to create a task (react-hook-form)

    Login (/login) — auth entry

    Task details (/todos/[id]) — view, edit, delete for a single task

    API routes live under /app/api/tasks (server handlers)

    The client uses a services/api.ts module to talk to the backend; the module also implements a local fallback cache for offline/404 situations.

2. Features

 - Login / simple auth context (useAuth) expected (user object with id, username, optional token)

 - Home list with search and status filter

 - Create page (/create) with form validation (react-hook-form)

 - Task details page (/todos/[id]) with full CRUD:

 - View details

 - Edit/save

 - Delete

 - Offline fallback: createTask can persist to localStorage and return a temp item with isTemp when remote API is unreachable

 - Routing pattern: Home (/) → Create (/create) → submit → redirect back to Home and refresh to show new task

3. Project structure (important files)
    /app
    /api
        /tasks
        route.ts         // server handlers (GET/POST)
        /tasks/[id]
        route.ts         // server handlers for single task (GET/PATCH/DELETE)
    /create
        page.tsx           // CreateTaskPage (react-hook-form, router.push('/') + router.refresh())
    /login
        page.tsx           // Login page
    /todos
        /[id]
        page.tsx         // TaskDetailsPage (view / edit / delete)
        /edit
            page.tsx       // optional edit route (if present)
    globals.css
    layout.tsx
    page.tsx             // Home page
    /services
    api.ts               // client-side API helpers: fetchTasks, fetchTaskById, createTask, updateTask, deleteTask
    /context
    AuthContext.tsx      // provides useAuth() used across pages
    /types
    todo.ts              // Todo type definition

4. Local setup & run

    Prereqs: Node (v16+ recommended — use the Node version your project expects), npm or yarn.

# clone
    ```bash
    git clone https://github.com/kiitycode/my_alts.git
    cd my_alts/Next.js/todo-next
    ```

# install
    ```bash
    npm install
    # or
    yarn
    ```

# dev
    ```bash
    npm run dev
    # or
    yarn dev
    ```

# build
    ```bash
    npm run build
    # start (production)
    npm start  
    ```


    If your project uses a different package manager or scripts, use the corresponding commands in package.json.

5. Environment variables

    Set the backend base URL if you have one:
    NEXT_PUBLIC_API_URL=https://your-api.example.com

    If not set, services/api.ts defaults to /api (it expects serverless/api routes or proxying).

6. Routes / UX flow (final)
    /login           # login form -> on success router.push('/')
    /                # Home: list tasks, + New Task -> /create
    /create          # CreateTaskPage -> on submit: router.push('/') + router.refresh()
    /todos/[id]      # Task details + edit + delete

    ### Notes:
    Home is /app/page.tsx (not /app/todos/page.tsx). Delete /app/todos/page.tsx if present and unused.

    ### Links on Home:

    + New Task → /create

    Each task View → /todos/${task.id}

7. API module — exports you need to know

    /services/api.ts should expose (based on your current file):

    // client-side helpers
    export async function fetchTaskById(id: string | number): Promise<Todo> { ... }
    export async function fetchTasks(userId: string | number): Promise<Todo[]> { ... }
    export async function createTask(data: Partial<Todo>, userId: string | number): Promise<Todo> { ... }
    export async function updateTask(id: string | number, data: Partial<Todo>, userId?: string | number): Promise<Todo> { ... }
    export async function deleteTask(id: string | number): Promise<any> { ... }

    Important: import names must match exactly. For example, use fetchTaskById in the details page (not fetchTask) unless you add an alias/export.

8. Key implementation notes

    ### Home page
    - Fetches tasks in a useEffect when user becomes available:

    useEffect(() => {
    if (!user) return;
    const data = await fetchTasks(user.id);
    setTasks(data);
    }, [user]);

    - Redirects to /login if user missing.

    ### Create page

    - Uses react-hook-form.
    - Creates via createTask(data, user.id).
    - After success:

    reset();
    router.push('/');
    router.refresh(); // ensures Home re-fetches tasks and shows the new one

    - Cancel also routes and refreshes home:

    router.push('/');
    router.refresh();

    - Task Details page (CRUD)
    - Uses fetchTaskById(id) to load a task.
    - updateTask(id, data, userId) to save updates.
    - deleteTask(id) to delete, then router.push('/').
    - Offline / local cache

    createTask implements a fallback that caches new tasks to localStorage under CACHE_KEY and returns an item with isTemp: true.

    Your UI currently checks created.isTemp to inform the user.

9. Troubleshooting (common errors)

    Export fetchTask doesn't exist
    Cause: import name mismatch. Fix by importing fetchTaskById (or add export { fetchTaskById as fetchTask } in services/api.ts).

    Page not showing newly created task after redirect
    Ensure CreateTaskPage calls router.push('/') AND router.refresh() (or have Home re-fetch when focused/mounted).

    API auth errors
    services/api.ts reads stored user token with getStoredUser() (localStorage). Make sure your login writes todo_user with { id, token } or adapt the auth context.

    Local dev / proxy
    If NEXT_PUBLIC_API_URL is not set and you rely on an external API, either set the env var or ensure the /app/api server routes are implemented.