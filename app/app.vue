<template>
  <main class="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 p-8">
    <header>
      <h1 class="text-3xl font-bold">{{ appName }}</h1>
      <p class="text-gray-600">Nuxt 3 + Vercel + Supabase + Upstash starter</p>
    </header>

    <section class="rounded-lg border p-4">
      <h2 class="mb-2 text-xl font-semibold">Runtime checks</h2>
      <ul class="list-disc space-y-1 pl-5 text-sm">
        <li>API health: <strong>{{ status?.ok ? 'ready' : 'not ready' }}</strong></li>
        <li>Redis configured: {{ status?.redisConfigured ? 'yes' : 'no' }}</li>
        <li>Supabase configured: {{ status?.supabaseConfigured ? 'yes' : 'no' }}</li>
      </ul>
    </section>
  </main>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const appName = config.public.appName

const { data: status } = await useFetch('/api/health')
</script>
