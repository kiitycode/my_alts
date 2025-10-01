    <template>
    <section v-if="task">
        <h1>{{ task.title }}</h1>
        <p>Completed: {{ task.completed }}</p>
        <router-link :to="{ name: 'EditTask', params: { id: task.id }}">Edit</router-link>
    </section>
    <div v-else>Loading...</div>
    </template>

    <script setup>
    import { ref, onMounted } from 'vue'
    import api from '../services/api'
    import { useRoute } from 'vue-router'

    const route = useRoute()
    const task = ref(null)

    onMounted(async () => {
    const r = await api.getTask(route.params.id)
    task.value = r.data
    })
    </script>
