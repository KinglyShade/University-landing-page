<template>
  <div class="relative w-full h-screen overflow-hidden">

    <!-- Fondo -->
    <img
      class="absolute inset-0 w-full h-full object-cover z-0"
      src="https://media.discordapp.net/attachments/1380072456802275339/1424958199219359785/FB_IMG_1759806770775.jpg?ex=68e5d73d&is=68e485bd&hm=0a3ac8c1b463c5f690c35963fd78a4d579fd7f0ed988f435b251548c497733f5&=&format=webp&width=1192&height=795"
      alt="Fondo de la universidad"
      @error="onImgError"
    />
    <div class="absolute inset-0 bg-black/60 z-10" />

    <div class="relative z-20 flex items-center justify-center h-full w-full">

      <!-- Imagen izquierda (slide up) -->
      <div
        class="absolute bottom-0 left-0 z-20 w-auto h-auto max-w-[35%] md:max-w-[40%] lg:max-w-[45%]"
        v-motion
        :initial="{ y: '100%' }"
        :enter="{ y: '0%', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }"
        :hovered="{ scale: 1.03, transition: { duration: 0.3 } }"
      >
        <img
          src="https://media.discordapp.net/attachments/1409425672597799002/1424912416747163758/IMG_20251006_123401-removebg-preview.png?ex=68e5ac99&is=68e45b19&hm=4034eff5c9dcadf5280a9b3e042f4620f58da7f9f03e005880066b3a3dd4915f&=&format=webp&quality=lossless"
          alt="Estudiantes de la UT Nayarit"
          class="block w-full h-auto"
          @error="onImgError"
        />
      </div>

      <!-- Texto central (stagger) -->
      <div
        class="w-full md:w-1/2 flex flex-col items-center text-center p-8 z-30"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { stagger: 0.3 } }"
      >
        <h1
          class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold py-2 drop-shadow-lg bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
          v-motion
          :initial="{ opacity: 0, scale: 0.95 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } }"
        >
          Universidad Tecnológica de Nayarit
        </h1>

        <p
          class="text-xl lg:text-2xl my-8 drop-shadow-md text-white"
          v-motion
          :initial="{ y: 20, opacity: 0 }"
          :enter="{ y: 0, opacity: 1, transition: { ease: 'easeOut', duration: 0.5 } }"
        >
          Formando a los profesionales del mañana, hoy.
        </p>

        <button
          class="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-500 transition-colors"
          v-motion
          :initial="{ y: 20, opacity: 0 }"
          :enter="{ y: 0, opacity: 1, transition: { ease: 'easeOut', duration: 0.5 } }"
          :hovered="{ scale: 1.05 }"
          :tapped="{ scale: 0.95 }"
        >
          Inscríbete
        </button>
      </div>

      <!-- Imagen derecha (slide up) -->
      <div
        class="absolute bottom-0 right-0 z-20 w-auto h-auto max-w-[40%] md:max-w-[45%] lg:max-w-[50%]"
        v-motion
        :initial="{ y: '100%' }"
        :enter="{ y: '0%', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }"
        :hovered="{ scale: 1.03, transition: { duration: 0.3 } }"
      >
        <img
          src="https://media.discordapp.net/attachments/1409425672597799002/1424912417179041883/IMG-20251001-WA0020-removebg-preview.png?ex=68e5ac99&is=68e45b19&hm=c3c653547b73814de569a50e67b382ba823baf3328734b692ff10e937df64673&=&format=webp&quality=lossless"
          alt="Estudiantes de la UT Nayarit"
          class="block w-full h-auto"
          @error="onImgError"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
// El plugin @vueuse/motion se registra desde src/plugins/v-motion.js (configurado en astro.config.mjs)
// Manejador para imágenes que fallan por CORS/opaque responses: reemplaza por placeholder local
function onImgError(e) {
  try {
    e.target.src = '/assets/placeholder.svg';
    e.target.onerror = null;
  } catch (err) {
    // ignore
  }
}
</script>

<style scoped>
/* Estilos adicionales si necesitas ajustes finos */
</style>
