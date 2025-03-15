<script lang="ts">
export default{
  name: "customTransition"
}
</script>

<template>
  <svg class="w-full" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <Transition>
      <slot></slot>
    </Transition> 
  </svg>
</template>


<style scoped>
.v-enter-active,
.v-leave-active {
  transition: .3s ease;
  opacity: 1;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
