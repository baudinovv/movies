<script setup lang="ts">
defineProps<{ showModal: boolean }>();
defineEmits<{ (e: 'modal-off'): void }>();
</script>

<template>
  <Teleport to="body">
    <div v-if="showModal" class="fixed inset-0 z-40 flex items-center justify-center">
      <div class="absolute inset-0 bg-black opacity-85" @click="$emit('modal-off')" />
      <button
        class="absolute top-4 right-6 z-50 text-white text-3xl leading-none hover:text-[#2cff8b] transition"
        @click="$emit('modal-off')"
      >
        ✕
      </button>
      <slot />
    </div>
  </Teleport>
</template>
