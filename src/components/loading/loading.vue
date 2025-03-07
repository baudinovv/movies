<script lang="ts">

export default{
  name: "c-loading"
}

</script>

<template>
  <div class="absolute w-full h-[100vh] flex items-center justify-center bg-neutral-900 left-0">
    <svg class="max-w-12 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    	<path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8" />
    </svg>
  </div>
</template>

<style>
</style>