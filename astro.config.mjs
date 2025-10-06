import { defineConfig } from 'astro/config';

import react from "@astrojs/react";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // Tus integraciones se quedan exactamente como están
  integrations: [react(), vue(), tailwind()],

  // --- Añade esta sección para que ngrok funcione ---
  vite: {
    server: {
      hmr: {
        // Ayuda a que la recarga en caliente funcione con ngrok
        clientPort: 443,
      },
      // Permite el acceso desde tu red y ngrok
      host: true, 
      // Permite cualquier host que termine en .ngrok-free.dev
      allowedHosts: [
        '*.ngrok-free.dev'
      ]
    }
  }
});
