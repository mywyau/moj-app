<script setup lang="ts">
const emit = defineEmits<{ submitted: [] }>()

const form = reactive({
  title: '',
  description: '',
  status: 'todo',
  dueAt: ''
})

const submit = async () => {
  await $fetch('/api/tasks', {
    method: 'POST',
    body: {
      ...form,
      dueAt: new Date(form.dueAt).toISOString()
    }
  })

  form.title = ''
  form.description = ''
  form.status = 'todo'
  form.dueAt = ''
  emit('submitted')
}
</script>

<template>
  <form class="space-y-3 rounded border p-4" @submit.prevent="submit">
    <input v-model="form.title" class="w-full rounded border p-2" placeholder="Task title" required>
    <textarea v-model="form.description" class="w-full rounded border p-2" placeholder="Description" />
    <div class="grid grid-cols-2 gap-2">
      <select v-model="form.status" class="rounded border p-2">
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <input v-model="form.dueAt" class="rounded border p-2" type="datetime-local" required>
    </div>
    <button class="rounded bg-blue-600 px-4 py-2 text-white">Create Task</button>
  </form>
</template>
