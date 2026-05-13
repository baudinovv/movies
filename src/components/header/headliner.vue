<script setup lang="ts">
import { computed } from 'vue';
import { parseRuntime } from '../../utils/format';
import type MovieDetails from '../../interfaces/Movie/MovieDetails';
import type { TVDetails } from '../../interfaces/TV/TVDetails';

const props = defineProps<{
  headliner: MovieDetails | TVDetails;
  type: string;
}>();

const h = computed(() => props.headliner as any);

const BACKDROP_BASE = 'https://movies-proxy.vercel.app/ipx/f_webp&s_1220x659/tmdb';
const BACKDROP_2X = 'https://movies-proxy.vercel.app/ipx/f_webp&s_2440x1318/tmdb';
</script>

<template>
  <header class="w-full relative overflow-hidden h-[70vw] lg:h-[40vw] flex flex-col justify-center">
    <img
      class="absolute top-0 right-0 lg:h-full w-full lg:w-fit"
      :src="BACKDROP_BASE + h.backdrop_path"
      :srcset="`${BACKDROP_BASE}${h.backdrop_path} 1x, ${BACKDROP_2X}${h.backdrop_path} 2x`"
      alt=""
    />
    <div class="absolute w-full h-full bg-gradient-to-t lg:bg-gradient-to-r from-black via-black via-20% top-0 left-0" />
    <Transition appear>
      <div class="px-6 sm:px-12 lg:px-20 relative flex flex-col gap-3">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl">
          {{ type === 'movie' ? h.title : h.name }}
        </h1>
        <ol class="flex list-disc gap-4 sm:gap-6 text-gray-400 flex-wrap">
          <li class="flex">
            <slot />
          </li>
          <li v-if="h.vote_count" class="hidden sm:list-item">
            {{ h.vote_count > 1000 ? `${(h.vote_count / 1000).toFixed(1)}K рецензий` : `${h.vote_count} рецензий` }}
          </li>
          <li v-if="h.release_date || h.first_air_date">
            {{ type === 'movie' ? h.release_date?.substring(0, 4) : h.first_air_date }}
          </li>
          <li v-if="h.runtime" class="hidden sm:list-item">
            {{ parseRuntime(h.runtime) }}
          </li>
        </ol>
        <div class="line-clamp-3 sm:line-clamp-none text-sm sm:text-base">{{ h.overview }}</div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}
.v-enter-from,
.v-leave-to {
  margin-bottom: -70px;
  opacity: 0;
}
</style>
