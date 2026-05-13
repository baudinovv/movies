<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStoreDetails } from '../store/details';
import Headliner from '../components/header/headliner.vue';
import Rating from '../components/header/rating.vue';
import PopularSection from '../components/popular/popularSection.vue';
import PopularCard from '../components/popular/popularCard.vue';
import AppLoading from '../components/loading/loading.vue';

const store = useStoreDetails();
const router = useRouter();
const loading = ref(true);

onMounted(async () => {
  try {
    await store.getPopularMovies();
    await store.getTopRated('movie');
    await store.getUpcoming('movie');
    await store.getDetails(store.headlinerId, 'movie');
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
    <Headliner v-if="store.details" type="movie" :headliner="store.details">
      <Rating :star-rating="Number(store.headliner.vote_average?.toPrecision(2))" />
    </Headliner>

    <PopularSection popular-title="Популярные фильмы" v-if="store.popularMovies.length">
      <PopularCard
        v-for="item in store.popularMovies"
        :key="item.id"
        :card-rating="Number(item.vote_average?.toPrecision(2))"
        :card-image="item.poster_path"
        :card-title="item.title"
        @click="router.push(`/movie/${item.id}/overview`)"
      />
    </PopularSection>

    <PopularSection popular-title="Фильмы с высокой оценкой" v-if="store.topRatedMovies.length">
      <PopularCard
        v-for="item in store.topRatedMovies"
        :key="item.id"
        :card-rating="Number(item.vote_average?.toPrecision(2))"
        :card-image="item.poster_path"
        :card-title="item.title"
        @click="router.push(`/movie/${item.id}/overview`)"
      />
    </PopularSection>

    <PopularSection popular-title="Скоро выйдут" v-if="store.upcomingMovies.length">
      <PopularCard
        v-for="item in store.upcomingMovies"
        :key="item.id"
        :card-rating="Number(item.vote_average?.toPrecision(2))"
        :card-image="item.poster_path"
        :card-title="item.title"
        @click="router.push(`/movie/${item.id}/overview`)"
      />
    </PopularSection>
  </div>
</template>
