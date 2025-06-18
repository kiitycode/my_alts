const BASE_URL = "https://api.oluwasetemi.dev";

// Helper: Get user from localStorage
function getStoredUser() {
  return JSON.parse(localStorage.getItem('todo_user'));
}

// Reusable response handler
async function handleRes(res) {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || res.statusText);
  }
  if (res.status === 204) return null;
  return res.json();
}

// Fetch a single task by ID
export async function fetchTaskById(id) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`);
  return handleRes(res);
}

// Fetch tasks and filter by user ID
export async function fetchTasks(userId) {
  try {
    const res = await fetch(`${BASE_URL}/tasks`);
    const data = await handleRes(res);

    const allTasks = Array.isArray(data) ? data : data.data || [];
    console.log('Raw tasks from API:', allTasks);

    const userTasks = allTasks.filter(task =>
      task.user_id === userId ||
      task.owner === userId ||
      task.userId === userId
    );

    console.log('Filtered tasks for user:', userTasks);
    return userTasks;
  } catch (err) {
    console.error('Fetch tasks error:', err);
    throw err;
  }
}

// Create a task with proper user ownership
export async function createTask(data, userId) {
  const user = getStoredUser();
  if (!user) throw new Error('Not authenticated');

  const payload = {
    ...data,
    user_id: userId,
    owner: userId,
    userId: userId
  };

  console.log('Creating task with payload:', payload);

  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.token}`
    },
    body: JSON.stringify(payload),
  });

  const result = await handleRes(res);
  console.log('Task created successfully:', result);
  return result;
}

// Update task with proper user ownership
export async function updateTask(id, data, userId) {
  const user = getStoredUser();
  if (!user) throw new Error('Not authenticated');

  const payload = {
    ...data,
    user_id: userId,
    owner: userId,
    userId: userId
  };

  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.token}`
    },
    body: JSON.stringify(payload),
  });

  return handleRes(res);
}

// Delete a task
export async function deleteTask(id) {
  const user = getStoredUser();
  if (!user) throw new Error('Not authenticated');

  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  });

  return handleRes(res);
}
