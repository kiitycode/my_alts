'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchTasks } from '../services/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Todo } from '../types/todo';

export default function Home(): React.ReactElement {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'all' | Todo['status']>('all');
  const [error, setError] = useState<string | null>(null);

  const userId = useMemo(() => {
    const id = user?.id;
    return typeof id === 'string' || typeof id === 'number' ? id : undefined;
  }, [user]);

  const load = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks(userId);
      setTasks(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!user) router.replace('/login');
  }, [user, router]);

  useEffect(() => {
    if (!userId) return;
    void load();
  }, [userId, load]);

  useEffect(() => {
    const onFocus = () => void load();
    const onVis = () => document.visibilityState === 'visible' && void load();
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [load]);

  if (!user) return <div className="p-8 text-center">Redirecting...</div>;

  const filtered = tasks.filter(t => status === 'all' || t.status === status);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">📋 Task List</h1>
          <p className="text-sm" style={{ opacity: 0.85 }}>
            Welcome, <span className="font-medium">{user.username}</span>
          </p>
        </div>
        <div className="flex gap-5">
          <Link href="/create" className="btn">+ New Task</Link>
          <button
            onClick={() => { logout(); router.push('/login'); }}
            className="btn"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex-between mb-3">
        <select
          value={status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as 'all' | Todo['status'])}
          className="w-auto"
        >
          <option value="all">All Statuses</option>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
        <button onClick={() => void load()} className="btn">Reload</button>
      </div>

      {error && <div className="text-danger mb-3">{error}</div>}

      {loading ? (
        <div className="spinner" />
      ) : (
        <ul className="grid gap-3">
          {filtered.map(task => (
            <li key={String(task.id)} className="card">
              <div className="flex-between">
                <div>
                  <div className="font-semibold">{task.name}</div>
                  <div className="text-sm" style={{ opacity: 0.85 }}>
                    {task.status} • {task.priority}
                  </div>
                </div>
                <Link href={`/todos/${task.id}`} className="btn">View</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
