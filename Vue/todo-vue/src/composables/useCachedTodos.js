    import { ref, onMounted } from 'vue'
    import api from '../services/api'

    export function useCachedTodos() {
    const todos = ref([])
    const loading = ref(false)
    async function load() {
        loading.value = true
        try {
        const r = await api.getTasks()
        todos.value = r.data
        } finally { loading.value = false }
    }
    onMounted(load)
    return { todos, loading, load }
    }
