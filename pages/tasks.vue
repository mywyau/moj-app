<script setup lang="ts">
interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in_progress' | 'done'
  dueDateTime: string
}

const tasks = ref<Task[]>([])
const loading = ref(false)
const saving = ref(false)
const errorMessage = ref('')

const editingTaskId = ref<string | null>(null)

const newTask = ref({
  title: '',
  description: '',
  dueDateTime: '',
})

const editTask = ref({
  title: '',
  description: '',
  dueDateTime: '',
  status: 'todo' as Task['status'],
})

onMounted(async () => {
  await loadTasks()
})

const loadTasks = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch<{ tasks: Task[] }>('/api/tasks')
    tasks.value = response.tasks
  }
  catch (error: any) {
    errorMessage.value = error?.data?.statusMessage ?? error?.statusMessage ?? 'Failed to load tasks'
  }
  finally {
    loading.value = false
  }
}

const createTask = async () => {
  errorMessage.value = ''

  if (!newTask.value.title.trim()) {
    errorMessage.value = 'Task title is required'
    return
  }

  saving.value = true

  try {
    await $fetch('/api/tasks', {
      method: 'POST',
      body: {
        title: newTask.value.title.trim(),
        description: newTask.value.description.trim(),
        dueDateTime: newTask.value.dueDateTime,
        status: 'todo',
      },
    })

    newTask.value = {
      title: '',
      description: '',
      dueDateTime: '',
    }

    await loadTasks()
  }
  catch (error: any) {
    errorMessage.value = error?.data?.statusMessage ?? error?.statusMessage ?? 'Failed to create task'
  }
  finally {
    saving.value = false
  }
}

const startEditing = (task: Task) => {
  editingTaskId.value = task.id

  editTask.value = {
    title: task.title,
    description: task.description,
    dueDateTime: task.dueDateTime,
    status: task.status,
  }
}

const cancelEditing = () => {
  editingTaskId.value = null

  editTask.value = {
    title: '',
    description: '',
    dueDateTime: '',
    status: 'todo',
  }
}

const updateTask = async (taskId: string) => {
  errorMessage.value = ''

  if (!editTask.value.title.trim()) {
    errorMessage.value = 'Task title is required'
    return
  }

  try {
    await $fetch(`/api/tasks/${taskId}`, {
      method: 'PATCH',
      body: {
        title: editTask.value.title.trim(),
        description: editTask.value.description.trim(),
        dueDateTime: editTask.value.dueDateTime,
        status: editTask.value.status,
      },
    })

    cancelEditing()
    await loadTasks()
  }
  catch (error: any) {
    errorMessage.value = error?.data?.statusMessage ?? error?.statusMessage ?? 'Failed to update task'
  }
}

const deleteTask = async (id: string) => {
  errorMessage.value = ''

  try {
    await $fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    })

    tasks.value = tasks.value.filter(task => task.id !== id)
  }
  catch (error: any) {
    errorMessage.value = error?.data?.statusMessage ?? error?.statusMessage ?? 'Failed to delete task'
  }
}

const formatDueDate = (dueDateTime: string) => {
  if (!dueDateTime) return 'No due date'

  return new Date(dueDateTime).toLocaleString()
}

const formatStatus = (status: Task['status']) => {
  if (status === 'todo') return 'To do'
  if (status === 'in_progress') return 'In progress'
  return 'Done'
}

const getStatusClass = (status: Task['status']) => {
  if (status === 'todo') {
    return 'bg-amber-100 text-amber-800 border-amber-200'
  }

  if (status === 'in_progress') {
    return 'bg-blue-100 text-blue-800 border-blue-200'
  }

  return 'bg-emerald-100 text-emerald-800 border-emerald-200'
}


</script>

<template>
  <main class="mx-auto min-h-screen max-w-5xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
    <header class="space-y-1">
      <h1 class="text-2xl font-bold sm:text-3xl">
        Todo List
      </h1>

      <p class="text-sm text-gray-600 sm:text-base">
        Create, edit, complete, and delete todos.
      </p>
    </header>

    <section class="space-y-4 rounded-lg border p-4 sm:p-6">
      <h2 class="text-lg font-semibold sm:text-xl">
        Create todo
      </h2>

      <p v-if="errorMessage" class="text-sm text-red-600">
        {{ errorMessage }}
      </p>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label class="min-w-0 space-y-1">
          <span class="block text-sm font-medium text-gray-700">
            Todo title
          </span>

          <input v-model="newTask.title" class="w-full min-w-0 rounded border px-3 py-2" placeholder="Todo title" />
        </label>

        <label class="min-w-0 space-y-1">
          <span class="block text-sm font-medium text-gray-700">
            Due date
          </span>

          <input v-model="newTask.dueDateTime" class="w-full min-w-0 rounded border px-3 py-2" type="datetime-local" />
        </label>
      </div>

      <label class="block min-w-0 space-y-1">
        <span class="block text-sm font-medium text-gray-700">
          Description
        </span>

        <textarea v-model="newTask.description" rows="3" class="w-full min-w-0 rounded border px-3 py-2"
          placeholder="Description optional" />
      </label>

      <div class="flex flex-col gap-2 sm:flex-row">
        <button class="w-full rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50 sm:w-auto" :disabled="saving"
          @click="createTask">
          {{ saving ? 'Creating...' : 'Create todo' }}
        </button>
      </div>
    </section>

    <section class="rounded-lg border p-4 sm:p-6">
      <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-lg font-semibold sm:text-xl">
          All todos
        </h2>

        <button class="w-full rounded bg-gray-900 px-3 py-2 text-white sm:w-auto sm:py-1" @click="loadTasks">
          Refresh
        </button>
      </div>

      <p v-if="loading" class="text-sm text-gray-500">
        Loading todos...
      </p>

      <ul v-else-if="tasks.length" class="space-y-3">
        <li v-for="task in tasks" :key="task.id" class="rounded border p-4">
          <div v-if="editingTaskId === task.id" class="space-y-4">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label class="min-w-0 space-y-1">
                <span class="block text-sm font-medium text-gray-700">
                  Todo title
                </span>

                <input v-model="editTask.title" class="w-full min-w-0 rounded border px-3 py-2"
                  placeholder="Todo title" />
              </label>

              <label class="min-w-0 space-y-1">
                <span class="block text-sm font-medium text-gray-700">
                  Due date
                </span>

                <input v-model="editTask.dueDateTime" class="w-full min-w-0 rounded border px-3 py-2"
                  type="datetime-local" />
              </label>
            </div>

            <label class="block min-w-0 space-y-1">
              <span class="block text-sm font-medium text-gray-700">
                Description
              </span>

              <textarea v-model="editTask.description" rows="3" class="w-full min-w-0 rounded border px-3 py-2"
                placeholder="Description optional" />
            </label>

            <label class="block min-w-0 space-y-1 sm:max-w-xs">
              <span class="block text-sm font-medium text-gray-700">
                Status
              </span>

              <select v-model="editTask.status" class="w-full rounded border px-3 py-2">
                <option value="todo">To do</option>
                <option value="in_progress">In progress</option>
                <option value="done">Done</option>
              </select>
            </label>

            <div class="flex flex-col gap-2 sm:flex-row">
              <button class="w-full rounded bg-green-600 px-3 py-2 text-white sm:w-auto sm:py-1"
                @click="updateTask(task.id)">
                Save
              </button>

              <button class="w-full rounded bg-gray-500 px-3 py-2 text-white sm:w-auto sm:py-1" @click="cancelEditing">
                Cancel
              </button>
            </div>
          </div>

          <div v-else class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div class="min-w-0 space-y-1">
              <div class="flex flex-wrap items-center gap-2">
                <h3 class="break-words font-semibold">
                  {{ task.title }}
                </h3>

                <span class="rounded border px-2 py-1 text-xs font-medium" :class="getStatusClass(task.status)">
                  {{ formatStatus(task.status) }}
                </span>
              </div>

              <p class="break-words text-sm text-gray-700">
                {{ task.description || 'No description provided.' }}
              </p>

              <p class="text-xs text-gray-500">
                Due: {{ formatDueDate(task.dueDateTime) }}
              </p>
            </div>

            <div class="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              <button class="w-full rounded bg-gray-700 px-3 py-2 text-white sm:w-auto sm:py-1"
                @click="startEditing(task)">
                Edit
              </button>

              <button class="w-full rounded bg-red-600 px-3 py-2 text-white sm:w-auto sm:py-1"
                @click="deleteTask(task.id)">
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>

      <p v-else class="text-sm text-gray-600">
        No todos yet.
      </p>
    </section>
  </main>
</template>