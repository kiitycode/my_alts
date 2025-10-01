    <template>
    <section>
        <h1>Create Todo</h1>
        <form @submit.prevent="create">
        <input v-model="title" placeholder="title" />
        <button :disabled="!title">Create</button>
        </form>
    </section>
    </template>

    <script setup>
    import { ref } from 'vue'
    import api from '../services/api'
    import { useRouter } from 'vue-router'

    const title = ref('')
    const router = useRouter()

    async function create() {
    await api.createTask({ title: title.value, completed: false })
    router.push({ name: 'Home' })
    }
    </script>
