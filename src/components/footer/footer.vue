<script lang="ts">

export default{
  name: "c-footer",
}

</script>
<template>
  <div class="h-[250px] flex flex-col justify-center">
    <div class="pl-12 flex flex-col gap-6">
      <div class="flex items-center gap-3">
        <img src="/assets/vue.png" class="max-w-12" alt="">
        <div class="text-2xl">Vue Movies</div>
      </div>
      <div class="flex items-center gap-3"> 
        <div class="text-neutral-400">
          Data provided by 
        </div>
        <a href="https://www.themoviedb.org/" class="max-w-28">
          <img src="/assets/tmdb.svg" class="w-full" alt=""> 
        </a>
      </div>
      <div class="text-neutral-400">This project uses the TMDB API but is not endorsed or certified by TMDB.</div>
      <div class="flex gap-2">
        <a href="https://github.com/baudinovv/movies" class="transition w-8 text-neutral-400 hover:text-white">
          <svg class="w-full" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
          	<path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
          </svg>
        </a>
        <a href="https://t.me/baudinovv" class="transition w-8 text-neutral-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          	<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19c-.14.75-.42 1-.68 1.03c-.58.05-1.02-.38-1.58-.75c-.88-.58-1.38-.94-2.23-1.5c-.99-.65-.35-1.01.22-1.59c.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02c-.09.02-1.49.95-4.22 2.79c-.4.27-.76.41-1.08.4c-.36-.01-1.04-.2-1.55-.37c-.63-.2-1.12-.31-1.08-.66c.02-.18.27-.36.74-.55c2.92-1.27 4.86-2.11 5.83-2.51c2.78-1.16 3.35-1.36 3.73-1.36c.08 0 .27.02.39.12c.1.08.13.19.14.27c-.01.06.01.24 0 .38" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>
