<template>
  <main class="mx-auto flex min-h-screen max-w-xl flex-col gap-6 p-8">
    <h1 class="text-3xl font-bold">Auth</h1>

    <div class="grid gap-3 rounded-lg border p-4">
      <input v-model="email" type="email" placeholder="Email" class="rounded border px-3 py-2" />
      <input v-model="password" type="password" placeholder="Password" class="rounded border px-3 py-2" />
      <div class="flex gap-2">
        <button class="rounded bg-black px-4 py-2 text-white" @click="signUp">Sign up</button>
        <button class="rounded bg-blue-600 px-4 py-2 text-white" @click="signIn">Sign in</button>
        <button class="rounded bg-gray-500 px-4 py-2 text-white" @click="signOut">Sign out</button>
      </div>
      <p class="text-sm text-gray-600">{{ message }}</p>
    </div>

    <div class="rounded-lg border p-4 text-sm">
      <p class="font-semibold">Current access token</p>
      <p class="mt-2 break-all">{{ token || 'No session token yet.' }}</p>
      <p class="mt-2 text-gray-600">Token is also saved in localStorage as <code>sb_access_token</code>.</p>
    </div>
  </main>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()

const email = ref('')
const password = ref('')
const message = ref('')
const token = ref('')

const saveSession = async () => {
  const { data } = await supabase.auth.getSession()
  token.value = data.session?.access_token ?? ''
  localStorage.setItem('sb_access_token', token.value)
}

onMounted(async () => {
  token.value = localStorage.getItem('sb_access_token') ?? ''
  await saveSession()
})

const signUp = async () => {
  const { error } = await supabase.auth.signUp({ email: email.value, password: password.value })
  message.value = error ? error.message : 'Sign up request sent. Check your inbox if email confirmation is enabled.'
  await saveSession()
}

const signIn = async () => {
  const { error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value })
  message.value = error ? error.message : 'Signed in.'
  await saveSession()
}

const signOut = async () => {
  await supabase.auth.signOut()
  token.value = ''
  localStorage.removeItem('sb_access_token')
  message.value = 'Signed out.'
}
</script>
