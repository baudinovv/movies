<script lang="ts">

import transitionIcon from './transitionIcon.vue';

export default{
  props: {
    type: String
  },
  components: {
    transitionIcon
  },
  name: "homeIcon"
}
</script>

<template>
  <transitionIcon>
    <path view-box="0 0 24 24" v-if="type == 'full'" fill="currentColor" d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.223a1 1 0 0 1 1.228 0l8 6.223a1 1 0 0 1 .386.79z"/>
    <path view-box="0 0 24 24" v-else fill="currentColor" d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.223a1 1 0 0 1 1.228 0l8 6.223a1 1 0 0 1 .386.79zm-2-1V9.978l-7-5.444l-7 5.444V19z" />
  </transitionIcon>
</template>


