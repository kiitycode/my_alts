    // services/api.ts
    import type { Todo } from '../types/todo';

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api';
    const CACHE_KEY = 'cached_tasks';

    function getStoredUser() {
    try {
        return JSON.parse(localStorage.getItem('todo_user') || 'null') as { id?: string | number; token?: string } | null;
    } catch {
        return null;
    }
    }

    async function handleRes(res: Response) {
    const ct = res.headers.get('content-type') || '';
    // if server returned HTML or plain text, fail fast
    if (!ct.includes('application/json')) {
        const text = await res.text().catch(() => '');
        throw new Error(`Expected JSON response but got: ${res.status} ${res.statusText}\n${text.slice(0, 500)}`);
    }

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err && (err.message || err.error)) || res.statusText);
    }
    if (res.status === 204) return null;
    return res.json();
    }

    /** Fetch single task */
    export async function fetchTaskById(id: string | number) {
    const res = await fetch(`${BASE_URL}/tasks/${id}`);
    return handleRes(res) as Promise<Todo>;
    }

    /** Fetch tasks filtered to user */
    export async function fetchTasks(userId: string | number) {
    const res = await fetch(`${BASE_URL}/tasks`);
    const data = (await handleRes(res)) as any;
    const allTasks: any[] = Array.isArray(data) ? data : data?.data || [];
    return allTasks.filter((task) =>
        task.user_id === userId || task.owner === userId || task.userId === userId
    ) as Todo[];
    }

    /** Create task. On 404 or network failure create a local cached todo and return it with isTemp=true */
    export async function createTask(data: Partial<Todo>, userId: string | number) {
    const user = getStoredUser();
    if (!user) throw new Error('Not authenticated');

    const payload = { ...data, user_id: userId, owner: userId, userId };

    try {
        const res = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(user.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
        body: JSON.stringify(payload),
        });

        // If 404 treat as missing remote and fallback to cache
        if (res.status === 404) {
        throw new Error('remote-not-found');
        }

        return (await handleRes(res)) as Todo;
    } catch (err: any) {
        // network or 404 fallback -> persist locally and return temp item
        // create temp id prefixed to avoid collisions
        const tempId = `temp-${Date.now()}`;
        const temp: Todo = {
        id: tempId,
        ...payload,
        isTemp: true,
        };

        try {
        const raw = localStorage.getItem(CACHE_KEY);
        const list: Todo[] = raw ? JSON.parse(raw) : [];
        list.push(temp);
        localStorage.setItem(CACHE_KEY, JSON.stringify(list));
        } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed caching task locally', e);
        }

        // return the temp item so UI can update instantly
        return temp;
    }
    }

    /** Update task */
    export async function updateTask(id: string | number, data: Partial<Todo>, userId?: string | number) {
    const user = getStoredUser();
    if (!user) throw new Error('Not authenticated');

    const payload = { ...data, user_id: userId, owner: userId, userId };

    try {
        const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...(user.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
        body: JSON.stringify(payload),
        });
        return handleRes(res) as Promise<Todo>;
    } catch (err) {
        // bubble to caller to handle offline update strategy
        throw err;
    }
    }

    /** Delete task */
    export async function deleteTask(id: string | number) {
    const user = getStoredUser();
    if (!user) throw new Error('Not authenticated');

    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
        ...(user.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
    });
    return handleRes(res);
    }
