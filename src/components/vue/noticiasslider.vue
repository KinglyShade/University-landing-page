<template>
  <div class="relative group w-full h-[70vh] md:h-[80vh] bg-white">
    <swiper
      :modules="modules"
      :loop="true"
      :speed="1000"
      :slides-per-view="1"
      :space-between="0"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: false,
      }"
      :navigation="{
        prevEl: '.prev-button',
        nextEl: '.next-button',
      }"
      class="w-full h-full"
    >
      <swiper-slide v-for="noticia in noticias" :key="noticia.titulo">
        <div class="flex w-full h-full items-center overflow-hidden">
          
          <div class="w-1/2 h-full image-clipped-container">
            <img :src="noticia.imagen" :alt="noticia.titulo" class="w-full h-full object-cover">
          </div>
          
          <div class="w-1/2 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
            <h2 class="text-3xl md:text-5xl font-bold text-gray-800 leading-tight slide-title">
              {{ noticia.titulo }}
            </h2>
            <p class="mt-4 text-lg text-gray-600 slide-text">
              {{ noticia.resumen }}
            </p>
            
          </div>

        </div>
      </swiper-slide>
    </swiper>

    <button class="prev-button absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-20 p-2 bg-white/50 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/80 focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6 text-gray-800">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
    <button class="next-button absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-20 p-2 bg-white/50 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/80 focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6 text-gray-800">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper/modules'; // Ya no necesitamos Pagination ni EffectFade
import 'swiper/css';
import 'swiper/css/navigation';

const modules = [Autoplay, Navigation];

const noticias = ref([
  {
    imagen: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920",
    titulo: "Conectando Talento con el Futuro",
    resumen: "Nuestra feria de vinculación anual rompe récords de asistencia, creando cientos de oportunidades para estudiantes.",
    url: "#"
  },
  {
    imagen: "https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920",
    titulo: "Innovación y Sostenibilidad en el Campus",
    resumen: "Presentamos nuestro nuevo programa de energías renovables, liderando la educación para un futuro más verde.",
    url: "#"
  },
  {
    imagen: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920",
    titulo: "Alianza Estratégica para el Desarrollo",
    resumen: "Firmamos un convenio clave con líderes de la industria para impulsar la investigación y el desarrollo tecnológico.",
    url: "#"
  }
]);
</script>

<style scoped>
/* --- 2. Aquí está la magia del corte y las animaciones --- */

/* Esta es la regla clave que crea el corte de trapecio */
.image-clipped-container {
  clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
}

/* --- Definición de las nuevas animaciones --- */
@keyframes slideInLeft {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Ocultamos los elementos por defecto para prepararlos para la animación */
.image-clipped-container, .slide-title, .slide-text, .slide-link {
  opacity: 0;
  transform: translateX(0); /* Reset transform */
}

/* --- Activación de las animaciones en el slide activo --- */

.swiper-slide-active .image-clipped-container {
  opacity: 1;
  animation: slideInLeft 1s ease-out forwards;
}
.swiper-slide-active .slide-title {
  opacity: 1;
  animation: fadeInUp 0.7s ease-out 0.5s forwards; /* Inicia después de la imagen */
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