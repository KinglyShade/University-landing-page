import { defineConfig } from 'astro/config';

import react from "@astrojs/react";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // Tus integraciones se quedan exactamente como están
  integrations: [
    react(),
    vue({
      // registrar el entrypoint cliente que instala @vueuse/motion
      appEntrypoint: './src/plugins/v-motion.js'
    }),
    tailwind()
  ],

  // --- Añade esta sección para que ngrok funcione ---
  // No forzamos HMR/WS por defecto. Si necesitas ngrok/hmr personalizado,
  // vuelve a añadir `vite.server.hmr` con protocol: 'wss' y clientPort: 443.
});
