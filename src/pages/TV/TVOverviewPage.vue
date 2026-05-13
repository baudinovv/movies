<script setup lang="ts">
import { useStoreDetails } from '../../store/details';
import DetailsInfo from '../../components/details/detailsInfo.vue';

const store = useStoreDetails();
</script>

<template>
  <DetailsInfo
    :details="store.details"
    :director="store.director"
    :credits="store.credits"
  />
</template>
