<script setup>
import { ref } from 'vue';

// Declara las props que el componente espera recibir desde Astro
defineProps({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '', // Un valor por defecto por si no se proporciona
  },
});

// Variable reactiva para controlar el estado del hover
const isHovered = ref(false);
</script>

<template>
  <div
    class="career-container"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <img
      :src="imageUrl"
      alt="Imagen de la carrera"
      :class="{ 'visible': isHovered }"
      class="career-image"
    />
    
    <div 
      class="text-content"
      :class="{ 'hovered': isHovered }"
    >
      <h3 class="career-title">{{ title }}</h3>
      <p class="career-description">{{ description }}</p>
    </div>
  </div>
</template>

<style>
/* Estilo del contenedor principal */
.career-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px; /* Un poco más de altura para móviles */
  background-color: #f0f4f8;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.3s ease;
}

.career-container:hover {
  background-color: #e2e8f0;
}

/* Estilo de la imagen de fondo */
.career-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: auto;
  opacity: 0;
  transform: translateX(-20px);
  transition: opacity 0.4s ease, transform 0.4s ease;
  z-index: 1;
}

.career-image.visible {
  opacity: 0.15; /* Más sutil para que no opaque el texto */
  transform: translateX(0);
}

/* --- ESTILOS RESPONSIVOS --- */

/* Base (Mobile First) */
.text-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 1rem; /* Menos padding en móvil */
  transition: transform 0.4s ease;
}

.career-title {
  font-size: 1.5rem; /* Título más pequeño para móvil */
  font-weight: 700;
  color: #1a202c;
  transition: all 0.4s ease;
}

.career-description {
  font-size: 0.9rem;
  color: #4a5568;
  opacity: 0;
  max-height: 0; /* Ocultamos la descripción para la animación */
  overflow: hidden;
  transition: opacity 0.4s ease, max-height 0.4s ease;
}

/* Animación de Hover para MÓVIL (efecto de deslizamiento vertical) */
.text-content.hovered {
  transform: translateY(-10%); /* Sube un poco el bloque de texto */
}

.text-content.hovered .career-title {
  color: #2c5282;
  transform: translateY(-10px); /* Sube un poco el título */
}

.text-content.hovered .career-description {
  opacity: 1;
  max-height: 100px; /* Revela la descripción */
}

/* Estilos para Tablet y Escritorio (a partir de 768px) */
@media (min-width: 768px) {
  .career-container {
    height: 150px; /* Volvemos a la altura original */
  }

  .text-content {
    padding: 0 2rem;
    transition: transform 0.4s ease, text-align 0.4s ease;
  }

  /* Animación de Hover para ESCRITORIO (efecto de deslizamiento horizontal) */
  .text-content.hovered {
    /* Restauramos la animación original para pantallas grandes */
    transform: translate(80%);
    text-align: right;
  }

  .career-title {
    font-size: 2rem; /* Título más grande */
  }

  .text-content.hovered .career-title {
    font-size: 1.75rem;
    transform: translateY(0); /* Reseteamos la transformación móvil */
    color: #1a202c; /* Color original */
  }
  
  .career-description {
    max-width: 250px;
    max-height: none; /* Quitamos la restricción de altura */
    transition: opacity 0.4s ease 0.1s;
  }
}
</style>
