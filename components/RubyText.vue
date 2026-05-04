<script setup lang="ts">
withDefaults(
  defineProps<{
    text: string
    ruby: string
    textClass?: string
    rubyClass?: string
  }>(),
  {
    textClass: 'text-lg',
    rubyClass: 'text-sm text-gray-400'
  }
)
</script>

<template>
  <div class="text-center">
    <!-- Jyutping -->
    <div :class="rubyClass">
      {{ ruby }}
    </div>

    <!-- Chinese -->
    <div :class="textClass">
      {{ text }}
    </div>
  </div>
</template>
