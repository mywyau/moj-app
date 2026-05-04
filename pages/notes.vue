
<script setup lang="ts">
interface Note {
  id: number
  title: string
  body: string
}

const token = ref('')
const newTitle = ref('')
const newBody = ref('')
const notes = ref<Note[]>([])
const errorMessage = ref('')

const authHeaders = computed(() => ({ Authorization: `Bearer ${token.value}` }))

onMounted(() => {
  token.value = localStorage.getItem('sb_access_token') ?? ''
})

const saveToken = () => {
  localStorage.setItem('sb_access_token', token.value)
}

const loadNotes = async () => {
  errorMessage.value = ''
  try {
    const response = await $fetch<{ notes: Note[] }>('/api/notes', { headers: authHeaders.value })
    notes.value = response.notes
  }
  catch (error: any) {
    errorMessage.value = error?.data?.statusMessage ?? 'Failed to load notes'
  }
}

const createNote = async () => {
  errorMessage.value = ''
  try {
    await $fetch('/api/notes', {
      method: 'POST',
      headers: authHeaders.value,
      body: { title: newTitle.value, body: newBody.value }
    })
    newTitle.value = ''
    newBody.value = ''
    await loadNotes()
  }
  catch (error: any) {
    errorMessage.value = error?.data?.statusMessage ?? 'Failed to create note'
  }
}

const updateNote = async (note: Note) => {
  errorMessage.value = ''
  try {
    await $fetch(`/api/notes/${note.id}`, {
      method: 'PUT',
      headers: authHeaders.value,
      body: { title: note.title, body: note.body }
    })
  }
  catch (error: any) {
    errorMessage.value = error?.data?.statusMessage ?? 'Failed to update note'
  }
}

const deleteNote = async (id: number) => {
  errorMessage.value = ''
  try {
    await $fetch(`/api/notes/${id}`, {
      method: 'DELETE',
      headers: authHeaders.value
    })
    notes.value = notes.value.filter(note => note.id !== id)
  }
  catch (error: any) {
    errorMessage.value = error?.data?.statusMessage ?? 'Failed to delete note'
  }
}
</script>


<template>
  <main class="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 p-8">
    <h1 class="text-3xl font-bold">Notes CRUD</h1>

    <section class="rounded-lg border p-4">
      <label class="mb-2 block text-sm font-medium">Access token (Bearer)</label>
      <textarea v-model="token" rows="3" class="w-full rounded border px-3 py-2" />
      <div class="mt-2 flex gap-2">
        <button class="rounded bg-black px-4 py-2 text-white" @click="loadNotes">Load notes</button>
        <button class="rounded bg-gray-500 px-4 py-2 text-white" @click="saveToken">Save token</button>
      </div>
    </section>

    <section class="rounded-lg border p-4">
      <h2 class="mb-2 text-xl font-semibold">Create note</h2>
      <div class="grid gap-2">
        <input v-model="newTitle" placeholder="Title" class="rounded border px-3 py-2" />
        <textarea v-model="newBody" rows="4" placeholder="Body" class="rounded border px-3 py-2" />
        <button class="w-fit rounded bg-blue-600 px-4 py-2 text-white" @click="createNote">Create</button>
      </div>
    </section>

    <section class="rounded-lg border p-4">
      <h2 class="mb-3 text-xl font-semibold">Your notes</h2>
      <p v-if="errorMessage" class="mb-3 text-sm text-red-600">{{ errorMessage }}</p>
      <ul v-if="notes.length" class="space-y-3">
        <li v-for="note in notes" :key="note.id" class="rounded border p-3">
          <input v-model="note.title" class="mb-2 w-full rounded border px-2 py-1 font-semibold" />
          <textarea v-model="note.body" rows="3" class="w-full rounded border px-2 py-1" />
          <div class="mt-2 flex gap-2">
            <button class="rounded bg-emerald-600 px-3 py-1 text-white" @click="updateNote(note)">Update</button>
            <button class="rounded bg-red-600 px-3 py-1 text-white" @click="deleteNote(note.id)">Delete</button>
          </div>
        </li>
      </ul>
      <p v-else class="text-sm text-gray-600">No notes yet.</p>
    </section>
  </main>
</template>
