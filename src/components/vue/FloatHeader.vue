<template>
  <header 
    :class="{ 'scrolled': isScrolled }"
    class="fixed top-0 left-0 w-full z-50"
  >
    <div 
      class="container mx-auto transition-all duration-500 ease-in-out" 
      :class="{ 'max-w-6xl': isScrolled }"
    >
      <nav class="flex justify-between items-center px-6 py-2">

        <div 
          class="flex-shrink-0 transition-all duration-500"
          :class="isScrolled ? 'w-12 h-12' : 'w-14 h-14'"
        >
          <img src="/src/assets/images/utn.png" alt="UTNay" class="w-full h-full object-contain" >
        </div>
        <div class="hidden md:flex space-x-8">
          <a href="#carreras" class="hover:text-green-200 transition-colors">Carreras</a>
          <a href="#contacto" class="hover:text-green-200 transition-colors">Contacto</a>
          <a href="#vinculacion" class="hover:text-green-200 transition-colors">Vinculación</a>
          <a href="#beca" class="hover:text-green-200 transition-color">Becas</a>
        </div>
        <div class="md:visible">
          <button class="focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// El Script no cambia
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
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

/* 2. Estado inicial: esquinas RECTAS (sin redondear) */
header nav {
  background-color: transparent;
  padding-top: 5px;
  border-radius: 0; /* Sin redondear al inicio */
  box-shadow: none;
  transition: background-color 0.5s ease, border-radius 0.5s ease, box-shadow 0.5s ease;
}

header.scrolled {
  padding-top: 4px; /* El padding superior solo cuando se hace scroll */
  animation: dropIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

/* 3. Estado al hacer scroll: esquinas REDONDEADAS */
header.scrolled nav {
  background-color: rgba(4, 120, 87, 0.40);
  backdrop-filter: blur(10px);
  border-radius: 24px; /* Redondeado solo al hacer scroll */
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

</style>