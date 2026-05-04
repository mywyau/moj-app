<script setup lang="ts">
interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in_progress' | 'done'
  dueDateTime: string
}

const token = ref('')
const tasks = ref<Task[]>([])
const loading = ref(false)
const errorMessage = ref('')

const authHeaders = computed(() => ({ Authorization: `Bearer ${token.value}` }))

const newTask = ref({
  title: '',
  description: '',
  dueDateTime: '',
  status: 'todo' as Task['status'],
})

onMounted(() => {
  token.value = localStorage.getItem('sb_access_token') ?? ''
})

const saveToken = () => {
  localStorage.setItem('sb_access_token', token.value)
}

const loadTasks = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const response = await $fetch<{ tasks: Task[] }>('/api/tasks', { headers: authHeaders.value })
    tasks.value = response.tasks
  }
  catch (error: any) {
    errorMessage.value = error?.data?.statusMessage ?? 'Failed to load tasks'
  }
  finally {
    loading.value = false
  }
}

const createTask = async () => {
  errorMessage.value = ''
  try {
    await $fetch('/api/tasks', { method: 'POST', headers: authHeaders.value, body: newTask.value })
    newTask.value = { title: '', description: '', dueDateTime: '', status: 'todo' }
    await loadTasks()
  }
  catch (error: any) {
    errorMessage.value = error?.data?.statusMessage ?? 'Failed to create task'
  }
}

const updateStatus = async (task: Task, status: Task['status']) => {
  errorMessage.value = ''
  try {
    await $fetch(`/api/tasks/${task.id}`, { method: 'PATCH', headers: authHeaders.value, body: { status } })
    task.status = status
  }
  catch (error: any) {
    errorMessage.value = error?.data?.statusMessage ?? 'Failed to update task status'
  }
}

const deleteTask = async (id: string) => {
  errorMessage.value = ''
  try {
    await $fetch(`/api/tasks/${id}`, { method: 'DELETE', headers: authHeaders.value })
    tasks.value = tasks.value.filter(task => task.id !== id)
  }
  catch (error: any) {
    errorMessage.value = error?.data?.statusMessage ?? 'Failed to delete task'
  }
}
</script>

<template>
  <main class="mx-auto max-w-5xl min-h-screen p-8 space-y-8">
    <header>
      <h1 class="text-3xl font-bold">Caseworker Tasks</h1>
      <p class="text-gray-600">Create, track, and complete casework tasks.</p>
    </header>

    <section class="rounded-lg border p-4 space-y-3">
      <label class="mb-2 block text-sm font-medium">Access token (Bearer)</label>
      <textarea v-model="token" rows="3" class="w-full rounded border px-3 py-2" />
      <div class="mt-2 flex gap-2">
        <button class="rounded bg-black px-4 py-2 text-white" @click="loadTasks">Load tasks</button>
        <button class="rounded bg-gray-500 px-4 py-2 text-white" @click="saveToken">Save token</button>
      </div>
    </section>

    <section class="rounded-lg border p-4 space-y-3">
      <h2 class="text-xl font-semibold">Create task</h2>
      <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>
      <div class="grid gap-3 sm:grid-cols-2">
        <input v-model="newTask.title" class="rounded border px-3 py-2" placeholder="Task title" />
        <input v-model="newTask.dueDateTime" class="rounded border px-3 py-2" type="datetime-local" />
      </div>
      <textarea v-model="newTask.description" rows="3" class="w-full rounded border px-3 py-2" placeholder="Description (optional)" />
      <button class="rounded bg-blue-600 px-4 py-2 text-white" @click="createTask">Create task</button>
    </section>

    <section class="rounded-lg border p-4">
      <div class="mb-3 flex items-center justify-between">
        <h2 class="text-xl font-semibold">All tasks</h2>
        <button class="rounded bg-gray-900 px-3 py-1 text-white" @click="loadTasks">Refresh</button>
      </div>
      <p v-if="loading" class="text-sm text-gray-500">Loading tasks...</p>
      <ul v-else-if="tasks.length" class="space-y-3">
        <li v-for="task in tasks" :key="task.id" class="rounded border p-3">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 class="font-semibold">{{ task.title }}</h3>
              <p class="text-sm text-gray-700">{{ task.description || 'No description provided.' }}</p>
              <p class="mt-1 text-xs text-gray-500">Due: {{ new Date(task.dueDateTime).toLocaleString() }}</p>
            </div>
            <div class="flex items-center gap-2">
              <select :value="task.status" class="rounded border px-2 py-1" @change="updateStatus(task, ($event.target as HTMLSelectElement).value as Task['status'])">
                <option value="todo">To do</option>
                <option value="in_progress">In progress</option>
                <option value="done">Done</option>
              </select>
              <button class="rounded bg-red-600 px-3 py-1 text-white" @click="deleteTask(task.id)">Delete</button>
            </div>
          </div>
        </li>
      </ul>
      <p v-else class="text-sm text-gray-600">No tasks yet.</p>
    </section>
  </main>
</template>
