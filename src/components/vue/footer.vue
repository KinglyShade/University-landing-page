<template>
  <footer
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } }"
    class="bg-gray-900/80 backdrop-blur-md text-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-t-3xl shadow-inner"
  >
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <!-- Branding -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 0.6 } }"
          class="col-span-2 md:col-span-4 lg:col-span-1"
        >
          <h2 class="text-2xl font-extrabold mb-2 tracking-wide">Universidad Tecnológica</h2>
          <p class="text-gray-300 text-sm">Formando líderes para un futuro innovador.</p>
        </div>

        <!-- Navegación -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.05 } }"
        >
          <h3 class="font-bold mb-4 uppercase tracking-wider">Navegación</h3>
          <ul class="space-y-2 text-gray-400">
            <li>
              <a href="#" class="hover:text-white transition-colors hover:underline">Inicio</a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition-colors hover:underline">Carreras</a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition-colors hover:underline">Admisiones</a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition-colors hover:underline">Contacto</a>
            </li>
          </ul>
        </div>

        <!-- Recursos -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }"
        >
          <h3 class="font-bold mb-4 uppercase tracking-wider">Recursos</h3>
          <ul class="space-y-2 text-gray-400">
            <li>
              <a href="#" class="hover:text-white transition-colors hover:underline">Blog</a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition-colors hover:underline">Noticias</a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition-colors hover:underline">Eventos</a>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.15 } }"
        >
          <h3 class="font-bold mb-4 uppercase tracking-wider">Legal</h3>
          <ul class="space-y-2 text-gray-400">
            <li>
              <a href="#" class="hover:text-white transition-colors hover:underline">Aviso de Privacidad</a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition-colors hover:underline">Términos de Uso</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }"
        class="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center"
      >
        <p class="text-gray-400 text-sm mb-4 sm:mb-0">
          © {{ new Date().getFullYear() }} Equipo Si. Todos los derechos reservados.
        </p>
        <div class="flex space-x-5">
          <a
            href="#"
            class="text-gray-400 hover:text-white transition-all transform hover:scale-110 hover:-translate-y-1 text-2xl"
          >
            <Icon icon="fa-brands:facebook" />
          </a>
          <a
            href="#"
            class="text-gray-400 hover:text-white transition-all transform hover:scale-110 hover:-translate-y-1 text-2xl"
          >
            <Icon icon="fa-brands:twitter" />
          </a>
          <a
            href="#"
            class="text-gray-400 hover:text-white transition-all transform hover:scale-110 hover:-translate-y-1 text-2xl"
          >
            <Icon icon="fa-brands:instagram" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Icon } from '@iconify/vue';
</script>

<style scoped>
footer {
  /* Animación de fondo sutil */
  background-color: rgba(6, 16, 8, 0.9) 0%;
}

a {
  position: relative;
}

a::after {
  content: '';
  position: absolute;
  width: 0%;
  height: 1px;
  bottom: -2px;
  left: 0;
  background-color: #ffffff;
  transition: width 0.3s ease;
}

a:hover::after {
  width: 100%;
}
</style>
