    <template>
    <section v-if="task">
        <h1>Edit Task</h1>
        <form @submit.prevent="save">
        <input v-model="task.title" />
        <label><input type="checkbox" v-model="task.completed" /> completed</label>
        <button>Save</button>
        </form>
    </section>
    <div v-else>Loading...</div>
    </template>

    <script setup>
    import { ref, onMounted } from 'vue'
    import api from '../services/api'
    import { useRoute, useRouter } from 'vue-router'

    const route = useRoute()
    const router = useRouter()
    const task = ref(null)

    onMounted(async () => {
    const r = await api.getTask(route.params.id)
    task.value = r.data
    })

    async function save() {
    await api.updateTask(route.params.id, task.value)
    router.push({ name: 'DetailPage', params: { id: route.params.id } })
    }
    </script>