<script setup lang="ts">
const supabase = useSupabaseClient()

const email = ref('')
const password = ref('')
const fullName = ref('')
const message = ref('')
const token = ref('')

const getAccessToken = async () => {
  const { data } = await supabase.auth.getSession()
  return data.session?.access_token ?? ''
}

const saveSession = async () => {
  const accessToken = await getAccessToken()

  token.value = accessToken

  if (accessToken) {
    localStorage.setItem('sb_access_token', accessToken)
  } else {
    localStorage.removeItem('sb_access_token')
  }

  return accessToken
}

const syncProfile = async (accessToken: string) => {
  if (!accessToken) {
    return
  }

  await $fetch('/api/profile', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: {
      full_name: fullName.value || null,
      avatar_url: null,
    },
  })
}

onMounted(async () => {
  token.value = localStorage.getItem('sb_access_token') ?? ''

  const accessToken = await saveSession()

  if (accessToken) {
    await syncProfile(accessToken)
  }
})

const signUp = async () => {
  message.value = ''

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        full_name: fullName.value || null,
      },
    },
  })

  if (error) {
    message.value = error.message
    return
  }

  const accessToken = data.session?.access_token ?? await saveSession()

  if (accessToken) {
    await syncProfile(accessToken)
    message.value = 'Signed up successfully.'
    return
  }

  message.value = 'Sign up request sent. Check your inbox if email confirmation is enabled.'
}

const signIn = async () => {
  message.value = ''

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    message.value = error.message
    return
  }

  const accessToken = await saveSession()
  await syncProfile(accessToken)

  message.value = 'Signed in successfully.'
}

const signOut = async () => {
  await supabase.auth.signOut()

  token.value = ''
  localStorage.removeItem('sb_access_token')

  message.value = 'Signed out successfully.'
}
</script>

<template>
  <main class="mx-auto flex min-h-screen max-w-xl flex-col gap-6 p-8">
    <h1 class="text-3xl font-bold">Ministry of Justice Account Access</h1>

    <div class="grid gap-3 rounded-lg border p-4">
      <input v-model="email" type="email" placeholder="Email" class="rounded border px-3 py-2" />

      <input v-model="password" type="password" placeholder="Password" class="rounded border px-3 py-2" />

      <input v-model="fullName" type="text" placeholder="Full name (optional)" class="rounded border px-3 py-2" />

      <div class="flex gap-2">
        <button class="rounded bg-black px-4 py-2 text-white" @click="signUp">
          Sign up
        </button>

        <button class="rounded bg-blue-600 px-4 py-2 text-white" @click="signIn">
          Sign in
        </button>

        <button class="rounded bg-gray-500 px-4 py-2 text-white" @click="signOut">
          Sign out
        </button>
      </div>

      <p class="text-sm text-gray-600">{{ message }}</p>
    </div>

    <div class="rounded-lg border p-4 text-sm">
      <p class="font-semibold">Current session token</p>
      <p class="mt-2 break-all">{{ token || 'No session token yet.' }}</p>
      <p class="mt-2 text-gray-600">
        Token is also saved in localStorage as <code>sb_access_token</code>.
      </p>
    </div>
  </main>
</template>