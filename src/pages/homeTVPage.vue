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
      await this.store.getTV();
      await this.store.getOnAir();
      await this.store.getTopRated('tv');
      await this.store.getDetails(this.store.$state.headlinerId, 'tv');


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
      type="tv" 
      :headliner="store.$state.details"  
    >

      <cRating :star-rating="Number(store.$state.headliner.vote_average?.toPrecision(2))" />
    </cHeader>

    <cPopular popular-title="Популярные сериалы" v-if="store.$state.popularTV">
      <cCard v-for="item in store.$state.popularTV" 
        @click="$router.push(`/tv/${item.id}/overview`)"
        :key="item.id"
        :card-rating="Number(item.vote_average?.toPrecision(2))"
        :card-image="item.poster_path"
        :card-title="item.name" />
    </cPopular>
    <div v-else>Популярные сериалы не найдены</div>

    <cPopular popular-title="С высокой оценкой" v-if="store.$state.topRatedTV">
      <cCard v-for="item in store.$state.topRatedTV" 
        @click="$router.push(`/tv/${item.id}/overview`)"
        :key="item.id"
        :card-rating="Number(item.vote_average?.toPrecision(2))"
        :card-image="item.poster_path"
        :card-title="item.name" />
    </cPopular>
    <div v-else>Популярные сериалы не найдены</div>
    
    <cPopular popular-title="Транслируется сейчас" v-if="store.$state.onAirTV">
      <cCard v-for="item in store.$state.onAirTV" 
        @click="$router.push(`/tv/${item.id}/overview`)"
        :key="item.id"
        :card-rating="Number(item.vote_average?.toPrecision(2))"
        :card-image="item.poster_path"
        :card-title="item.name" />
    </cPopular>
    <div v-else>Популярные сериалы не найдены</div>

  </div>
</template>
