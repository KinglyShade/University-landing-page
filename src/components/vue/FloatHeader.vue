/*
maldito insecto ya me tienes harto
*/
<template>
  <header 
    :class="{ 'scrolled': isScrolled }"
    class="fixed top-0 left-0 w-full z-50"
  >
    <div class="container mx-auto transition-all duration-500 ease-in-out max-w-7xl">
      <nav class="flex justify-between items-center px-6 py-2">

        <!-- Logo -->
        <div 
          class="flex-shrink-0 transition-all duration-500"
          :class="isScrolled ? 'w-12 h-12' : 'w-14 h-14'"
        >
          <a href="/">
            <img src="/src/assets/images/utn.png" alt="UTNay" class="w-full h-full object-contain" >
          </a>
        </div>

        <!-- Links de escritorio con dropdowns -->
        <div class="hidden md:flex space-x-8">
          <div class="relative group">
            <a href="/#carreras" class="hover:text-green-200 transition-colors focus:outline-none">
              Carreras
              <svg class="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            
          </div>

          <div class="relative group">
            <button class="hover:text-green-200 transition-colors focus:outline-none">
              Contacto
              <svg class="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            
          </div>

          <div class="relative group">
            <button class="hover:text-green-200 transition-colors focus:outline-none">
              Noticias
              <svg class="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <ul class="absolute left-0 mt-2 w-56 bg-gray-900 rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <li><a href="/#noticias" class="block px-4 py-2 hover:bg-gray-800 hover:text-green-200">Feria de Empleo 2025</a></li>
              <li><a href="/#noticias" class="block px-4 py-2 hover:bg-gray-800 hover:text-green-200">Conferencia de IA</a></li>
            </ul>
          </div>

          <div class="relative group">
            <button class="hover:text-green-200 transition-colors focus:outline-none">
              Vinculación
              <svg class="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <ul class="absolute left-0 mt-2 w-56 bg-gray-900 rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <li><a href="/vinculacion#empresas" class="block px-4 py-2 hover:bg-gray-800 hover:text-green-200">Empresas aliadas</a></li>
              <li><a href="/vinculacion#bolsa" class="block px-4 py-2 hover:bg-gray-800 hover:text-green-200">Prácticas profesionales</a></li>
            </ul>
          </div>

          <a href="/scholarships" class="hover:text-green-200 transition-colors">Becas</a>
        </div>

        <!-- Botón hamburguesa móvil -->
        <button @click="isOpen = !isOpen" class="md:hidden focus:outline-none">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </nav>

      <!-- Menú móvil con acordeones y animaciones -->
      <transition name="mobile-menu">
        <div v-show="isOpen" class="md:hidden mt-2 bg-gray-800/70 rounded-lg p-4">
          <div v-for="(item, index) in menuItems" :key="index" class="mb-2">
            <button 
              @click="toggleMobileSubmenu(index)" 
              class="w-full text-left px-4 py-2 bg-gray-900 rounded-md hover:text-green-200 flex justify-between items-center"
            >
              {{ item.label }}
              <svg :class="{ 'rotate-180': activeMobileSubmenu === index }" class="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <transition name="submenu">
              <div v-show="activeMobileSubmenu === index" v-if="item.subItems" class="pl-6 pt-2 space-y-1">
                <a v-for="(sub, subIndex) in item.subItems" :key="subIndex" :href="sub.href" class="block hover:text-green-200">
                  {{ sub.label }}
                </a>
              </div>
            </transition>
          </div>
          <a href="https://www.utnay.edu.mx/becas.html" target="_blank" rel="noopener noreferrer" class="block py-2 hover:text-green-200 transition-colors">Becas</a>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);
const isOpen = ref(false);
const activeDropdown = ref<number | null>(null);
const activeMobileSubmenu = ref<number | null>(null);

const menuItems = ref([
  
 {
    label: 'Acerca de',
    subItems: [
      { label: 'Misión y Visión', href: '/#mision' },
      { label: 'Historia', href: '/#historia' },
    ]
  },
  {
    label: 'Noticias',
    subItems: [
      { label: 'Feria de Empleo 2025', href: '/#noticias' },
      { label: 'Conferencia de IA', href: '/#noticias' },
    ]
  },

  {
    label: 'Vinculación',
    subItems: [
      { label: 'Empresas aliadas', href: '/vinculacion#empresas' }, // ✅ Correcto
      { label: 'Prácticas profesionales', href: '/vinculacion#bolsa' }, // ⚠️ Mira la nota abajo
    ]
  },
  {
    label: 'Carreras',
    subItems: [
      { label: 'Ingeniería en Sistemas', href: '/#carreras' },
      { label: 'Ingeniería Industrial', href: '/#carreras' },
      { label: 'Lic. en Administración', href: '/#carreras' },
    ]
  },
  
]);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

const openDropdown = (index: number) => {
  activeDropdown.value = index;
};

const closeDropdown = () => {
  activeDropdown.value = null;
};

const toggleMobileSubmenu = (index: number) => {
  activeMobileSubmenu.value = activeMobileSubmenu.value === index ? null : index;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
@keyframes dropIn {
  0% { transform: translateY(-150%); opacity: 0; }
  60% { transform: translateY(10px); opacity: 1; }
  100% { transform: translateY(0); opacity: 1; }
}

header {
  color: white;
  transition: padding-top 0.5s ease;
}

header nav {
  background-color: transparent;
  padding-top: 5px;
  border-radius: 0;
  box-shadow: none;
  transition: background-color 0.5s ease, border-radius 0.5s ease, box-shadow 0.5s ease;
}

header.scrolled {
  padding-top: 4px;
  animation: dropIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

header.scrolled nav {
  background-color: rgba(4, 120, 87, 0.40);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

/* Animaciones para dropdowns de escritorio */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Animaciones para menú móvil principal */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Animaciones para submenús móviles */
.submenu-enter-active,
.submenu-leave-active {
  transition: opacity 0.2s ease, height 0.2s ease;
  overflow: hidden;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  height: 0;
}

.submenu-enter-to,
.submenu-leave-from {
  opacity: 1;
  height: auto;
}
</style>