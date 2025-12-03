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
        <div class="hidden md:flex space-x-8 text-white">
          <div class="relative group">
            <a href="/#carreras" class="hover:text-green-200 transition-colors focus:outline-none">
              Carreras
            </a>
          </div>

          <div class="relative group">
            <a href="/contacto" class="hover:text-green-200 transition-colors focus:outline-none">
              Contacto
            </a>
          </div>

          <div class="relative group">
            <a href="/admisiones" class="hover:text-green-200 transition-colors focus:outline-none">
              Admisiones
            </a>
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
              <li><a href="/practicas-profesionales" class="block px-4 py-2 hover:bg-gray-800 hover:text-green-200">Prácticas profesionales</a></li>
            </ul>
          </div>

          <div class="relative group">
            <button class="hover:text-green-200 transition-colors focus:outline-none">
              Servicios
              <svg class="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <ul class="absolute left-0 mt-2 w-64 bg-gray-900 rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <li><a href="/psicologia" class="block px-4 py-2 hover:bg-gray-800 hover:text-green-200">Psicología</a></li>
              <li><a href="/servicios-generales" class="block px-4 py-2 hover:bg-gray-800 hover:text-green-200">Servicios generales</a></li>
              <li><a href="/servicios-informaticos" class="block px-4 py-2 hover:bg-gray-800 hover:text-green-200">Servicios informáticos</a></li>
              <li><a href="/transparencia" class="block px-4 py-2 hover:bg-gray-800 hover:text-green-200">Plataforma de transparencia</a></li>
              <li><a href="/quejas-sugerencias" class="block px-4 py-2 hover:bg-gray-800 hover:text-green-200">Quejas y sugerencias</a></li>
            </ul>
          </div>

          <a href="/scholarships" class="hover:text-green-200 transition-colors">Becas</a>
          
          <!-- User Profile / Register -->
          <div v-if="isLoggedIn" class="relative group">
            <button class="flex items-center space-x-2 hover:text-green-200 transition-colors focus:outline-none">
              <img :src="user?.profile_picture || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'" alt="Profile" class="w-8 h-8 rounded-full object-cover border-2 border-green-200">
              <span class="font-medium">{{ user?.username }}</span>
            </button>
             <ul class="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <li>
                <a href="/profile" class="block px-4 py-2 hover:bg-gray-800 hover:text-green-200 flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  Mi Perfil
                </a>
              </li>
              <li>
                <button @click="logout" class="w-full text-left block px-4 py-2 hover:bg-gray-800 hover:text-red-400 flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
          <a v-else href="/Auth/register" class="hover:text-green-900 transition-colors font-semibold border border-green-200 px-4 py-1 rounded-full hover:bg-green-200">Registro</a>
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
          <a href="https://www.utnay.edu.mx/becas.html" target="_blank" rel="noopener noreferrer" class="block py-2 hover:text-green-200 transition-colors">Becas</a>
          
          <div v-if="isLoggedIn" class="border-t border-gray-700 mt-2 pt-2">
            <div class="flex items-center space-x-3 px-2 py-2 mb-2">
               <img :src="user?.profile_picture || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'" alt="Profile" class="w-10 h-10 rounded-full object-cover border-2 border-green-200">
               <div>
                 <p class="font-medium text-white">{{ user?.username }}</p>
                 <p class="text-xs text-gray-400">{{ user?.email }}</p>
               </div>
            </div>
            <a href="/profile" class="block py-2 px-2 hover:text-green-200 transition-colors">Mi Perfil</a>
            <button @click="logout" class="w-full text-left block py-2 px-2 text-red-400 hover:text-red-300 transition-colors">Cerrar Sesión</button>
          </div>
          <a v-else href="/Auth/register" class="block py-2 hover:text-green-200 transition-colors font-semibold">Registro</a>
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
const isLoggedIn = ref(false);
const user = ref<any>(null);

const menuItems = ref([
  {
    label: 'Acerca de',
    subItems: [
      { label: 'Misión y Visión', href: '/#mision' },
      { label: 'Historia', href: '/#historia' },
    ],
  },
  {
    label: 'Admisiones',
    subItems: [
      { label: 'Información general', href: '/admisiones' },
    ],
  },
  {
    label: 'Servicios',
    subItems: [
      { label: 'Psicología', href: '/psicologia' },
      { label: 'Servicios generales', href: '/servicios-generales' },
      { label: 'Servicios informáticos', href: '/servicios-informaticos' },
      { label: 'Plataforma de transparencia', href: '/transparencia' },
      { label: 'Quejas y sugerencias', href: '/quejas-sugerencias' },
    ],
  },
  {
    label: 'Vinculación',
    subItems: [
      { label: 'Empresas aliadas', href: '/vinculacion#empresas' },
      { label: 'Prácticas profesionales', href: '/practicas-profesionales' },
    ],
  },
  {
    label: 'Carreras',
    subItems: [
      { label: 'Ingeniería en Sistemas', href: '/#carreras' },
      { label: 'Ingeniería Industrial', href: '/#carreras' },
      { label: 'Lic. en Administración', href: '/#carreras' },
    ],
  },
]);

const handleScroll = () => {
  if (typeof window === 'undefined') return;
  isScrolled.value = window.scrollY > 10;
};

const toggleMobileSubmenu = (index: number) => {
  activeMobileSubmenu.value =
    activeMobileSubmenu.value === index ? null : index;
};

const logout = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('admin_auth');
  localStorage.removeItem('user_info');
  isLoggedIn.value = false;
  user.value = null;
  window.location.href = '/Auth/login';
};

onMounted(() => {
  if (typeof window === 'undefined') return;

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  const auth = localStorage.getItem('admin_auth');
  const storedUser = localStorage.getItem('user_info');

  if (auth && storedUser) {
    try {
      user.value = JSON.parse(storedUser);
      isLoggedIn.value = true;
    } catch (e) {
      console.error('Error al leer user_info desde localStorage', e);
      localStorage.removeItem('user_info');
    }
  }
});

onUnmounted(() => {
  if (typeof window === 'undefined') return;
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
header nav {
  background-color: transparent;
  padding-top: 5px;
  border-radius: 0;
  box-shadow: none;
  transition: background-color 0.5s ease, border-radius 0.5s ease,
    box-shadow 0.5s ease;
}

header.scrolled {
  padding-top: 4px;
  animation: dropIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

header.scrolled nav {
  background-color: rgba(4, 120, 87, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  color: white;
}

/* Make navigation links white when scrolled */
header.scrolled nav a,
header.scrolled nav button {
  color: white;
}

header.scrolled nav a:hover,
header.scrolled nav button:hover {
  color: rgb(167 243 208); /* green-200 */
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
