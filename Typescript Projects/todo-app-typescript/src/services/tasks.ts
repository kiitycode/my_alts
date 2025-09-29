import type { Task, NewTask, UpdateTask, ID } from "../types/tasks";

/** Backend Options */
const BACKEND: "local" | "jsonserver" | "mockapi" | "jsonplaceholder" = "jsonserver";

/** Configs */
const JSON_SERVER_URL = "/api"; 
const MOCKAPI_URL = import.meta.env.VITE_MOCKAPI_URL || "";
const JSON_PLACEHOLDER_URL = "https://jsonplaceholder.typicode.com";

/* ----------------- helpers ----------------- */
async function http<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    let msg = res.statusText;
    try { const j = await res.json(); msg = j?.message || msg; } catch {}
    throw new Error(`HTTP ${res.status}: ${msg}`);
  }
  if (res.status === 204) return undefined as unknown as T;
  return res.json() as Promise<T>;
}
const own = (t: Task, uid?: ID) =>
  uid == null
    ? true
    : t.userId === uid || t.owner === uid || t.user_id === uid;

/* ----------------- adapters ----------------- */

/** Local in-memory (zero-setup, dev-friendly) */
const local = (() => {
  let store: Task[] = [
    { id: "1", name: "Wire TS to pages", status: "IN_PROGRESS", priority: "HIGH", userId: "demo", createdAt: new Date().toISOString() },
    { id: "2", name: "Replace CSS with Tailwind", status: "TODO", priority: "MEDIUM", userId: "demo", createdAt: new Date().toISOString() },
  ];

  return {
    async list(userId?: ID): Promise<Task[]> {
      await new Promise(r => setTimeout(r, 120));
      const arr = [...store].sort((a,b)=>(b.createdAt||"").localeCompare(a.createdAt||""));
      return arr.filter(t => own(t, userId));
    },
    async get(id: ID): Promise<Task> {
      await new Promise(r => setTimeout(r, 60));
      const t = store.find(x => String(x.id) === String(id));
      if (!t) throw new Error("Task not found");
      return t;
    },
    async create(input: NewTask): Promise<Task> {
      const now = new Date().toISOString();
      const task: Task = { id: crypto.randomUUID(), ...input, createdAt: now, updatedAt: now };
      store = [task, ...store];
      return task;
    },
    async update({ id, ...patch }: UpdateTask): Promise<Task> {
      const i = store.findIndex(t => String(t.id) === String(id));
      if (i === -1) throw new Error("Task not found");
      store[i] = { ...store[i], ...patch, updatedAt: new Date().toISOString() };
      return store[i];
    },
    async remove(id: ID): Promise<{ success: true }> {
      store = store.filter(t => String(t.id) !== String(id));
      return { success: true };
    },
  };
})();

/** JSON Server (persistent local db.json) */
const jsonServer = {
  async list(userId?: ID): Promise<Task[]> {
    const qs = userId ? `?userId=${encodeURIComponent(String(userId))}` : "";
    return http<Task[]>(`${JSON_SERVER_URL}/tasks${qs}`);
  },
  async get(id: ID): Promise<Task> {
    return http<Task>(`${JSON_SERVER_URL}/tasks/${id}`);
  },
  async create(input: NewTask): Promise<Task> {
    const now = new Date().toISOString();
    return http<Task>(`${JSON_SERVER_URL}/tasks`, {
      method: "POST",
      body: JSON.stringify({ ...input, createdAt: now, updatedAt: now }),
    });
  },
  async update({ id, ...patch }: UpdateTask): Promise<Task> {
    const now = new Date().toISOString();
    return http<Task>(`${JSON_SERVER_URL}/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ ...patch, updatedAt: now }),
    });
  },
  async remove(id: ID): Promise<{ success: true }> {
    await http<void>(`${JSON_SERVER_URL}/tasks/${id}`, { method: "DELETE" });
    return { success: true };
  },
};

/** MockAPI.io – create a `tasks` resource with matching fields */
const mockapi = {
  async list(userId?: ID): Promise<Task[]> {
    const url = userId ? `${MOCKAPI_URL}/tasks?userId=${encodeURIComponent(String(userId))}` : `${MOCKAPI_URL}/tasks`;
    return http<Task[]>(url);
  },
  async get(id: ID): Promise<Task> {
    return http<Task>(`${MOCKAPI_URL}/tasks/${id}`);
  },
  async create(input: NewTask): Promise<Task> {
    const now = new Date().toISOString();
    return http<Task>(`${MOCKAPI_URL}/tasks`, {
      method: "POST",
      body: JSON.stringify({ ...input, createdAt: now, updatedAt: now }),
    });
  },
  async update({ id, ...patch }: UpdateTask): Promise<Task> {
    const now = new Date().toISOString();
    return http<Task>(`${MOCKAPI_URL}/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...patch, updatedAt: now }),
    });
  },
  async remove(id: ID): Promise<{ success: true }> {
    await http<void>(`${MOCKAPI_URL}/tasks/${id}`, { method: "DELETE" });
    return { success: true };
  },
};

/** JSONPlaceholder adapter (maps title/completed <-> name/status/priority) */
const jsonPlaceholder = {
  async list(userId?: ID): Promise<Task[]> {
    const data = await http<any[]>(`${JSON_PLACEHOLDER_URL}/todos?_limit=100`);
    const mapped: Task[] = data.map(d => ({
      id: d.id,
      name: d.title,
      status: d.completed ? "DONE" : "TODO",
      priority: "MEDIUM",
      userId: d.userId,
    }));
    return userId ? mapped.filter(t => own(t, userId)) : mapped;
  },
  async get(id: ID): Promise<Task> {
    const d = await http<any>(`${JSON_PLACEHOLDER_URL}/todos/${id}`);
    return {
      id: d.id,
      name: d.title,
      status: d.completed ? "DONE" : "TODO",
      priority: "MEDIUM",
      userId: d.userId,
    };
  },
  async create(input: NewTask): Promise<Task> {
    const created = await http<any>(`${JSON_PLACEHOLDER_URL}/todos`, {
      method: "POST",
      body: JSON.stringify({ title: input.name, completed: input.status === "DONE", userId: input.userId }),
    });
    return {
      id: created.id ?? crypto.randomUUID(),
      name: input.name,
      status: input.status,
      priority: input.priority,
      description: input.description,
      userId: input.userId,
    };
  },
  async update({ id, ...patch }: UpdateTask): Promise<Task> {
    const mapped: any = {};
    if (patch.name != null) mapped.title = patch.name;
    if (patch.status != null) mapped.completed = patch.status === "DONE";
    if (patch.userId != null) mapped.userId = patch.userId;
    const updated = await http<any>(`${JSON_PLACEHOLDER_URL}/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify(mapped),
    });
    return {
      id,
      name: updated.title ?? patch.name ?? "Untitled",
      status: (patch.status as Task["status"]) ?? (updated.completed ? "DONE" : "TODO"),
      priority: (patch.priority as Task["priority"]) ?? "MEDIUM",
      description: patch.description,
      userId: updated.userId ?? patch.userId,
    };
  },
  async remove(id: ID): Promise<{ success: true }> {
    await http<void>(`${JSON_PLACEHOLDER_URL}/todos/${id}`, { method: "DELETE" });
    return { success: true };
  },
};

/* ---------- facade ---------- */
const impl = BACKEND === "jsonserver" ? local
  : BACKEND === "jsonserver" ? jsonServer
  : BACKEND === "mockapi" ? mockapi
  : jsonPlaceholder;

export const TasksAPI = {
  list: impl.list,
  get: impl.get,
  create: impl.create,
  update: impl.update,
  remove: impl.remove,
};
