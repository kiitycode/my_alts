    import { useAuthStore } from '../stores/auth'
    export function useAuth() {
    const store = useAuthStore()
    return { user: store.user, setUser: store.setUser, logout: store.logout }
    }
