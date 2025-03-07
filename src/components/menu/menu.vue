<script lang="ts">

import homeIcon from  './homeIcon.vue'
import moviesIcon from './moviesIcon.vue'
import searchIcon from './searchIcon.vue'
import TVIcon from './TVIcon.vue';

export default{
  components: {
    TVIcon,
    homeIcon,
    moviesIcon,
    searchIcon,
  }
}

</script>
<template>
  <aside class="bg-black w-[5%] h-lvh flex flex-col items-center justify-center fixed transition border-r-[1px] border-gray-800 z-50">
    <RouterLink to="/" class="mt-12 w-full">
      <homeIcon :type="($route.path === '/') ? 'full' : ''" :class="`size-[60%] ${$route.path === '/' ? 'text-[#2cff8b]' : 'hover:text-[#2cff8b] text-[#ffffff]'} transition`" />
    </RouterLink>
    <RouterLink to="/movie" class="mt-12 w-full">
      <moviesIcon :type="($route.path === '/movie') ? 'full' : ''" :class="`size-[60%] ${$route.path === '/movie' ? 'text-[#2cff8b]' : 'hover:text-[#2cff8b] text-[#ffffff]'} transition`" />
    </RouterLink>
    <RouterLink to="/tv" class="mt-12 w-full">
      <TVIcon :type="($route.path === '/tv') ? 'full' : ''" :class="`size-[60%] ${$route.path === '/tv' ? 'text-[#2cff8b]' : 'hover:text-[#2cff8b] text-[#ffffff]'} transition`" />
    </RouterLink>
  </aside>
</template>
