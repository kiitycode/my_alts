    import axios from 'axios'

    const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    headers: { 'Content-Type': 'application/json' }
    })

    export default {
    getTasks() { return api.get('/tasks') },
    getTask(id) { return api.get(`/tasks/${id}`) },
    createTask(payload) { return api.post('/tasks', payload) },
    updateTask(id, payload) { return api.put(`/tasks/${id}`, payload) },
    deleteTask(id) { return api.delete(`/tasks/${id}`) }
    }
