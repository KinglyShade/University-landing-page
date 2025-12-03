/// <reference types="astro/client" />
/// <reference types="@astrojs/vue/client" />

// Add type definitions for Vue components
declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
