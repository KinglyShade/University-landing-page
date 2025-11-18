<template>
  <div ref="scroller" class="scroller" data-animated="true">
    <ul ref="track" class="scroller__track">
      <li v-for="logo in logos" :key="logo.alt">
        <img :src="logo.src" :alt="logo.alt" />
      </li>

      <!-- Duplicado para loop continuo -->
      <li
        v-for="logo in logos"
        :key="`${logo.alt}-duplicate`"
        aria-hidden="true"
      >
        <img :src="logo.src" :alt="logo.alt" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

const props = defineProps({
  logos: { type: Array, required: true }
});

const scroller = ref(null);
const track = ref(null);
let resizeObserver;

function waitForImagesToLoad() {
  if (!track.value) return Promise.resolve();
  const imgs = Array.from(track.value.querySelectorAll('img'));
  if (!imgs.length) return Promise.resolve();
  return Promise.all(
    imgs.map(img => new Promise(res => {
      if (img.complete) return res();
      img.addEventListener('load', res, { once: true });
      img.addEventListener('error', res, { once: true });
    }))
  );
}

function hideBrokenImages() {
  if (!track.value) return;
  const imgs = Array.from(track.value.querySelectorAll('img'));
  imgs.forEach(img => {
    // si la imagen no tiene tamaño natural (0x0) la ocultamos antes de medir
    if (!img.naturalWidth || img.naturalWidth === 0) {
      img.style.display = 'none';
      // opcional: log para que lo veas en consola
      console.warn('[InfSlider] ocultando imagen rota:', img.src);
    }
  });
}

function calculateAnimation() {
  if (!track.value || !scroller.value) return;

  // ocultar imágenes rotas antes de medir
  hideBrokenImages();

  // medir ancho total del track (incluye duplicados)
  const totalWidth = track.value.scrollWidth;
  if (!totalWidth) {
    console.warn('[InfSlider] totalWidth is 0 — no se aplica animación aún');
    return;
  }

  const half = Math.floor(totalWidth / 2);
  const pxPerSecond = 120;
  const durationSeconds = Math.max(6, Math.round(half / pxPerSecond));

  // aplicar la variable y forzar la animación inline con prioridad !important
  track.value.style.setProperty('--scroll-distance', `${half}px`);
  track.value.style.setProperty('animation', `scroll ${durationSeconds}s linear infinite`, 'important');


  console.log('[InfSlider] totalWidth', totalWidth, 'half', half, 'duration', `${durationSeconds}s`);
}

async function recalcSafe() {
  await nextTick();
  await waitForImagesToLoad();
  calculateAnimation();
}

onMounted(async () => {
  await recalcSafe();
  window.addEventListener('resize', recalcSafe);
  if ('ResizeObserver' in window && track.value) {
    resizeObserver = new ResizeObserver(recalcSafe);
    resizeObserver.observe(track.value);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', recalcSafe);
  if (resizeObserver && track.value) resizeObserver.unobserve(track.value);
});
</script>

<style>
/* NOTE: sin scoped para asegurar que @keyframes 'scroll' esté disponible globalmente */

/* Contenedor que recorta el contenido */
.scroller {
  width: 100%;
  overflow: hidden;
  mask: linear-gradient(to right, transparent 0, black 20px, black 98%, transparent 100%);
  -webkit-mask: linear-gradient(to right, transparent 0, black 20px, black 98%, transparent 100%);
}

/* La cinta */
.scroller__track {
  display: flex;
  width: max-content;
  list-style: none;
  padding: 0;
  margin: 0;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
}

/* Pausa al hover */
.scroller:hover .scroller__track { animation-play-state: paused; }

/* Aseguramos que el LI no pinte fondo ni sombra */
.scroller__track li {
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent !important;
  box-shadow: none !important;
}

/* Hover / focus: color original y ligero zoom */
.scroller__track li:hover img,
.scroller__track li:focus-within img,
.scroller__track img:focus,
.scroller__track img:active {
  -webkit-filter: grayscale(0) brightness(1) contrast(1);
  filter: grayscale(0) brightness(1) contrast(1);
  opacity: 1;
  transform: scale(1.04);
}

/* foco visible */
.scroller__track li:focus-within {
  outline: 3px solid rgba(66,153,225,0.12);
  outline-offset: 6px;
}

/* Imagen: gris por defecto, forzar transparencia y evitar artefactos */
.scroller__track img {
  height: 100px;
  width: auto;
  max-width: none;
  display: block;

  /* Estado por defecto: gris y un poco más oscuro */
  -webkit-filter: grayscale(1) brightness(0.92) contrast(0.95);
  filter: grayscale(1) brightness(0.92) contrast(0.95);

  /* Forzar transparencia / quitar sombras/bordes de contenedor */
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
  mix-blend-mode: normal;
  image-rendering: -webkit-optimize-contrast;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  opacity: 0.85;

  /* Transición suave sobre filter/opacity/transform */
  transition: filter 280ms cubic-bezier(.2,.9,.2,1),
              opacity 200ms ease,
              transform 280ms cubic-bezier(.2,.9,.2,1);

  will-change: filter, opacity, transform;
}

/* Asegurar que pseudo-elementos no estén pintando fondos */
.scroller__track li::before,
.scroller__track li::after {
  background: transparent !important;
  box-shadow: none !important;
  content: none !important;
}

/* Keyframes globales */
@keyframes scroll {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-1 * var(--scroll-distance, 50%))); }
}

@media (prefers-reduced-motion: reduce) {
  .scroller__track img {
    transition: filter 120ms linear, opacity 120ms linear;
  }
  .scroller__track li:hover img,
  .scroller__track li:focus-within img,
  .scroller__track img:focus,
  .scroller__track img:active {
    transform: none;
  }
}
</style>