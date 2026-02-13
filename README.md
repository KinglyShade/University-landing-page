# University-landing-page

#  Universidad Tecnológica de Nayarit - Landing Page

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-Production-brightgreen.svg)

Página de inicio institucional moderna y responsive para la **Universidad Tecnológica de Nayarit (UTN)**. Una solución web integral que presenta la oferta educativa, información de admisiones, vinculación empresarial, becas, servicios y más.

---

##  Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Guía de Desarrollo](#guía-de-desarrollo)
- [Despliegue a Producción](#despliegue-a-producción)
- [Contribución](#contribución)
- [Licencia](#licencia)

---

##  Características

### Experiencia de Usuario
- **Diseño Responsive**: Adaptado perfectamente a dispositivos móviles, tablets y desktop
- **Interfaz Moderna**: Estética universitaria profesional con animaciones fluidas
- **Navegación Intuitiva**: Menú flotante con navegación anidada para acceso rápido
- **Performance Optimizado**: Carga rápida y optimización de recursos

### Secciones Principales
- **Página de Inicio**: Hero section con slider de noticias y oferta educativa
- **Admisiones**: Información y proceso de inscripción
- **Carreras Profesionales**: Catálogo detallado de programas académicos
  - Gastronomía
  - Mecatrónica
  - Psicología
  - Y más...
- **Vinculación Empresarial**: Partnerships con empresas y oportunidades laborales
- **Becas y Apoyos**: Información sobre programas de apoyo financiero
- **Prácticas Profesionales**: Detalles sobre programas de experiencia laboral
- **Servicios**: Información de servicios administrativos, informáticos y generales
- **Contacto**: Formulario de contacto y ubicación
- **Sistema de Login**: Autenticación de usuarios con seguridad

### Funcionalidades Técnicas
- Slider de noticias y eventos con autoplay
- Animaciones avanzadas con componentes interactivos
- Integración con base de datos MongoDB
- Sistema de autenticación con encriptación bcrypt
- Carrusel de empresas vinculadas
- Galería de scholarships con detalles descargables

---

## 🛠️ Tecnologías Utilizadas

### Framework Principal
- **[Astro 5](https://astro.build/)** (v5.16.3) - Meta-framework para contenido estático y dinámico
  - Routing basado en archivos
  - Server-side rendering (SSR) para generación óptima
  - Excelente performance de Core Web Vitals

### Frontend

#### Vue 3 (Stack Principal)
- **[Vue 3](https://vuejs.org/)** (v3.5.24) - Framework reactivo progresivo
  - Single File Components (SFC)
- **[@astrojs/vue](https://docs.astro.build/en/guides/integrations-guide/vue/)** (v5.1.1) - Integración oficial Astro-Vue
- **[@vueuse/motion](https://motion.vueuse.org/)** (v3.0.3) - Animaciones fluidas con Vue Composition API
- **[@iconify/vue](https://iconify.design/docs/icon-components/vue/)** (v5.0.0) - Sistema de iconos SVG escalables

#### React (Alternativo)
- **[React](https://react.dev/)** (v19.2.0) - Para componentes de alternancia
- **[@astrojs/react](https://docs.astro.build/en/guides/integrations-guide/react/)** (v4.4.0) - Integración oficial Astro-React
- **[Framer Motion](https://www.framer.com/motion/)** (v12.23.22) - Librería de animaciones avanzadas

#### UI & Estilos 
- **[Tailwind CSS](https://tailwindcss.com/)** (v4.1.14) - Utilidades CSS generadas dinámicamente
- **[@astrojs/tailwind](https://docs.astro.build/en/guides/integrations-guide/tailwind/)** (v6.0.2) - Integración Tailwind-Astro
- **[@tailwindcss/vite](https://tailwindcss.com/)** (v4.1.14) - Plugin Vite para Tailwind

#### Componentes & Sliders
- **[Swiper](https://swiperjs.com/)** (v12.0.2) - Carrusel responsive para noticias y empresas
- **[@headlessui/vue](https://headlessui.com/)** (v1.7.23) - Componentes unstyled accesibles

### Backend & Base de Datos
- **[MongoDB](https://www.mongodb.com/)** - Base de datos NoSQL
- **[Mongoose](https://mongoosejs.com/)** (v8.19.3) - ODM para MongoDB
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** (v6.0.0) - Hashing seguro de contraseñas

### DevTools & Configuración
- **[TypeScript](https://www.typescriptlang.org/)** (v5.9.3) - Tipado estático
- **[Prettier](https://prettier.io/)** - Formateador de código
- **[dotenv](https://github.com/motdotla/dotenv)** (v17.2.3) - Gestión de variables de entorno
- **[npm](https://www.npmjs.com/)** - Gestor de dependencias y paquetes

---

##  Arquitectura del Proyecto

### Patrón de Arquitectura: Astro Islands + Component-Based
