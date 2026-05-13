<script setup lang="ts">
import { computed } from 'vue';
import StarIcon from './star.vue';

const props = defineProps<{ starRating: number }>();

const stars = computed(() => {
  const result: string[] = [];
  const half = props.starRating / 2;
  const full = Math.floor(Number(half.toPrecision(2)[0]));

  for (let i = 0; i < full; i++) result.push('full');
  if (Number(half.toPrecision(2)) * 10 % 10 !== 0) result.push('half');
  while (result.length < 5) result.push('empty');

  return result;
});
</script>

<template>
  <div class="flex items-center text-gray-400 gap-1">
    <div class="flex">
      <StarIcon v-for="(star, i) in stars" :key="i" :star="star" color="#2cff8b" />
    </div>
    <div class="text-sm">{{ (starRating / 2).toFixed(1) }}</div>
  </div>
</template>
