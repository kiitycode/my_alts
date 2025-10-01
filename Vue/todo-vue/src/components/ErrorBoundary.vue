    <template>
    <div>
        <slot v-if="!errored" />
        <div v-else class="error-boundary">
        <h2>Something went wrong.</h2>
        <pre>{{ errorMessage }}</pre>
        </div>
    </div>
    </template>

    <script>
    import { ref } from 'vue'
    export default {
    name: 'ErrorBoundary',
    setup() {
        const errored = ref(false)
        const errorMessage = ref('')
        return { errored, errorMessage }
    },
    errorCaptured(err) {
        this.errored = true
        this.errorMessage = err?.message || String(err)
        console.error('Captured error in ErrorBoundary:', err)
        return false
    }
    }
    </script>

    <style scoped>
    .error-boundary { padding:16px; background:#fff0f0; border:1px solid #f2c2c2; }
    </style>
