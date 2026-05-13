<script setup lang="ts">
import { computed } from 'vue';
import Rating from '../header/rating.vue';

const props = defineProps<{
  cardTitle?: string;
  cardRating?: number;
  cardImage?: string;
}>();

const TMDB_BASE = 'https://movies-proxy.vercel.app/ipx/f_webp&s_400x600/tmdb';
const TMDB_2X = 'https://image.tmdb.org/t/p/original';
const FALLBACK = '/movies/assets/profile.png';

const isOwnAsset = (path?: string) => !path || path.startsWith('/movies');

const imgSrc = computed(() =>
  isOwnAsset(props.cardImage) ? FALLBACK : `${TMDB_BASE}${props.cardImage}`,
);
const imgSrcset = computed(() =>
  isOwnAsset(props.cardImage)
    ? undefined
    : `${TMDB_BASE}${props.cardImage} 1x, ${TMDB_2X}${props.cardImage} 2x`,
);
</script>

<template>
  <div class="transition max-w-60 cursor-pointer hover:scale-105 shrink-0">
    <img
      :src="imgSrc"
      :srcset="imgSrcset"
      class="border-4 border-neutral-800 min-h-[341px] min-w-[230px]"
      alt=""
      loading="lazy"
    />
    <div class="mt-2 text-lg">{{ cardTitle }}</div>
    <Rating v-if="cardRating" :star-rating="cardRating" class="w-[90px] text-sm" />
  </div>
</template>
