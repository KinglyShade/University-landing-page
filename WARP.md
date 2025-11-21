# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This repository is an [Astro 5](https://astro.build/) project that powers a university landing site. It uses:
- Astro pages/layouts for routing and server-side logic
- Vue 3 (primary) and some React support via `@astrojs/vue` and `@astrojs/react`
- Tailwind CSS for styling (via `@astrojs/tailwind`)
- Client-side animation libraries: `@vueuse/motion`, `swiper`, and `@iconify/vue`
- A MongoDB/Mongoose layer for user data and login experiments

## Core Commands

All commands are run from the repo root.

### Installation
- Install dependencies: `npm install`

### Development
- Start dev server: `npm run dev`
  - Standard Astro dev server (defaults to port 4321 unless configured otherwise).

### Build & Preview
- Build for production: `npm run build`
- Preview a built site: `npm run preview`
- Convenience script to build then preview: `npm run prod`

### Validation & Tooling
- Astro typecheck / diagnostics: `npm run check`
- Sync Astro types/content collections: `npm run sync`
- Format code with Prettier: `npm run format`

### Tests
- `npm test` is currently a placeholder (`echo "Error: no test specified" ...`) and there is no configured test runner yet.
  - There is therefore no established command for running a single test; tests will need to be added and wired into `npm test` before that exists.

## High-Level Architecture

### Framework & Integrations

- `astro.config.mjs`
  - Registers integrations:
    - `react()` – enables React island components (currently only `src/components/react/Hero.jsx`).
    - `vue({ appEntrypoint: './src/plugins/v-motion.js' })` – enables Vue islands and uses `src/plugins/v-motion.js` to install `@vueuse/motion` globally.
    - `tailwind()` – hooks Tailwind into the Astro/Vite pipeline.
  - No custom Vite server/HMR settings are defined beyond the default; comments note how to adjust for ngrok if needed.

- `tailwind.config.mjs`
  - Scans `./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}` for classes.
  - Extends theme with a shared `Inter` font and a `brand-*` color palette used across Vue components (e.g., `CareerBanner.vue`, scholarship components).

- `tsconfig.json`
  - Extends `astro/tsconfigs/base` and sets `"jsx": "preserve"`, allowing TS/JSX usage in React components and TypeScript in Vue SFCs.

### Routing & Layouts

- Routing follows Astro’s file-based routing under `src/pages`:
-  - `src/pages/index.astro` → `/`
-    - Landing page hero, “Noticias Recientes” slider, and “Oferta Educativa” section built from the `careers` array in `src/DB/db.js`. Each `CareerBanner` card links by `id` to a career-specific Astro page such as `/gastronomia` or `/mecatronica`.
-  - Additional top-level pages (e.g., `admisiones.astro`, `contacto.astro`, `practicas-profesionales.astro`, `psicologia.astro`, `servicios-generales.astro`, `servicios-informaticos.astro`, `transparencia.astro`, `quejas-sugerencias.astro`) provide mostly static institutional sections but all share `MainLayout.astro` and the floating header.
-  - `src/pages/vinculacion.astro` → `/vinculacion`
-    - Business partnerships and employment-related content powered by the `empresas` and `vinculacion` data modules.
-  - `src/pages/scholarships.astro` → `/scholarships`
-    - Scholarships/becas information rendered from `becasData` via `ScholarshipBanner.vue`.
-  - `src/pages/carreras/[slug].astro` → `/carreras/:slug`
-    - Dynamic career detail pages generated from the same `careers` data; these URLs are available if you want to standardize career routes under `/carreras/:slug`, even though current navigation primarily links to the individual top-level career pages.
-  - `src/pages/Login/login.astro` → `/Login/login` (case-sensitive on some hosts)
-    - Simple login form page using the main layout, with no backend authentication wiring yet.

- Shared layout:
  - `src/layouts/MainLayout.astro`
    - Imports global styles (`src/styles/global.css`) and the `FloatHeader` Vue component.
    - Wraps every page with the HTML shell, `<head>` tags, and a fixed floating header:
      - `<HeaderFlotante client:load />` renders the Vue floating navigation bar at the top.
    - Provides a `<slot />` where page-specific content is rendered inside `<main>`.
    - Also imports `src/scripts/main.js`, which currently contains login logic using Mongoose and `bcrypt` (see “Data & Backend Layer” below).

### UI Components

Most UI is implemented as Vue single-file components consumed from Astro using client directives (`client:load`, `client:visible`, `client:only="vue"`). React is enabled but not the dominant stack at the moment.

- Vue components (`src/components/vue`)
  - `Hero.vue`
    - Main landing hero with mirrored functionality to the React `Hero.jsx`, but implemented using Vue and `v-motion` instead of Framer Motion.
    - Used on the home page via `<Hero client:only="vue" />`.
  - `FloatHeader.vue`
    - Floating header / navigation bar used site-wide.
    - Handles scroll-based styling, mobile hamburger menu, and nested menus (e.g., “Vinculación”, “Carreras”).
    - Consumed from `MainLayout.astro` with `client:load` so it is hydrated on the client.
  - `footer.vue`
    - Animated footer using `v-motion` and `@iconify/vue` for social icons.
    - Used as `<Footer client:only="vue" />` in several pages.
  - `CareerBanner.vue`
    - Card-like component for displaying each career option.
    - Props (`title`, `imageUrl`, `description`, `backgroundImage`) are fed from the `careers` array in `src/DB/db.js`.
    - Used on the home page to render the “Oferta Educativa” section.
  - `ScholarshipBanner.vue`
    - Card component for individual scholarship types.
    - Takes a single `beca` object from `src/DB/becas.js` and animates hover state, details, and the “Descargar Reglamento” link.
    - Used in `src/pages/scholarships.astro` by mapping over filtered `becasData`.
  - `VinculacionHero.vue`, `InfSliderVinculacion.vue`, `SliderVinculacion.vue`, `noticiasslider.vue`
    - Hero and slider components for the “Vinculación” and “Noticias” sections.
    - Use `swiper` (with `Autoplay` and `Navigation` modules) and pull structured data from `src/DB/empresas.js`, `src/DB/vinculacion.js`, and `src/DB/noticias.js`.

- React components (`src/components/react`)
  - `Hero.jsx`
    - Framer Motion–based hero implementation mirroring the Vue hero.
    - React is fully configured via `@astrojs/react`, but the current Astro pages use the Vue hero instead. Treat this as an alternative or experimental implementation.

### Styling & Theming

- Global styles: `src/styles/global.css`
  - Imports Google Fonts and the Tailwind `@tailwind base/components/utilities` layers.
  - Defines CSS custom properties for background/foreground colors, text colors, accent colors, and gradients.
  - Applies base `body` styles (dark background, accent text color, font-family) and some layout utilities.

- Tailwind utilities
  - Tailwind classes appear extensively across `.astro` and `.vue` files for layout (`flex`, `grid`, `h-screen`, etc.), typography, and custom color usage from the `brand-*` palette.
  - When adding new UI, prefer reusing existing `brand-*` colors and the `Inter` sans font to stay consistent with current design.

### Data & Backend Layer

Data used to render the site is encapsulated in JS modules under `src/DB` and consumed by Astro pages and Vue components.

- Static content modules:
  - `src/DB/db.js`
    - Exports a `careers` array; each career item includes:
      - `id` – used as the `[slug]` route param in `src/pages/carreras/[slug].astro`.
      - `name`, `description`, `duration`, `modality`, `field` – semantic metadata for pages and cards.
      - `img` – imported image asset `.src` used in components.
      - `background`/`bgImg` – optional background art for hero sections.
    - `index.astro` maps over `careers` to render `CareerBanner` instances, and the `[slug].astro` page uses `getStaticPaths` to build per-career routes.
  - `src/DB/becas.js`
    - Exports `becasData`, an array describing scholarship types.
    - Contains UI-centric properties (e.g., gradients, front image, `detalles` breakdown) used directly by `ScholarshipBanner.vue`.
  - `src/DB/empresas.js`, `src/DB/noticias.js`, `src/DB/vinculacion.js`
    - `empresas` – logos and descriptions for partner companies, consumed by `InfSliderVinculacion.vue` and sections in `vinculacion.astro`.
    - `noticias` – list of news cards (image, title, summary, URL) used in `noticiasslider.vue` on the home page.
    - `vinculacion` data – similar structure to `noticias`, used by `SliderVinculacion.vue`.

- MongoDB / Mongoose integration:
-  - `src/DB/conect.js`
-    - Central `connectDB()` helper wrapping `mongoose.connect` and caching the connection.
-    - Intended to be called from server-side contexts (e.g., Astro server-side code or API routes) before accessing Mongoose models.
-    - `src/pages/index.astro` previously called `await connectDB();` but this is now commented out to avoid making the home page depend on a live database connection; `connectDB()` remains available for future server-side features that genuinely need MongoDB.
-  - `src/DB/sct/user.js`
-    - Defines a simple Mongoose `User` model with `name`, `email` (unique), and `password` fields.
-  - `src/scripts/main.js`
-    - Contains an async `login()` function that uses `bcrypt` and the `User` model to validate credentials.
-    - Imported from `MainLayout.astro` so it is bundled, but the `login()` function itself is not invoked anywhere yet; there is currently no end‑to‑end login flow wired to this logic.

> NOTE: The MongoDB connection string is currently hardcoded in `src/DB/conect.js`. When modifying backend code or adding new database features, prefer moving secrets into environment variables (e.g., `.env`) and referencing them via `import.meta.env` or `process.env` depending on context.

### Animations & Motion

- Vue motion plugin setup: `src/plugins/v-motion.js`
-  - Installs `MotionPlugin` from `@vueuse/motion` once on the Vue app via `app.use(MotionPlugin)`; there are no extra SSR guards or delayed mounting logic.
-  - This file is configured as the Vue `appEntrypoint` in `astro.config.mjs`, so all Vue components can use the `v-motion` directive without local plugin setup.
-
- - Components using `v-motion`
  - `Hero.vue` and `footer.vue`, as well as other Vue components, use `v-motion` to animate entry/hover states.
  - When adding new motion, reuse this directive instead of installing motion plugins on a per-component basis.

### How Things Fit Together

- Astro handles routing and initial HTML rendering via `.astro` files in `src/pages`, using `MainLayout.astro` to provide a consistent shell and floating header.
- Vue components in `src/components/vue` are mounted as islands into these pages with `client:*` directives, taking structured data from `src/DB/*.js` modules.
- Styling is centralized through Tailwind (configured in `tailwind.config.mjs`) and `src/styles/global.css`, with design tokens (CSS variables and `brand-*` colors) used across components.
- MongoDB/Mongoose helpers and models in `src/DB/conect.js` and `src/DB/sct/user.js` are available for server-side data access, though only lightly integrated today (e.g., `index.astro` calling `connectDB()` and a standalone `login()` helper in `src/scripts/main.js`).
