<template>
  <div 
    class="relative w-full h-[60vh] flex items-center justify-center bg-cover bg-center overflow-hidden group"
    :style="{ backgroundImage: `url(${imageUrl})` }"
  >
    <div class="absolute inset-0 bg-black/70 transition-colors duration-500 group-hover:bg-black/50"></div>

    <div class="relative z-10 text-center text-white p-4">
      <h3 
        class="text-4xl md:text-6xl font-extrabold uppercase tracking-widest transform transition-transform duration-500 group-hover:scale-110"
        style="text-shadow: 2px 2px 8px rgba(0,0,0,0.7);"
      >
        {{ title }}
      </h3>
    </div>
  </div>
</template>
<!-- si está raro se lo pedí a gemini pq no se vue -->
<script setup>
defineProps({
  title: String,
  imageUrl: String
});
</script>