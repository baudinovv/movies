<script setup lang="ts">
import { useRoute } from 'vue-router';

const props = withDefaults(defineProps<{ type?: string }>(), { type: 'movie' });
const route = useRoute();
</script>

<template>
  <nav class="mt-8 sm:mt-12 pb-8 sm:pb-12 flex gap-4 sm:gap-6 justify-center">
    <RouterLink
      :to="`/${props.type}/${route.params.id}/overview`"
      :class="['transition uppercase text-base sm:text-xl tracking-widest font-light border-b-2 border-transparent hover:border-white', route.path.includes('overview') ? 'border-white' : 'text-neutral-500']"
    >
      обзор
    </RouterLink>
    <RouterLink
      :to="`/${props.type}/${route.params.id}/video`"
      :class="['transition uppercase text-base sm:text-xl tracking-widest font-light border-b-2 border-transparent hover:border-white', route.path.includes('video') ? 'border-white' : 'text-neutral-500']"
    >
      видео
    </RouterLink>
    <RouterLink
      :to="`/${props.type}/${route.params.id}/image`"
      :class="['transition uppercase text-base sm:text-xl tracking-widest font-light border-b-2 border-transparent hover:border-white', route.path.includes('image') ? 'border-white' : 'text-neutral-500']"
    >
      изображения
    </RouterLink>
  </nav>
</template>
