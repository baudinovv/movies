<script lang="ts">
import MovieDetails from '../../interfaces/Movie/MovieDetails';
import { TVDetails } from '../../interfaces/TV/TVDetails';

export default{
  name: "c-header",
  props: {
    headliner: {} as MovieDetails | TVDetails,
    type: String
  },
  data(){
    return {
      moviesLink: "https://movies-proxy.vercel.app/ipx/f_webp&s_1220x659/tmdb"
    }
  },
  methods : {
    parseRuntime(arg: number){
      return arg > 60 ? `${Math.floor(arg/60)}ч ${arg - (Math.floor(arg/60) * 60)}м` : '';
    }
  }
}

</script>
<template>
  <header class="w-full relative overflow-hidden h-[40vw] flex flex-col justify-center">
    <img class="absolute top-0 right-0 h-full" :src="moviesLink + headliner?.backdrop_path"  :srcset="`https://movies-proxy.vercel.app/ipx/f_webp&amp;s_1220x659/tmdb${headliner?.backdrop_path} 1x, https://movies-proxy.vercel.app/ipx/f_webp&amp;s_2440x1318/tmdb${headliner?.backdrop_path} 2x`">
    <div class="absolute w-full h-full bg-gradient-to-r from-black via-black via-20% top-0 left-0 "></div>
    <Transition appear>
      <div class="px-[80px] relative flex flex-col gap-3 justify-between">
        <h1 class="text-4xl">{{ (type === 'movie') ? headliner?.title : headliner?.name }}</h1>
        <ol class="flex list-disc gap-6 text-gray-400">
          <li class="flex"> <slot></slot> </li>
          <li v-if="headliner?.vote_count" class="">{{ (headliner?.vote_count > 1000) ? `${headliner?.vote_count / 1000}`.substring(0, 3) + 'K рецензий' : `${headliner?.vote_count} рецензий` }}</li>
          <li v-if="headliner.release_date?.substring(0,4) || headliner.first_air_date?.substring(0,4)" class="">{{ (type === 'movie') ? headliner.release_date?.substring(0,4) : headliner?.first_air_date }}</li>
          <li v-if="headliner?.runtime" class="">{{ parseRuntime(headliner?.runtime) }}</li>
        </ol>
        <div class="">{{ headliner?.overview }}</div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  margin-bottom: 0px;
  transition: all 1s ease;
  opacity: 1;
}

.v-enter-from,
.v-leave-to {
  margin-bottom: -70px;
  opacity: 0;
}
</style>