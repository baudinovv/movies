<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStoreDetails } from '../../store/details';
import DetailsModal from '../../components/details/detailsModal.vue';

const store = useStoreDetails();
const route = useRoute();

const imageIndex = ref(0);
const showModal = ref(false);
const IMAGE_BASE = 'https://movies-proxy.vercel.app/ipx/f_webp/tmdb';

const nextImage = () => {
  if (imageIndex.value < store.images.backdrops.length - 1) imageIndex.value++;
};
const prevImage = () => {
  if (imageIndex.value > 0) imageIndex.value--;
};

onMounted(async () => {
  const id = Number(route.params.id);
  if (!store.images.id || store.images.id !== id) {
    await store.getImages(id, 'tv');
  }
});
</script>

<template>
  <div class="px-4 sm:px-8 lg:px-12">
    <div class="text-xl text-neutral-500">{{ store.images.backdrops?.length }} изображений</div>
    <div class="pt-3">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(item, idx) in store.images.backdrops"
          :key="idx"
          class="cursor-pointer"
          @click="showModal = true; imageIndex = idx"
        >
          <div
            :style="`background-image: url('https://movies-proxy.vercel.app/ipx/f_webp&s_400x600/tmdb${item.file_path}'); background-size: cover; background-position: center;`"
            class="transition h-[56vw] sm:h-[28vw] lg:h-[15vw] border-4 border-neutral-800 hover:scale-105 overflow-hidden"
          />
        </div>
      </div>
    </div>
  </div>

  <DetailsModal :show-modal="showModal" @modal-off="showModal = false">
    <img
      v-if="store.images.backdrops?.length"
      v-focus
      tabindex="0"
      class="z-50 max-w-full max-h-[90%] m-auto focus:outline-none"
      :src="IMAGE_BASE + store.images.backdrops[imageIndex].file_path"
      alt=""
      @keyup.left="prevImage"
      @keyup.right="nextImage"
    />
    <div class="fixed bottom-5 left-20 z-50">
      <span class="font-bold">{{ imageIndex + 1 }}</span> / {{ store.images.backdrops?.length }}
    </div>
  </DetailsModal>
</template>
