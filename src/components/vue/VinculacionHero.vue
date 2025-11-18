<template>
  <section class="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
    <!-- Fondo con imágenes (puedes usar un carousel o múltiples capas para animación) -->
    <div class="absolute inset-0 z-0">
      <!-- Ejemplo de imagen de fondo; cambia por tus imágenes reales -->
      <img src="https://lh5.googleusercontent.com/proxy/rINnmNMcCjLaP3by5tMSfzcjYcfKn-OAre-7gJpLGI3zRXhf_hRv0nY8HERvs4xLkstOQowXhWibTx4zER0gcj2WDAs9HZHP7UfB5D7_ezynwy7B85WuVQ" alt="Fondo Vinculación" class="w-full h-full object-cover opacity-70" />
      <!-- Si quieres múltiples imágenes, usa un slider o overlays -->
      <!-- <img src="/path/to/background-image2.jpg" alt="Overlay" class="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay" /> -->
    </div>

    <!-- Overlay oscuro para mejor legibilidad -->
    <div class="absolute inset-0 bg-black/50 z-10"></div>

    <!-- Contenido del hero con animación swipe up o fade in -->
    <transition name="swipe-up">
      <div v-if="isVisible" class="relative z-20 container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <!-- Título izquierdo -->
        <div class="md:w-1/2 text-left mb-8 md:mb-0">
          <h1 class="text-5xl md:text-7xl font-bold text-white leading-tight">
            Vinculación
          </h1>
        </div>

        <!-- Texto introductorio derecho -->
        <div class="md:w-1/2 text-right">
          <p class="text-xl md:text-2xl text-green-200 leading-relaxed">
            Conectamos el talento de nuestros estudiantes con el mundo empresarial para fomentar el crecimiento mutuo y oportunidades innovadoras.
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
  // Activa la visibilidad al montar para triggering la animación
  isVisible.value = true;
});
</script>

<style scoped>
/* Animación swipe up: entra desde abajo con fade */
.swipe-up-enter-active {
  transition: all 1s ease-out;
}

.swipe-up-enter-from {
  opacity: 0;
  transform: translateY(100px); /* Swipe up desde abajo */
}

.swipe-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Alternativa: Solo fade in (comenta la anterior y descomenta esta si prefieres) */

.fade-enter-active {
  transition: opacity 1s ease;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

</style>