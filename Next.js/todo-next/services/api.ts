    // services/api.ts
    import type { Todo } from '../types/todo';
    import { db } from '../db'; // ← ensure path is correct

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api';
    const CACHE_KEY = 'cached_tasks'; // legacy localStorage fallback

    function getStoredUser() {
    try {
        return JSON.parse(localStorage.getItem('todo_user') || 'null') as { id?: string | number; token?: string } | null;
    } catch {
        return null;
    }
    }

    async function handleRes(res: Response) {
    const ct = res.headers.get('content-type') || '';
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
    export async function fetchTaskById(id: string) {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, { cache: 'no-store' });
    const todo = (await handleRes(res)) as Todo;
    // keep Dexie warm
    if (typeof window !== 'undefined') await db.upsert(todo);
    return todo;
    }

    /** Fetch tasks filtered to user (API first, Dexie fallback + sync) */
    export async function fetchTasks(userId: string | number) {
    try {
        const res = await fetch(`${BASE_URL}/tasks?userId=${userId}`, { cache: 'no-store' });
        const data = (await handleRes(res)) as any;
        const list: Todo[] = Array.isArray(data) ? data : [];
        // persist to Dexie for offline and instant next render
        if (typeof window !== 'undefined') await db.bulkUpsert(list);
        return list;
    } catch {
        // offline or API error → serve from Dexie, then legacy localStorage
        if (typeof window !== 'undefined') {
        const fromDexie = await db.listByUser(userId);
        if (fromDexie.length) return fromDexie as Todo[];
        try {
            const raw = localStorage.getItem(CACHE_KEY);
            const ls: Todo[] = raw ? JSON.parse(raw) : [];
            return ls.filter(t => String(t.userId ?? t.owner ?? t.user_id) === String(userId));
        } catch {
            return [];
        }
        }
        return [];
    }
    }

    /** Create task (API first, Dexie mirrors; offline temp saved) */
    export async function createTask(data: Partial<Todo>, userId: string | number) {
    const user = getStoredUser();
    if (!user) throw new Error('Not authenticated');

    const payload = {
        ...data,
        user_id: userId,
        owner: userId,
        userId,
    };

    try {
        const res = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(user.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
        body: JSON.stringify(payload),
        });
        if (res.status === 404) throw new Error('remote-not-found');
        const created = (await handleRes(res)) as Todo;
        if (typeof window !== 'undefined') await db.upsert(created);
        return created;
    } catch {
        const temp: Todo = {
        id: `temp-${Date.now()}`,
        name: data.name || '',
        description: data.description ?? '',
        status: (data.status as any) ?? 'TODO',
        priority: (data.priority as any) ?? 'Low',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId,
        owner: userId,
        user_id: userId,
        isTemp: true,
        };
        // save to Dexie and legacy localStorage
        if (typeof window !== 'undefined') {
        await db.upsert(temp);
        try {
            const raw = localStorage.getItem(CACHE_KEY);
            const list: Todo[] = raw ? JSON.parse(raw) : [];
            list.push(temp);
            localStorage.setItem(CACHE_KEY, JSON.stringify(list));
        } catch {}
        }
        return temp;
    }
    }

    /** Update task */
    export async function updateTask(id: string, data: Partial<Todo>, userId?: string | number) {
    const user = getStoredUser();
    if (!user) throw new Error('Not authenticated');

    const payload = { ...data, user_id: userId, owner: userId, userId };

    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        ...(user.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
        body: JSON.stringify(payload),
    });
    const updated = (await handleRes(res)) as Todo;
    if (typeof window !== 'undefined') await db.upsert(updated);
    return updated;
    }

    /** Delete task */
    export async function deleteTask(id: string) {
    const user = getStoredUser();
    if (!user) throw new Error('Not authenticated');

    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
        ...(user.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
    });
    const out = await handleRes(res);
    if (typeof window !== 'undefined') await db.remove(id);
    return out;
    }
