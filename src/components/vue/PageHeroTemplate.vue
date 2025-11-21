<template>
  <section class="relative h-full flex items-center justify-center overflow-hidden bg-gray-900">
    <div class="absolute inset-0 z-0">
      <template v-if="imageSrc">
        <img :src="imageSrc" alt="" class="w-full h-full object-cover" />
      </template>
      <template v-else>
        <div :class="['w-full h-full', gradientClass || 'bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900']"></div>
      </template>
    </div>
    <div class="absolute inset-0 bg-black/55 z-10"></div>
    <transition name="swipe-up">
      <div
        v-if="isVisible"
        class="relative z-20 container mx-auto px-6 flex flex-col items-center justify-center text-center"
      >
        <p v-if="eyebrow" class="uppercase tracking-[0.2em] text-emerald-200 text-xs md:text-sm mb-3">
          {{ eyebrow }}
        </p>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-white">
          {{ title }}
        </h1>
        <p v-if="subtitle" class="text-sm md:text-base text-emerald-50/90 max-w-2xl mx-auto">
          {{ subtitle }}
        </p>
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  title: string;
  subtitle?: string;
  eyebrow?: string;
  imageSrc?: string;
  gradientClass?: string;
}>();

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
