<script lang="ts">

import { defineComponent } from "vue";

import cMenu from './components/menu/menu.vue';
import cMain from './components/main/main.vue';
import cFooter from './components/footer/footer.vue'

export default defineComponent({
  name: "App",
  components: {
    cMenu,
    cMain,
    cFooter
  }
});
</script>

<template>
  <Transition>
    <cMenu />
  </Transition> 
  <cMain >
    <RouterView/>
    <cFooter />
  </cMain>
</template>


<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
  opacity: 1;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
