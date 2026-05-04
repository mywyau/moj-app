<script setup lang="ts">
interface Task {
  id: string
  status: 'todo' | 'in_progress' | 'done'
  dueDateTime: string
}

const tasks = ref<Task[]>([])
const loading = ref(false)
const errorMessage = ref('')

const loadTasks = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch<{ tasks: Task[] }>('/api/tasks')
    tasks.value = response.tasks
  }
  catch (error: any) {
    errorMessage.value = error?.data?.statusMessage ?? error?.statusMessage ?? 'Could not load dashboard data'
  }
  finally {
    loading.value = false
  }
}

const totalTasks = computed(() => tasks.value.length)

const todoTasks = computed(() =>
  tasks.value.filter(task => task.status === 'todo').length,
)

const inProgressTasks = computed(() =>
  tasks.value.filter(task => task.status === 'in_progress').length,
)

const doneTasks = computed(() =>
  tasks.value.filter(task => task.status === 'done').length,
)

const overdueTasks = computed(() =>
  tasks.value.filter((task) => {
    if (task.status === 'done') {
      return false
    }

    if (!task.dueDateTime) {
      return false
    }

    return Date.parse(task.dueDateTime) < Date.now()
  }).length,
)

onMounted(loadTasks)
</script>

<template>
  <main class="mx-auto max-w-5xl min-h-screen p-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <p class="text-gray-600">At-a-glance summary of todos.</p>
    </header>

    <p v-if="errorMessage" class="mb-4 text-sm text-red-600">
      {{ errorMessage }}
    </p>

    <p v-if="loading" class="mb-4 text-sm text-gray-500">
      Loading dashboard data...
    </p>

    <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <article class="rounded-lg border bg-white p-4">
        <p class="text-sm text-gray-500">Total tasks</p>
        <p class="text-3xl font-semibold">{{ totalTasks }}</p>
      </article>

      <article class="rounded-lg border bg-amber-50 p-4">
        <p class="text-sm text-gray-600">To do</p>
        <p class="text-3xl font-semibold">{{ todoTasks }}</p>
      </article>

      <article class="rounded-lg border bg-blue-50 p-4">
        <p class="text-sm text-gray-600">In progress</p>
        <p class="text-3xl font-semibold">{{ inProgressTasks }}</p>
      </article>

      <article class="rounded-lg border bg-emerald-50 p-4">
        <p class="text-sm text-gray-600">Done</p>
        <p class="text-3xl font-semibold">{{ doneTasks }}</p>
      </article>

      <article class="rounded-lg border bg-red-50 p-4">
        <p class="text-sm text-gray-600">Overdue</p>
        <p class="text-3xl font-semibold">{{ overdueTasks }}</p>
      </article>
    </section>

    <div class="mt-6">
      <NuxtLink
        to="/tasks"
        class="rounded bg-gray-900 px-4 py-2 text-white"
      >
        Go to tasks page
      </NuxtLink>
    </div>
  </main>
</template>