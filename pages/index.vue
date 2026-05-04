<script setup lang="ts">
useSeoMeta({
  title: 'Ministry of Justice Digital Services',
  description: 'Access Ministry of Justice information and digital services for citizens, legal professionals, and partner organisations.',
  ogTitle: 'Ministry of Justice Digital Services',
  ogDescription: 'Official Ministry of Justice platform for services, guidance, and updates.',
})

const serviceHighlights = [
  {
    title: 'Citizen services',
    description: 'Find official guidance and online services for documents, records, and justice-related requests.',
    bgClass: 'brand-card-yellow',
  },
  {
    title: 'Professional resources',
    description: 'Access operational information and digital tools for legal professionals and partner agencies.',
    bgClass: 'brand-card-blue',
  },
  {
    title: 'Policy and transparency',
    description: 'Review published updates, policy notices, and service information in one place.',
    bgClass: 'brand-card-pink',
  },
  {
    title: 'Secure by design',
    description: 'Use services built with privacy, reliability, and accessibility as core requirements.',
    bgClass: 'brand-card-green',
  },
]
</script>

<template>
  <main class="max-w-4xl mx-auto py-16 sm:py-20 px-6 min-h-screen">
    <section class="text-center">
      <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
        Ministry of Justice <span class="brand-text-gradient">Digital Services</span>
      </h1>

      <p class="text-base sm:text-lg text-gray-700 mt-8 max-w-2xl mx-auto">
        Welcome to the official Ministry of Justice internal platform. Use this site to access key services,
        practical guidance, and trusted information for the public and justice-sector professionals.
      </p>
    </section>

    <section class="mt-12 rounded-2xl p-6 sm:p-8 brand-cta-bg text-gray-900 shadow-sm">
      <h2 class="text-2xl font-semibold tracking-tight">
        Start here
      </h2>
      <p class="text-sm sm:text-base text-gray-800 mt-2 max-w-2xl">
        Browse available services, review official updates, or continue to your secure account area.
      </p>
      <div class="mt-5 flex flex-wrap gap-3">
        <NuxtLink to="/notes"
          class="inline-flex items-center justify-center rounded-md bg-gray-900 text-white font-medium px-4 py-2 hover:bg-gray-800 transition">
          View services
        </NuxtLink>
        <NuxtLink to="/auth"
          class="inline-flex items-center justify-center rounded-md border border-gray-700 text-gray-900 font-medium px-4 py-2 hover:bg-white/60 transition">
          Sign in
        </NuxtLink>
      </div>
    </section>

    <section class="mt-14">
      <h2 class="text-sm uppercase tracking-wide text-gray-500 mb-4">
        Service focus
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <article v-for="mode in serviceHighlights" :key="mode.title" :class="mode.bgClass"
          class="rounded-xl p-5 shadow-sm">
          <h3 class="font-semibold text-gray-900">
            {{ mode.title }}
          </h3>
          <p class="text-sm text-gray-800 mt-2">
            {{ mode.description }}
          </p>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.brand-card-green {
  background-color: #E7F3D5;
}

.brand-card-pink {
  background-color: #F6E1E1;
}

.brand-card-blue {
  background-color: #A8CAE0;
}

.brand-card-yellow {
  background-color: rgba(244, 205, 39, 0.35);
}

.brand-cta-bg {
  background: linear-gradient(135deg, #F6E1E1 0%, #EAB8E4 50%, #A8CAE0 100%);
}

.brand-text-gradient {
  background: linear-gradient(90deg, #0f4c81 0%, #2b6cb0 50%, #3f88c5 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
