    // src/services/api.js
    const BASE_URL = import.meta.env.VITE_API_URL || '/api'
    const CACHE_KEY = 'cached_tasks'

    function getStoredUser() {
    try {
        return JSON.parse(localStorage.getItem('todo_user') || 'null')
    } catch {
        return null
    }
    }

    async function handleRes(res) {
    const ct = res.headers.get('content-type') || ''
    if (!ct.includes('application/json')) {
        const text = await res.text().catch(() => '')
        throw new Error(
        `Expected JSON response but got: ${res.status} ${res.statusText}\n${text.slice(0, 500)}`
        )
    }

    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error((err && (err.message || err.error)) || res.statusText)
    }

    if (res.status === 204) return null
    return res.json()
    }

    // --- Core functions (same as before) ---
    export async function fetchTaskById(id) {
    const res = await fetch(`${BASE_URL}/tasks/${id}`)
    return handleRes(res)
    }

    export async function fetchTasks(userId) {
    const res = await fetch(`${BASE_URL}/tasks`)
    const data = await handleRes(res)
    const allTasks = Array.isArray(data) ? data : data?.data || []
    return allTasks.filter(
        (task) => task.user_id === userId || task.owner === userId || task.userId === userId
    )
    }

    export async function createTask(data, userId) {
    const user = getStoredUser()
    if (!user) throw new Error('Not authenticated')

    const payload = { ...data, user_id: userId, owner: userId, userId }

    try {
        const res = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(user.token ? { Authorization: `Bearer ${user.token}` } : {})
        },
        body: JSON.stringify(payload)
        })

        if (res.status === 404) throw new Error('remote-not-found')

        return await handleRes(res)
    } catch (err) {
        const tempId = `temp-${Date.now()}`
        const temp = { id: tempId, ...payload, isTemp: true }

        try {
        const raw = localStorage.getItem(CACHE_KEY)
        const list = raw ? JSON.parse(raw) : []
        list.push(temp)
        localStorage.setItem(CACHE_KEY, JSON.stringify(list))
        } catch (e) {
        console.error('Failed caching task locally', e)
        }

        return temp
    }
    }

    export async function updateTask(id, data, userId) {
    const user = getStoredUser()
    if (!user) throw new Error('Not authenticated')

    const payload = { ...data, user_id: userId, owner: userId, userId }

    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        ...(user.token ? { Authorization: `Bearer ${user.token}` } : {})
        },
        body: JSON.stringify(payload)
    })
    return handleRes(res)
    }

    export async function deleteTask(id) {
    const user = getStoredUser()
    if (!user) throw new Error('Not authenticated')

    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
        ...(user.token ? { Authorization: `Bearer ${user.token}` } : {})
        }
    })
    return handleRes(res)
    }

    // --- Wrapper for Vue-friendly names ---
    export default {
    getTasks: fetchTasks,
    getTask: fetchTaskById,
    addTask: createTask,
    updateTask,
    deleteTask
    }
