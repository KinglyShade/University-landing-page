// tailwind.config.mjs
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {

    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    ],

    theme: {
        extend: {
            // 1. Estandariza tu fuente. 
            //    (Asegúrate de importar 'Inter' en tu layout de Astro)
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            // 2. Estandariza tu paleta de colores
            colors: {
                'brand-dark': '#1a202c',       // Color oscuro de CareerBanner
                'brand-blue': '#2c5282',       // Color hover de CareerBanner
                'brand-muted': '#4a5568',      // Color de descripción
                'brand-green-dark': '#16a34a', // (Equivalente a green-600 del Hero)
                'brand-green': '#22c55e',      // (Equivalente a green-500 de tu Beca)
                'brand-green-light': '#4ade80', // (Equivalente a green-400)
                'brand-cyan': '#22d3ee',      // (Equivalente a cyan-400)
            },
        },
    },

    plugins: [],
}