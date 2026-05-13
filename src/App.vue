<script setup lang="ts">
import AppMenu from './components/menu/menu.vue';
import AppMain from './components/main/main.vue';
import AppFooter from './components/footer/footer.vue';
</script>

<template>
  <AppMenu />
  <AppMain>
    <RouterView />
    <AppFooter />
  </AppMain>
</template>
