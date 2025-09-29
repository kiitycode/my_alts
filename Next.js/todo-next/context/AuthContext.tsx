    'use client';
    import React, { createContext, useContext, useEffect, useState } from 'react';
    import type { Todo } from '../types/todo';

    type User = { id: string | number; username?: string; token?: string } | null;
    type AuthCtx = {
    user: User;
    login: (userData: { id?: string | number; username?: string; token?: string }) => void;
    logout: () => void;
    loading: boolean;
    };

    const AuthContext = createContext<AuthCtx | undefined>(undefined);

    const TASKS_CACHE_KEY = 'cached_tasks';
    const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '/api';

    export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState<boolean>(true);

    async function syncTasks(userId: string | number) {
        try {
        const cachedTasks = JSON.parse(localStorage.getItem(TASKS_CACHE_KEY) || '[]') as Todo[];
        const userTasks = cachedTasks.filter(
            (t) => t.user_id === userId || t.owner === userId || t.userId === userId
        );
        await Promise.all(
            userTasks.map((task) =>
            fetch(`${API_BASE}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            }).catch((e) => {
                // eslint-disable-next-line no-console
                console.error('Sync failed for:', task.id, e);
            })
            )
        );
        } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Sync error:', err);
        }
    }

    useEffect(() => {
        const stored = localStorage.getItem('todo_user');
        if (stored) {
        try {
            const parsed = JSON.parse(stored) as User;
            setUser(parsed);
            if (parsed?.id) syncTasks(parsed.id);
        } catch (e) {
            // ignore parse errors
        }
        }
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const login = (userData: { id?: string | number; username?: string; token?: string }) => {
        const authenticatedUser: User = {
        id: userData.id ?? `user-${Date.now()}`,
        username: userData.username,
        token: userData.token,
        };
        localStorage.setItem('todo_user', JSON.stringify(authenticatedUser));
        setUser(authenticatedUser);
        if (authenticatedUser.id) syncTasks(authenticatedUser.id);
    };

    const logout = () => {
        localStorage.removeItem('todo_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
        {children}
        </AuthContext.Provider>
    );
    }

    export function useAuth(): AuthCtx {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
    }
