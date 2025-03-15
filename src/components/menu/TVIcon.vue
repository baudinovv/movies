<script lang="ts">

import transitionIcon from './transitionIcon.vue';

export default{
  props: {
    type: String
  },
  components: {
    transitionIcon
  },
  name: "TVIcon"
}
</script>
<template>
  <transitionIcon>
    <path class="w-full" :fill="type === 'full' ? 'currentColor' : 'none'" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m12 7l6.632-4m-7.106 4L5.368 3M3 9.154C3 7.964 3.895 7 5 7h14c1.105 0 2 .964 2 2.154v9.692c0 1.19-.895 2.154-2 2.154H5c-1.105 0-2-.964-2-2.154z" />
  </transitionIcon>
</template>
