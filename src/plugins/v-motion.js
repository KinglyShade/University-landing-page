import { MotionPlugin } from '@vueuse/motion';

// Registrar MotionPlugin sólo en el cliente para evitar problemas durante SSR.
export default (app) => {
    // Asegurarse de que estamos en el cliente
    if (typeof window !== 'undefined') {
        // Retrasar la instalación del plugin hasta que el app esté listo
        // para evitar problemas de timing con SSR
        setTimeout(() => {
            app.use(MotionPlugin);
        }, 0);
    }
};
