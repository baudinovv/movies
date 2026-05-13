<script setup lang="ts">
import { useRoute } from 'vue-router';
import HomeIcon from './homeIcon.vue';
import MoviesIcon from './moviesIcon.vue';
import TVIcon from './TVIcon.vue';

const route = useRoute();

const isActive = (path: string) => route.path === path;
const linkClass = (path: string) =>
  isActive(path) ? 'text-[#2cff8b]' : 'text-white hover:text-[#2cff8b]';
</script>

<template>
  <aside class="bg-black fixed bottom-0 w-full lg:content- lg:top-0 lg:left-0 lg:w-[5%] lg:h-full flex lg:flex-col items-center justify-around lg:justify-start z-50 border-t border-gray-800 lg:border-t-0 lg:border-r">
    <RouterLink to="/" class="flex items-center justify-center w-10 h-10 lg:w-full lg:mt-12 lg:py-3">
      <div :class="['w-6 h-6 transition', linkClass('/')]">
        <HomeIcon :type="isActive('/') ? 'full' : ''" />
      </div>
    </RouterLink>
    <RouterLink to="/movie" class="flex items-center justify-center w-10 h-10 lg:w-full lg:mt-6 lg:py-3">
      <div :class="['w-6 h-6 transition', linkClass('/movie')]">
        <MoviesIcon :type="isActive('/movie') ? 'full' : ''" />
      </div>
    </RouterLink>
    <RouterLink to="/tv" class="flex items-center justify-center w-10 h-10 lg:w-full lg:mt-6 lg:py-3">
      <div :class="['w-6 h-6 transition', linkClass('/tv')]">
        <TVIcon :type="isActive('/tv') ? 'full' : ''" />
      </div>
    </RouterLink>
  </aside>
</template>
