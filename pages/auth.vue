<script setup lang="ts">
const email = ref('')
const password = ref('')
const fullName = ref('')
const message = ref('')
const isLoading = ref(false)

const signUp = async () => {
  message.value = ''
  isLoading.value = true

  try {
    await $fetch('/api/signup', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
        full_name: fullName.value || null,
        avatar_url: null,
      },
    })

    message.value = 'Account created successfully.'
    email.value = ''
    password.value = ''
    fullName.value = ''
  } catch (error: any) {
    console.error('Signup failed:', error)

    message.value =
      error?.data?.statusMessage ||
      error?.statusMessage ||
      'Something went wrong creating your account.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="mx-auto flex min-h-screen max-w-xl flex-col gap-6 p-8">
    <h1 class="text-3xl font-bold">Create account</h1>

    <form class="grid gap-3 rounded-lg border p-4" @submit.prevent="signUp">
      <input v-model="email" type="email" placeholder="Email" required class="rounded border px-3 py-2" />

      <input v-model="password" type="password" placeholder="Password" required class="rounded border px-3 py-2" />

      <input v-model="fullName" type="text" placeholder="Full name (optional)" class="rounded border px-3 py-2" />

      <button type="submit" :disabled="isLoading"
        class="rounded bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60">
        {{ isLoading ? 'Creating account...' : 'Create account' }}
      </button>

      <p v-if="message" class="text-sm text-gray-600">
        {{ message }}
      </p>
    </form>
  </main>
</template>