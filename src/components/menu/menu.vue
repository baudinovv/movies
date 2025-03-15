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
  <aside class="bg-black w-full h-12 lg:w-[5%] bottom-0 lg:h-lvh flex lg:flex-col items-center justify-center fixed transition border-r-[1px] border-gray-800 z-50 ">
    <RouterLink to="/" class="lg:mt-12 w-full">
      <homeIcon :type="($route.path === '/') ? 'full' : ''" :class="` lg:h-[60%] ${$route.path === '/' ? 'text-[#2cff8b]' : 'hover:text-[#2cff8b] text-[#ffffff]'} transition`" />
    </RouterLink>
    <RouterLink to="/movie" class="lg:mt-12 w-full">
      <moviesIcon :type="($route.path === '/movie') ? 'full' : ''" :class="` lg:h-[60%] ${$route.path === '/movie' ? 'text-[#2cff8b]' : 'hover:text-[#2cff8b] text-[#ffffff]'} transition`" />
    </RouterLink>
    <RouterLink to="/tv" class="lg:mt-12 w-full">
      <TVIcon :type="($route.path === '/tv') ? 'full' : ''" :class="` lg:h-[60%] ${$route.path === '/tv' ? 'text-[#2cff8b]' : 'hover:text-[#2cff8b] text-[#ffffff]'} transition`" />
    </RouterLink>
  </aside>
</template>