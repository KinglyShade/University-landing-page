<script setup>
import { ref } from 'vue';

defineProps({
  beca: {
    type: Object,
    required: true,
  }
});

const isHovered = ref(false);
</script>

<template>
  <div
    class="beca-container group font-sans" @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div 
      class="background-wrapper"
      :class="{ 'zoomed': isHovered }"
      :style="{ background: beca.gradiente }"
    >
      <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
    </div>

    <img
      v-if="beca.imagenFrente"
      :src="beca.imagenFrente"
      alt="Icono"
      class="beca-icon"
      :class="{ 'visible': isHovered }"
    />
    
    <div class="content-wrapper" :class="{ 'hovered': isHovered }">
      
      <h3 class="text-xl md:text-2xl font-extrabold text-white uppercase tracking-wide mb-0 drop-shadow-md leading-none">
        {{ beca.titulo }}
      </h3>

      <p 
        class="text-green-100 font-bold text-lg transition-all duration-300 origin-bottom"
        :class="{ 'opacity-0 h-0 scale-y-0 margin-0': isHovered, 'opacity-100 h-auto scale-y-100 mt-1': !isHovered }"
      >
        {{ beca.monto }}
      </p>

      <div class="details-container">
        
        <div v-if="beca.detalles" class="w-full mb-2 pt-2">
          <div class="bg-white/20 backdrop-blur-md rounded-lg p-2 border border-white/20 shadow-sm">
            <p class="text-[10px] text-white mb-1 text-center font-bold uppercase tracking-wider">
              Tabulador Ene-Abr 2026
            </p>
            <ul class="space-y-1 w-full">
              <li v-for="(item, index) in beca.detalles" :key="index" class="flex justify-between text-[10px] md:text-xs border-b border-white/20 pb-0.5 last:border-0 items-center">
                <span class="text-gray-100 font-semibold">{{ item.label }}</span>
                <span class="text-white font-extrabold whitespace-nowrap">{{ item.value }} OFF</span>
              </li>
            </ul>
          </div>
        </div>

        <div v-else class="w-full mb-2 pt-2">
          <p class="text-white text-sm leading-snug mb-2 drop-shadow-md font-medium">{{ beca.resumen }}</p>
          <div class="flex items-center gap-2 justify-end md:justify-start desktop-alignment">
             <span class="text-green-100 text-xs uppercase font-bold">Monto:</span>
             <p class="text-white font-bold text-lg">{{ beca.monto }}</p>
          </div>
        </div>
        
        <a 
          :href="beca.pdfURL" 
          target="_blank"
          class="
            w-full h-10 min-h-[40px] flex-shrink-0 flex justify-center items-center 
            text-white text-xs uppercase font-bold px-4 rounded-lg 
            shadow-md transition-colors mt-auto border border-white/10 whitespace-nowrap
            
            bg-brand-green hover:bg-brand-green-light
          "
          @click.stop 
        >
          <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          <span>Descargar Reglamento</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estos estilos están bien porque manejan lógica de animación compleja 
que es más fácil de mantener aquí que en clases de Tailwind. */

.beca-container {
  position: relative;
  height: 380px; 
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(100, 116, 139, 0.2), 0 4px 6px -2px rgba(100, 116, 139, 0.1);
  background-color: #f8fafc; 
}

.background-wrapper {
  position: absolute; inset: 0;
  transition: transform 0.7s ease;
  z-index: 0;
}
.background-wrapper.zoomed { transform: scale(1.2); }

.beca-icon {
  position: absolute;
  bottom: 10px; left: 10px;   
  width: 140px; height: auto;
  opacity: 0; 
  transform: rotate(-15deg) translateX(-40px); 
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 5; 
  pointer-events: none;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
}

.beca-icon.visible {
  opacity: 1;
  transform: rotate(0deg) translateX(0px) translateY(-10px);
}

.content-wrapper {
  position: relative; z-index: 10;
  height: 100%;
  display: flex; flex-direction: column;
  justify-content: flex-end;
  padding: 1.25rem; 
  transition: all 0.5s ease;
}

.details-container {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.5s ease;
  width: 100%; 
  display: flex;
  flex-direction: column;
}

/* ESTADOS DE HOVER */
.content-wrapper.hovered {
  transform: translateY(-20px); 
}

.content-wrapper.hovered .details-container {
  max-height: 360px; 
  opacity: 1;
}

/* DESKTOP */
@media (min-width: 768px) {
  .content-wrapper.hovered {
    padding-left: 160px; 
    align-items: flex-end; 
    text-align: right;
  }
  
  .content-wrapper.hovered .details-container {
    align-self: flex-end;
    width: 100%;
    align-items: flex-end;
  }

  .content-wrapper.hovered .desktop-alignment {
    justify-content: flex-end;
  }

  .content-wrapper.hovered .details-container .bg-white\/20 {
    width: 100%; 
    text-align: left; 
  }
}
</style>