import { useEffect, useState } from 'react';
import { db } from '../db';
import { fetchTodos } from '../services/api';
import { useAuth } from '../context/AuthContext';

export function useCachedTodos() {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      if (!user) return;
      
      try {
        const local = await db.todos
          .where('userId')
          .equals(user.id)
          .toArray();
          
        if (local.length > 0) {
          setTodos(local);
        }

        const remote = await fetchTodos(user.id);
        setTodos(remote);

        await db.todos.where('userId').equals(user.id).delete();
        await db.todos.bulkAdd(remote.map(todo => ({ ...todo, userId: user.id })));
      } catch (err) {
        setError('Offline mode: showing cached todos');
        const fallback = await db.todos
          .where('userId')
          .equals(user.id)
          .toArray();
        setTodos(fallback);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user]);

  return { todos, loading, error };
}