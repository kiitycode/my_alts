import { useEffect, useState } from 'react';
import { db } from '../db';
import { fetchTodos } from '../services/api';

export function useCachedTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const local = await db.todos.toArray();
        if (local.length > 0) {
          setTodos(local); // Load from cache first
        }

        const remote = await fetchTodos(); // Always fetch fresh data
        setTodos(remote);

        await db.todos.clear();
        await db.todos.bulkAdd(remote);
      } catch (err) {
        setError('Offline mode: showing cached todos');
        const fallback = await db.todos.toArray();
        setTodos(fallback);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { todos, loading, error };
}
