const BASE_URL = "https://api.oluwasetemi.dev";

async function handleRes(res) {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || res.statusText);
  }
  if (res.status === 204) return null; // No content on DELETE
  return res.json();
}

export async function fetchTasks() {
  const res = await fetch(`${BASE_URL}/tasks`);
  return handleRes(res);
}

export async function fetchTaskById(id) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`);
  return handleRes(res);
}

export async function createTask(data) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleRes(res);
}

export async function updateTask(id, data) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleRes(res);
}

export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  return handleRes(res);
}
