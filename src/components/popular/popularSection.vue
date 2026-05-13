<script setup lang="ts">
defineProps<{ popularTitle: string }>();
</script>

<template>
  <div class="mt-12 sm:mt-16 w-full">
    <div class="text-xl sm:text-2xl pl-4 sm:pl-8 lg:pl-12">{{ popularTitle }}</div>
    <div class="flex gap-4 pl-4 sm:pl-8 lg:pl-12 overflow-x-auto py-8 sm:py-12 overflow-y-hidden">
      <slot />
    </div>
  </div>
</template>
