<template>
  <section>
    <h1>Create Task</h1>

    <form @submit.prevent="onSubmit" class="mt-2">
      <div class="mb-1">
        <label for="name">Name</label><br />
        <input
          id="name"
          v-model="form.name"
          placeholder="e.g. Buy groceries"
          class="form-control"
        />
        <p v-if="errors.name" class="text-danger">{{ errors.name }}</p>
      </div>

      <div class="mb-1">
        <label for="description">Description</label><br />
        <textarea
          id="description"
          v-model="form.description"
          placeholder="Optional details..."
          class="form-control"
        />
      </div>

      <div class="mb-1">
        <label>Status</label><br />
        <select v-model="form.status">
          <option value="">-- Select --</option>
          <option value="TODO">📝 TODO</option>
          <option value="IN_PROGRESS">🚧 In Progress</option>
          <option value="DONE">✅ Done</option>
          <option value="CANCELLED">❌ Cancelled</option>
        </select>
        <p v-if="errors.status" class="text-danger">{{ errors.status }}</p>
      </div>

      <div class="mb-1">
        <label>Priority</label><br />
        <select v-model="form.priority">
          <option value="">-- Select --</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <p v-if="errors.priority" class="text-danger">{{ errors.priority }}</p>
      </div>

      <div class="flex-between mt-2">
        <router-link to="/" class="btn">⬅ Cancel</router-link>
        <button type="submit" class="btn" :disabled="submitting">
          {{ submitting ? "Saving..." : "💾 Save" }}
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { createTask } from '../services/api'

const router = useRouter()
const { user } = useAuth()

const form = reactive({
  name: '',
  description: '',
  status: '',
  priority: ''
})

const errors = reactive({})
const submitting = ref(false)

function validate() {
  errors.name = form.name ? '' : 'Task name is required'
  errors.status = form.status ? '' : 'Status is required'
  errors.priority = form.priority ? '' : 'Priority is required'
  return !errors.name && !errors.status && !errors.priority
}

async function onSubmit() {
  if (!user) {
    router.push('/login')
    return
  }
  if (!validate()) return

  submitting.value = true
  try {
    const created = await createTask(
      {
        name: form.name,
        description: form.description,
        status: form.status,
        priority: form.priority
      },
      user.id
    )

    console.log('Task created:', created)
    router.push({ name: 'Home', state: { refresh: true, highlightTask: created.id } })
  } catch (err) {
    alert(`Failed to create task: ${err.message}`)
    console.error(err)
  } finally {
    submitting.value = false
  }
}
</script>
