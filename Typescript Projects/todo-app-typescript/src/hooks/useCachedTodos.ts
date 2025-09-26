import { useEffect, useState } from "react";
import { db } from "../db";
import { TasksAPI } from "../services/tasks";
import { useAuth } from "../context/AuthContext";
import type { Task } from "../types/tasks";

export function useCachedTodos() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      if (!user?.id) { setLoading(false); return; }
      try {
        const local = await db.todos.where("userId").equals(user.id).toArray();
        if (local.length) setTodos(local);

        const remote = await TasksAPI.list(user.id);
        setTodos(remote);

        await db.todos.where("userId").equals(user.id).delete();
        await db.todos.bulkAdd(remote.map(t => ({ ...t, userId: user.id })));
      } catch (e) {
        setError("Offline mode: showing cached todos");
        const fallback = await db.todos.where("userId").equals(user.id).toArray();
        setTodos(fallback);
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.id]);

  return { todos, loading, error };
}
