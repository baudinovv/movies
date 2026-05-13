<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStoreDetails } from '../../store/details';
import DetailsModal from '../../components/details/detailsModal.vue';

const store = useStoreDetails();
const route = useRoute();

const showModal = ref(false);
const videoKey = ref('');

onMounted(() => {
  const id = Number(route.params.id);
  if (!store.videos.id || store.videos.id !== id) {
    store.getVideos(id, 'movie');
  }
});
</script>

<template>
  <div class="px-4 sm:px-8 lg:px-12">
    <div class="text-xl text-neutral-500">{{ store.videos.results?.length }} видео</div>
    <div class="pt-3">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="item in store.videos.results"
          :key="item.key"
          class="cursor-pointer"
          @click="showModal = true; videoKey = item.key"
        >
          <div
            :style="`background-image: url('https://movies-proxy.vercel.app/ipx/f_webp&s_400x600/youtube/vi/${item.key}/maxresdefault.jpg'); background-size: cover; background-position: center;`"
            class="transition h-[56vw] sm:h-[28vw] lg:h-[15vw] border-4 border-neutral-800 hover:scale-105 overflow-hidden flex items-center justify-center"
          >
            <svg class="text-white w-12 hover:text-[#2cff8b] transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="currentColor" d="M18.4 12.5L9 18.38L8 19V6zm-1.9 0L9 7.8v9.4z" />
            </svg>
          </div>
          <div class="mt-3 text-lg">{{ item.name }}</div>
          <div class="mt-1 text-neutral-500 text-sm">{{ item.type }}</div>
        </div>
      </div>
    </div>
  </div>

  <DetailsModal :show-modal="showModal" @modal-off="showModal = false">
    <div class="w-[90vw] h-[80vh] m-auto relative z-50">
      <iframe
        class="w-full h-full"
        allow="autoplay; encrypted-media"
        allowfullscreen
        :src="`https://www.youtube.com/embed/${videoKey}?rel=0&showinfo=0&autoplay=0`"
        style="border: none"
      />
    </div>
  </DetailsModal>
</template>
