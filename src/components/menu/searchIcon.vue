<script setup lang="ts">
defineProps<{ type?: string }>();
</script>

<template>
  <svg v-if="type !== 'full'" class="w-full" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21l-3.5-3.5M17 10a7 7 0 1 1-14 0a7 7 0 0 1 14 0Z" />
  </svg>
  <svg v-else class="w-full" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="currentColor">
      <path d="M10 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16" />
      <path fill-rule="evenodd" d="M21.707 21.707a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1 0 1.414" clip-rule="evenodd" />
    </g>
  </svg>
</template>
