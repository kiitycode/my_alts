    import { useEffect, useState } from 'react';
    import { db } from '../db';
    import { fetchTasks } from '../services/api';
    import { useAuth } from '../context/AuthContext';
    import type { Todo } from '../types/todo';

    export function useCachedTodos() {
    const { user } = useAuth();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        async function load() {
        if (!user) {
            setLoading(false);
            return;
        }
        try {
            const local = await db.todos.where('userId').equals(user.id as any).toArray();
            if (local.length > 0) setTodos(local as Todo[]);
            const remote = await fetchTasks(user.id as any);
            setTodos(remote);
            await db.todos.where('userId').equals(user.id as any).delete();
            await db.todos.bulkAdd(remote.map((todo) => ({ ...todo, userId: user.id })));
        } catch (err) {
            setError('Offline mode: showing cached todos');
            const fallback = await db.todos.where('userId').equals(user?.id as any).toArray();
            setTodos(fallback as Todo[]);
        } finally {
            setLoading(false);
        }
        }
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return { todos, loading, error };
    }
