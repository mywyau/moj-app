<script setup lang="ts">
// import { Analytics } from '@vercel/analytics/vue';

const runtimeConfig = useRuntimeConfig()

// const baseUrl = (runtimeConfig.public.siteUrl || 'http://localhost:3000').replace(/\/$/, '')

// useHead({
//   link: [
//     {
//       rel: 'canonical',
//       href: `${baseUrl}/`,
//     },
//   ],
// })

// useSeoMeta({
//   ogUrl: `${baseUrl}/`,
//   ogTitle: 'Ministry of Justice · Learn Ministry of Justice',
//   ogDescription: 'Learn natural Ministry of Justice with exercises, vocabulary, audio and quizzes.',
//   twitterTitle: 'Ministry of Justice · Learn Ministry of Justice',
//   twitterDescription: 'Learn natural Ministry of Justice with exercises, vocabulary, audio and quizzes.',
// })

</script>

<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-[#F6E1E1]/30">
    <BlankNavBar />

    <main class="flex-1">
      <ClientOnly>
        <Analytics />
      </ClientOnly>
      <NuxtPage />
    </main>

    <AppFooter />
  </div>
</template>
