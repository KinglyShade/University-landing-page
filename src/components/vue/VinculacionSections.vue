<template>
  <div>
    <!-- CEELEX Section -->
    <section 
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="order-2 md:order-1">
          <h3 class="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-primary-500 pb-2 inline-block">
            CEELEX
          </h3>
          <h4 class="text-xl text-gray-600 mb-4 font-semibold">
            Centro de Enseñanza Especializada en Lenguas Extranjeras
          </h4>
          <p class="text-base md:text-lg text-gray-700 leading-relaxed">
            Un espacio dedicado donde niños, adolescentes y adultos pueden aprender inglés y francés. 
            Nuestros programas están diseñados para desarrollar habilidades lingüísticas efectivas 
            en un ambiente dinámico y profesional.
          </p>
        </div>
        <div class="order-1 md:order-2 flex justify-center">
          <img 
            src="/images/vinculacion/ceelex.jpg" 
            alt="CEELEX - Clases de idiomas" 
            class="rounded-lg shadow-xl w-full max-w-md object-cover h-64 md:h-80 hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>

    <!-- ECECUT Section -->
    <section 
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
      class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="flex justify-center">
          <img 
            src="/images/vinculacion/ececut.png" 
            alt="ECECUT - Certificación de competencias" 
            class="rounded-lg shadow-xl w-full max-w-md object-cover h-64 md:h-80 hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div>
          <h3 class="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-secondary-500 pb-2 inline-block">
            ECECUT
          </h3>
          <h4 class="text-xl text-gray-600 mb-4 font-semibold">
            Entidad Certificadora y Evaluadora de Competencias
          </h4>
          <p class="text-base md:text-lg text-gray-700 leading-relaxed">
            La Entidad Certificadora y Evaluadora de Competencias de la Universidad Tecnológica de Nayarit 
            está capacitada para certificar a profesionales en especialidades y habilidades blandas. 
            Validamos tus conocimientos y destrezas con reconocimiento oficial.
          </p>
        </div>
      </div>
    </section>

    <!-- Incubadora Section -->
    <section 
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="order-2 md:order-1">
          <div class="flex items-center gap-4 mb-6">
            <div class="p-3 bg-primary-100 rounded-lg text-primary-600">
              <Icon icon="mdi:rocket-launch" class="w-8 h-8" />
            </div>
            <h3 class="text-3xl font-bold text-gray-800 border-b-2 border-primary-500 pb-2">
              Incubadora de Negocios
            </h3>
          </div>
          <p class="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
            La <strong>Incubadora de Negocios</strong> de la Universidad Tecnológica de Nayarit (UTNay) es un espacio dedicado a fomentar el emprendimiento y apoyar a los estudiantes y egresados en la creación y desarrollo de sus propios negocios.
          </p>
          <p class="text-base md:text-lg text-gray-700 leading-relaxed">
            Ofrecemos talleres sobre planificación empresarial, marketing, finanzas y gestión de proyectos. Proporcionamos un entorno colaborativo para conectar con <strong>mentores</strong> y expertos.
          </p>
        </div>
        <div class="order-1 md:order-2 flex justify-center">
           <!-- Placeholder visual or icon pattern -->
           <div class="w-full max-w-md h-64 md:h-80 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl flex items-center justify-center shadow-inner">
              <Icon icon="mdi:lightbulb-on-outline" class="w-32 h-32 text-primary-300" />
           </div>
        </div>
      </div>
    </section>

    <!-- Bolsa de Trabajo Section -->
    <section 
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="flex justify-center">
             <div class="w-full max-w-md h-64 md:h-80 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl flex items-center justify-center shadow-inner">
              <Icon icon="mdi:briefcase-search-outline" class="w-32 h-32 text-secondary-300" />
           </div>
        </div>
        <div>
          <div class="flex items-center gap-4 mb-6">
             <div class="p-3 bg-secondary-100 rounded-lg text-secondary-600">
              <Icon icon="mdi:domain" class="w-8 h-8" />
            </div>
            <h3 class="text-3xl font-bold text-gray-800 border-b-2 border-secondary-500 pb-2">
              Bolsa de Trabajo
            </h3>
          </div>
          <p class="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
            La <strong>Bolsa de Trabajo</strong> de la UTNay conecta a estudiantes y egresados con oportunidades laborales. Facilita la búsqueda de empleo y permite a las empresas publicar vacantes y encontrar <strong>talento calificado</strong>.
          </p>
          <p class="text-base md:text-lg text-gray-700 leading-relaxed">
            Ofrecemos recursos adicionales como consejos para currículums y preparación para entrevistas, impulsando el desarrollo profesional de nuestra comunidad.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
</script>
