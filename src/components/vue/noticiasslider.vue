<template>
  <div class="relative group w-full h-[70vh] md:h-[80vh] bg-white not">
    <swiper
      :modules="modules"
      :loop="true"
      :speed="1000"
      :slides-per-view="1"
      :space-between="0"
      :autoplay="autoplayConfig"
      :navigation="navigationConfig"
      class="w-full h-full"
    >
      <swiper-slide v-for="noticia in noticiasRef" :key="noticia.titulo">
        <div class="flex w-full h-full items-center overflow-hidden">
          
          <div class="w-1/2 h-full image-clipped-container">
            <img :src="noticia.imagen" :alt="noticia.titulo" class="w-full h-full object-cover brightness-100">
          </div>
          
          <div class="w-1/2 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
            <h2 class="text-3xl md:text-5xl font-bold text-gray-900 leading-tight slide-title">
              {{ noticia.titulo }}
            </h2>
            <p class="mt-4 text-lg text-gray-700 slide-text">
              {{ noticia.resumen }}
            </p>
          </div>

        </div>
      </swiper-slide>
    </swiper>

    <button class="prev-button absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-20 p-2 bg-white/70 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/90 focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="gray-900" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
    <button class="next-button absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-20 p-2 bg-white/70 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/90 focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="gray-900" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { noticias } from '../../data/noticias.js';

const modules = [Autoplay, Navigation];
const noticiasRef = ref(noticias);

// FIX: Configuration moved here and cast as 'any' to satisfy TypeScript
const autoplayConfig = {
  delay: 8000,
  disableOnInteraction: false,
} as any;

const navigationConfig = {
  prevEl: '.prev-button',
  nextEl: '.next-button',
} as any;
</script>

<style scoped>
.image-clipped-container {
  clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
}

@keyframes slideInLeft {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.image-clipped-container, .slide-title, .slide-text, .slide-link {
  opacity: 0;
  transform: translateX(0);
}

.swiper-slide-active .image-clipped-container {
  opacity: 1;
  animation: slideInLeft 1s ease-out forwards;
}
.swiper-slide-active .slide-title {
  opacity: 1;
  animation: fadeInUp 0.7s ease-out 0.5s forwards;
}
.swiper-slide-active .slide-text {
  opacity: 1;
  animation: fadeInUp 0.7s ease-out 0.7s forwards;
}
.swiper-slide-active .slide-link {
  opacity: 1;
  animation: fadeInUp 0.7s ease-out 0.9s forwards;
}
</style>