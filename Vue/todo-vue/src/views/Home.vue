    <template>
    <main class="container">
        <!-- User header -->
        <div class="user-header">
        <div class="user-greeting">
            Welcome, <span>{{ user?.username }}</span>
        </div>
        <button @click="handleLogout" class="btn logout-btn">
            Logout
        </button>
        </div>

        <!-- Main content -->
        <div class="main-content">
        <div class="flex-between">
            <h1>📋 Task List</h1>
            <router-link to="/create" class="btn">+ New Task</router-link>
        </div>

        <!-- Search & Filters -->
        <div class="mt-2 flex-between">
            <input
            type="text"
            placeholder="Search task name..."
            v-model="search"
            style="max-width: 40%"
            />

            <select v-model="status">
            <option value="all">All Statuses</option>
            <option value="TODO">📝 TODO</option>
            <option value="IN_PROGRESS">🚧 In Progress</option>
            <option value="DONE">✅ Done</option>
            <option value="CANCELLED">❌ Cancelled</option>
            </select>

            <select v-model="priority">
            <option value="all">All Priorities</option>
            <option value="LOW">🟢 Low</option>
            <option value="MEDIUM">🟠 Medium</option>
            <option value="HIGH">🔴 High</option>
            </select>
        </div>

        <p v-if="loading" class="mt-2">Loading tasks...</p>
        <p v-if="error" class="mt-2 text-danger">{{ error }}</p>
        <p v-if="!loading && filteredTasks.length === 0" class="mt-2">No tasks found.</p>

        <!-- Task List -->
        <ul class="mt-2">
            <li v-for="task in currentTasks" :key="task.id" class="card mb-1">
            <div class="flex-between">
                <div>
                <strong>{{ task.name }}</strong>
                <p class="mt-1">
                    <span>Status: {{ task.status }}</span><br />
                    <span>Priority: {{ task.priority }}</span>
                </p>
                </div>
                <router-link :to="`/tasks/${task.id}`" class="btn">View</router-link>
            </div>
            </li>
        </ul>

        <!-- Pagination -->
        <div class="flex-between mt-2 pagination-controls">
            <button
            v-if="currentPage > 1"
            @click="goToPage(currentPage - 1)"
            class="btn"
            >
            ⬅ Prev
            </button>

            <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            class="btn"
            :disabled="currentPage === page"
            :style="{
                background: currentPage === page ? 'var(--accent)' : 'var(--gold)',
                color: currentPage === page ? 'white' : 'black'
            }"
            >
            {{ page }}
            </button>

            <button
            v-if="currentPage < totalPages"
            @click="goToPage(currentPage + 1)"
            class="btn"
            >
            Next ➡
            </button>
        </div>
        </div>
    </main>
    </template>

    <script setup>
    import { ref, computed, onMounted, watch } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import { fetchTasks } from "../services/api"; 
    import { useAuth } from "../composables/useAuth"; // custom composable for auth

    const { user, logout } = useAuth();
    const router = useRouter();
    const route = useRoute();

    const tasks = ref([]);
    const error = ref("");
    const loading = ref(true);
    const refreshKey = ref(0);

    // Filters
    const search = ref("");
    const status = ref("all");
    const priority = ref("all");

    // Pagination
    const currentPage = ref(1);
    const tasksPerPage = 10;

    async function loadTasks() {
    if (!user.value) return;

    try {
        console.log(`Loading tasks for user ${user.value.id}...`);
        const data = await fetchTasks(user.value.id);
        tasks.value = data;
        error.value = "";
    } catch (err) {
        error.value = err.message || "Failed to fetch tasks";
        tasks.value = [];
    } finally {
        loading.value = false;
    }
    }

    onMounted(loadTasks);

    // Watch for refresh trigger via router state
    watch(
    () => route.query.refresh,
    (val) => {
        if (val) {
        console.log("Refresh triggered from navigation state");
        refreshKey.value++;
        loadTasks();
        }
    }
    );

    // Computed filters
    const filteredTasks = computed(() =>
    tasks.value.filter((task) => {
        const matchesSearch = task.name?.toLowerCase().includes(search.value.toLowerCase());
        const matchesStatus = status.value === "all" || task.status === status.value;
        const matchesPriority = priority.value === "all" || task.priority === priority.value;
        return matchesSearch && matchesStatus && matchesPriority;
    })
    );

    const totalPages = computed(() =>
    Math.ceil(filteredTasks.value.length / tasksPerPage)
    );

    const currentTasks = computed(() => {
    const indexOfLast = currentPage.value * tasksPerPage;
    const indexOfFirst = indexOfLast - tasksPerPage;
    return filteredTasks.value.slice(indexOfFirst, indexOfLast);
    });

    function goToPage(page) {
    currentPage.value = page;
    }

    function handleLogout() {
    logout();
    router.push("/login");
    }
    </script>
