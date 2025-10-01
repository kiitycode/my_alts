    <template>
    <section>
        <h1>Login</h1>
        <form @submit.prevent="login">
        <input v-model="username" placeholder="username" />
        <button>Login</button>
        </form>
    </section>
    </template>

    <script setup>
    import { ref } from 'vue'
    import { useAuthStore } from '../stores/auth'
    import { useRouter } from 'vue-router'

    const username = ref('')
    const auth = useAuthStore()
    const router = useRouter()

    function login() {
    auth.setUser({ name: username.value })
    router.push({ name: 'Home' })
    }
    </script>
