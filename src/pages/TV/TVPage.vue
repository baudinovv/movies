<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStoreDetails } from '../../store/details';
import Headliner from '../../components/header/headliner.vue';
import Rating from '../../components/header/rating.vue';
import DetailsMenu from '../../components/details/detailsMenu.vue';
import PopularSection from '../../components/popular/popularSection.vue';
import PopularCard from '../../components/popular/popularCard.vue';
import AppLoading from '../../components/loading/loading.vue';

const store = useStoreDetails();
const route = useRoute();
const router = useRouter();
const loading = ref(true);

const getTitle = (item: any) => item.title ?? item.name ?? '';

onMounted(async () => {
  try {
    const id = Number(route.params.id);
    await store.getDetails(id, 'tv');
    await store.getRecommendations(id, 'tv');
    await store.getCredits(id, 'tv');
    store.getProdCompanies();
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <AppLoading v-if="loading" />
  <div v-else>
    <Headliner v-if="store.details" :headliner="store.details" type="tv">
      <Rating :star-rating="Number(store.details.vote_average?.toPrecision(2))" />
    </Headliner>
    <DetailsMenu type="tv" />
    <RouterView />
    <PopularSection popular-title="Похожие">
      <PopularCard
        v-for="item in store.recommendations.results"
        :key="item.id"
        :card-rating="Number(item.vote_average.toPrecision(2))"
        :card-image="item.poster_path ?? ''"
        :card-title="getTitle(item)"
        @click="router.push(`/tv/${item.id}/overview`)"
      />
    </PopularSection>
  </div>
</template>
