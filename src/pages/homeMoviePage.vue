<script lang="ts">
import { defineComponent } from "vue";
import { useStoreDetails } from "../store/details.ts";
import cHeader from "../components/header/headliner.vue";
import cRating from "../components/header/rating.vue";
import cPopular from "../components/popular/popularSection.vue";
import cCard from "../components/popular/popularCard.vue";
import cLoading from "../components/loading/loading.vue";

export default defineComponent({
  name: "App",
  components: {
    cHeader,
    cRating,
    cPopular,
    cCard,
    cLoading
  },
  data() {
    return {
      loading: true,
      store: useStoreDetails()
    };
  },
  async created() {
    try {
      console.log("path here :",this.$route.path)
      
      // Запрос данных через store
      await this.store.getPopularMovies();
      await this.store.getTopRated('movie');
      await this.store.getUpcoming('movie');
      await this.store.getDetails(this.store.$state.headlinerId, 'movie');


      // Установка состояния загрузки в false после получения данных
      this.loading = false;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  }
});
</script>

<template>
  <cLoading v-if="loading" />
  <div v-else>
    <cHeader v-if="store.$state.details"
      type="movie" 
      :headliner="store.$state.details"  
    >

      <cRating :star-rating="Number(store.$state.headliner.vote_average?.toPrecision(2))" />
    </cHeader>

    <!-- Популярные фильмы -->
    <cPopular popular-title="Популярные фильмы" v-if="store.$state.popularMovies">
      <cCard v-for="item in store.$state.popularMovies" 
        @click="$router.push(`/movie/${item.id}/overview`)"
        :key="item.id"
        :card-rating="Number(item.vote_average?.toPrecision(2))"
        :card-image="item.poster_path"
        :card-title="item.title" />
    </cPopular>
    <div v-else>Популярные фильмы не найдены</div>

    <cPopular popular-title="Фильмы с высокой оценкой" v-if="store.$state.topRatedMovies">
      <cCard v-for="item in store.$state.topRatedMovies" 
        @click="$router.push(`/movie/${item.id}/overview`)"
        :key="item.id"
        :card-rating="Number(item.vote_average?.toPrecision(2))"
        :card-image="item.poster_path"
        :card-title="item.title" />
    </cPopular>
    <div v-else>Популярные сериалы не найдены</div>

    <cPopular popular-title="Скоро выйдут" v-if="store.$state.upcomingMovies">
      <cCard v-for="item in store.$state.upcomingMovies" 
        @click="$router.push(`/movie/${item.id}/overview`)"
        :key="item.id"
        :card-rating="Number(item.vote_average?.toPrecision(2))"
        :card-image="item.poster_path"
        :card-title="item.title" />
    </cPopular>
    <div v-else>Популярные сериалы не найдены</div>
  </div>
</template>
