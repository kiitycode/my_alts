// app/page.tsx
'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchTasks } from '../services/api';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import type { Todo } from '../types/todo';

export default function Home(): JSX.Element {
  const { user, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tasks, setTasks] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  const userId = useMemo(() => (user ? (user.id as string | number) : null), [user]);

  const load = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks(userId);
      setTasks(data);
    } catch (e: any) {
      setError(e?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // redirect if not logged in
  useEffect(() => {
    if (!user) router.replace('/login');
  }, [user, router]);

  // initial load and after create redirect (?r=1)
  useEffect(() => {
    if (!userId) return;
    void load();
  }, [userId, searchParams, load]);

  // reload when tab gains focus or visibility changes
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

  if (!user) return <div className="p-8">Redirecting...</div>;

  const filtered = tasks.filter(
    (t) =>
      (t.name ?? '').toLowerCase().includes(search.toLowerCase()) &&
      (status === 'all' || t.status === status)
  );

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">📋 Task List</h1>
          <p className="text-sm text-slate-600">
            Welcome, <span className="font-medium">{user.username}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/create"
            className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded shadow hover:bg-sky-700"
          >
            + New Task
          </Link>
          <button
            onClick={() => {
              logout();
              router.push('/login');
            }}
            className="px-3 py-2 border rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="all">All Statuses</option>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
        <button onClick={() => void load()} className="px-3 py-2 border rounded">
          Reload
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 border border-red-300 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <ul className="grid gap-4">
          {filtered.map((task) => (
            <li
              key={String(task.id)}
              className="bg-white shadow-sm rounded p-4 flex items-start justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold">{task.name}</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Status: <span className="font-medium">{task.status}</span> · Priority:{' '}
                  <span>{task.priority}</span>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href={`/todos/${task.id}`}
                  className="inline-flex items-center px-3 py-1 border rounded text-sm hover:bg-slate-100"
                >
                  View
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
