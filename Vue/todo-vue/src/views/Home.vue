    <template>
    <section>
        <h1>Home</h1>
        <p>Task list</p>
        <ul>
        <li v-for="t in todos" :key="t.id">
            <router-link :to="{ name: 'DetailPage', params: { id: t.id }}">{{ t.title }}</router-link>
        </li>
        </ul>
    </section>
    </template>

    <script setup>
    import { useCachedTodos } from '../composables/useCachedTodos'
    const { todos, loading } = useCachedTodos()
    </script>
