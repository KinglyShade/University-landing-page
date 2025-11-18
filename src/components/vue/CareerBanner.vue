<script setup>
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
    default: '',
  },
  backgroundImage: {
    type: String,
    required: true,
  }
});
</script>

<template>
  <div
    class="
      group relative flex items-center justify-center 
      h-[180px] md:h-[150px] 
      bg-gray-100 hover:bg-gray-200 
      border-b border-gray-200 
      cursor-pointer overflow-hidden 
      transition-colors duration-300 ease-in-out
      font-sans "
  >
    <div 
      class="
        absolute inset-0 w-full h-full 
        bg-cover bg-center 
        transition-transform duration-500 ease-in-out 
        z-0
        group-hover:scale-108
      "
      :style="{ 'background-image': `url(${backgroundImage})` }"
    ></div>

    <img
      :src="imageUrl"
      alt="Imagen de la carrera"
      class="
        absolute bottom-0 left-0 h-full w-auto 
        opacity-0 transform -translate-x-5 
        transition-all duration-500 ease-in-out 
        z-10
        group-hover:opacity-80 group-hover:translate-x-0
      "
    />
    
    <div 
      class="
        relative z-20 text-center 
        px-4 md:px-8 
        bg-white/70 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none 
        py-2 px-4 rounded-lg 
        transition-all duration-400 ease-in-out
        
        group-hover:-translate-y-[10%]
        
        md:group-hover:translate-x-[80%] md:group-hover:text-right
      "
    >
      <h3 
        class="
          text-2xl md:text-3xl font-bold text-brand-dark 
          transition-all duration-400 ease-in-out
          
          group-hover:text-brand-blue group-hover:-translate-y-2
          
          md:group-hover:text-2xl md:group-hover:translate-y-0 md:group-hover:text-brand-dark
        "
      >
        {{ title }}
      </h3>
      
      <p 
        class="
          text-sm text-brand-muted 
          opacity-0 max-h-0 md:max-h-full 
          overflow-hidden 
          transition-all duration-400 ease-in-out 
          md:max-w-[250px]
          
          group-hover:opacity-100 group-hover:max-h-[100px]
        "
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>