<template>
  <div class="relative w-full h-screen overflow-hidden">

    <!-- Fondo -->
    <img
      class="absolute inset-0 w-full h-full object-cover z-0"
      :src="heroBg.src"
      alt="Fondo de la universidad"
    />
    <div class="absolute inset-0 bg-black/60 z-10" />

    <div class="relative z-20 flex items-center justify-center h-full w-full">

      <!-- Imagen izquierda (slide up) -->
      <div
        :class="[
          'absolute bottom-0 left-0 z-20 w-auto h-auto max-w-[35%] md:max-w-[40%] lg:max-w-[45%]',
          'transform transition-transform transition-opacity duration-700 ease-out',
          isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
        ]"
      >
        <img
          :src="leftImage.src"
          alt="Estudiantes de la UT Nayarit"
          class="block w-full h-auto"
        />
      </div>

      <!-- Texto central (fade/slide up) -->
      <div
        :class="[
          'w-full md:w-1/2 flex flex-col items-center text-center p-8 z-30',
          'transform transition-all duration-700 ease-out',
          isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        ]"
      >
        <h1
          class="
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            -6xl font-extrabold py-2 drop-shadow-lg 
            bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Universidad Tecnológica de Nayarit
        </h1>

        <p
          class="text-xl lg:text-2xl my-8 drop-shadow-md text-white"
        >
          Formando a los profesionales del mañana, hoy.
        </p>

        <button
          :class="[
            'bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg',
            'transition-transform transition-colors duration-300 ease-out',
            isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            'hover:bg-green-500 hover:scale-105 active:scale-95'
          ]"
        >
          Inscríbete
        </button>
      </div>

      <!-- Imagen derecha (slide up) -->
      <div
        :class="[
          'absolute bottom-0 right-0 z-20 w-auto h-auto max-w-[40%] md:max-w-[45%] lg:max-w-[50%]',
          'transform transition-transform transition-opacity duration-700 ease-out',
          isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
        ]"
      >
        <img
          :src="rightImage.src"
          alt="Estudiantes de la UT Nayarit"
          class="block w-full h-auto"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
// Usa imágenes locales pero mantiene el mismo layout y roles visuales
import heroBg from "../../assets/images/random/panoramic.jpg";
import leftImage from "../../assets/images/images(1).jpg";
import rightImage from "../../assets/images/asd.png";
import { ref, onMounted, nextTick } from 'vue';

const isReady = ref(false);

onMounted(async () => {
  await nextTick();
  isReady.value = true;
  console.log('[Hero.vue] mounted', { heroBg, leftImage, rightImage, isReady: isReady.value });
});
</script>

<style scoped>
/* Estilos adicionales si necesitas ajustes finos */
</style>