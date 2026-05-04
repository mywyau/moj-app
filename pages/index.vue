<script setup lang="ts">
import type { Task } from '~/types/task'

const { data: tasks, refresh } = await useFetch<Task[]>('/api/tasks')

const updateStatus = async (id: string, status: Task['status']) => {
  await $fetch(`/api/tasks/${id}`, { method: 'PATCH', body: { status } })
  refresh()
}

const removeTask = async (id: string) => {
  await $fetch(`/api/tasks/${id}`, { method: 'DELETE' })
  refresh()
}
</script>

<template>
  <main class="mx-auto max-w-4xl space-y-6 p-6">
    <h1 class="text-3xl font-bold">Caseworker Task Manager</h1>
    <TaskForm @submitted="refresh" />

    <ul class="space-y-3">
      <li v-for="task in tasks || []" :key="task.id" class="rounded border p-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="font-semibold">{{ task.title }}</h2>
            <p class="text-sm text-gray-600">Due: {{ new Date(task.dueAt).toLocaleString() }}</p>
            <p v-if="task.description" class="mt-2">{{ task.description }}</p>
          </div>
          <div class="space-x-2">
            <select :value="task.status" class="rounded border p-1" @change="updateStatus(task.id, ($event.target as HTMLSelectElement).value as Task['status'])">
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <button class="rounded bg-red-600 px-2 py-1 text-white" @click="removeTask(task.id)">Delete</button>
          </div>
        </div>
      </li>
    </ul>
  </main>
</template>
