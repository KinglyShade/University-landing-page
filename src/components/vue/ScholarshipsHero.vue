<template>
  <section class="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
    <!-- Fondo con imagen; reemplaza la URL por una imagen relacionada con becas si lo deseas -->
    <div class="absolute inset-0 z-0">
      <img src="https://lh5.googleusercontent.com/proxy/rINnmNMcCjLaP3by5tMSfzcjYcfKn-OAre-7gJpLGI3zRXhf_hRv0nY8HERvs4xLkstOQowXhWibTx4zER0gcj2WDAs9HZHP7UfB5D7_ezynwy7B85WuVQ" alt="Fondo Becas" class="w-full h-full object-cover opacity-70" />
    </div>

    <!-- Overlay oscuro para mejor legibilidad -->
    <div class="absolute inset-0 bg-black/50 z-10"></div>

    <!-- Contenido del hero con animación -->
    <transition name="swipe-up">
      <div v-if="isVisible" class="relative z-20 container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <!-- Título izquierdo -->
        <div class="md:w-1/2 text-left mb-8 md:mb-0">
          <h1 class="text-5xl md:text-7xl font-bold text-white leading-tight">
            Becas Institucionales
          </h1>
        </div>

        <!-- Texto introductorio derecho -->
        <div class="md:w-1/2 text-right">
          <p class="text-xl md:text-2xl text-green-200 leading-relaxed">
            Reconocemos tu esfuerzo académico y talento deportivo. Consulta las convocatorias vigentes para el periodo 
            <span class="font-bold text-gray-200">Enero-Abril 2026</span>.
          </p>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
});
</script>

<style scoped>
.swipe-up-enter-active {
  transition: all 1s ease-out;
}

.swipe-up-enter-from {
  opacity: 0;
  transform: translateY(100px);
}

.swipe-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>