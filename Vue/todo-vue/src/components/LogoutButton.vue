    <template>
    <button @click="onLogout">Logout</button>
    </template>

    <script setup>
    import { useAuthStore } from '../stores/auth'
    const auth = useAuthStore()
    function onLogout() { auth.logout() }
    </script>

    <style scoped>
    button { padding:6px 10px; border-radius:6px; border:1px solid #ddd; cursor:pointer; }
    </style>
