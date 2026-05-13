<script setup lang="ts">
import { computed } from 'vue';
import { parseRuntime } from '../../utils/format';
import type MovieDetails from '../../interfaces/Movie/MovieDetails';
import type Credits from '../../interfaces/Movie/Credits';
import type { TVDetails } from '../../interfaces/TV/TVDetails';
import PopularSection from '../popular/popularSection.vue';
import PopularCard from '../popular/popularCard.vue';

const props = defineProps<{
  details: MovieDetails | TVDetails;
  director: string;
  credits: Credits;
}>();

const d = computed(() => props.details as any);

const IMAGE_BASE = 'https://movies-proxy.vercel.app/ipx/f_webp&s_400x600/tmdb/';
</script>

<template>
  <div class="flex flex-col lg:flex-row mx-auto px-4 sm:px-8 lg:px-12 gap-6 lg:gap-12 w-full lg:max-w-[85%] pt-4">
    <img
      :src="IMAGE_BASE + d.poster_path"
      class="max-w-[180px] sm:max-w-[220px] lg:max-w-xs border-4 border-neutral-800 self-center lg:self-start shrink-0"
      alt=""
    />
    <div class="w-full">
      <div class="text-2xl sm:text-3xl">Описание</div>
      <div class="mt-4 text-sm sm:text-base">{{ d.overview }}</div>

      <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div class="grid grid-cols-2 gap-x-4 items-start content-start">
          <div class="pt-3 text-sm text-neutral-400">Дата выхода</div>
          <div class="pt-3 text-sm">{{ d.release_date || d.first_air_date }}</div>

          <template v-if="director">
            <div class="pt-3 text-sm text-neutral-400">Режиссёр</div>
            <div class="pt-3">
              <span class="px-2 py-1 bg-neutral-700 rounded-lg text-xs">{{ director }}</span>
            </div>
          </template>

          <template v-if="d.revenue">
            <div class="pt-3 text-sm text-neutral-400">Сборы</div>
            <div class="pt-3 text-sm">${{ d.revenue.toLocaleString() }}</div>
          </template>

          <div class="pt-3 text-sm text-neutral-400">Статус</div>
          <div class="pt-3 text-sm">{{ d.status }}</div>

          <div class="pt-3 text-sm text-neutral-400">Кинокомпания</div>
          <div class="pt-3 text-sm">
            {{ d.production_companies?.map((c: any) => c.name).join(', ') }}
          </div>
        </div>

        <div class="grid grid-cols-2 gap-x-4 items-start content-start">
          <template v-if="d.runtime">
            <div class="pt-3 text-sm text-neutral-400">Продолжительность</div>
            <div class="pt-3 text-sm">{{ parseRuntime(d.runtime) }}</div>
          </template>

          <template v-if="d.budget">
            <div class="pt-3 text-sm text-neutral-400">Бюджет</div>
            <div class="pt-3 text-sm">${{ d.budget.toLocaleString() }}</div>
          </template>

          <div class="pt-3 text-sm text-neutral-400">Жанр</div>
          <div class="pt-3 flex flex-wrap gap-2">
            <span
              v-for="genre in d.genres"
              :key="genre.id"
              class="px-2 py-1 bg-neutral-700 rounded-lg text-xs"
            >
              {{ genre.name }}
            </span>
          </div>

          <div class="pt-3 text-sm text-neutral-400">Язык</div>
          <div class="pt-3 text-sm">
            {{ d.spoken_languages?.map((l: any) => l.english_name).join(', ') }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <PopularSection popular-title="Актерский состав">
    <PopularCard
      v-for="(actor, i) in credits.cast"
      :key="i"
      :card-rating="0"
      :card-image="actor.profile_path ?? ''"
      :card-title="actor.name"
    />
  </PopularSection>
</template>
