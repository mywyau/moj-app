<script setup lang="ts">

const runtimeConfig = useRuntimeConfig()
</script>

<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-[#F6E1E1]/30">
    <NavigationBar />

    <main class="flex-1">
      <ClientOnly>
        <Analytics />
      </ClientOnly>
      <NuxtPage />
    </main>

    <AppFooter />
  </div>
</template>
