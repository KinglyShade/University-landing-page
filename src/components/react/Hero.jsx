// src/components/react/Hero.jsx
import { motion } from 'framer-motion';

// Componente Hero con animaciones usando Framer Motion. Muerte a React
export default function Hero() {

    // --- Definición de las Animaciones ---
    // Animación para el contenedor del texto.
    // Hace que el título, el párrafo y el botón no aparezcan de golpe, sino uno tras otro.
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
    };

    // Esta es la animación individual para cada elemento del texto.
    // Hace que suban un poquito y aparezcan (efecto "item").
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { ease: "easeOut", duration: 0.5 } },
    };

    // Animación para la imagen de los estudiantes a la DERECHA.
    // Entra con una transición suave de opacidad y escala (Fade In).
    const fadeInVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
    };

    // Animación para el elemento de la IZQUIERDA (por ejemplo, un logo o escudo).
    // Entra deslizándose desde abajo hacia arriba (Slide Up).
    const slideUpVariants = {
        hidden: { y: '100%' }, // Empieza totalmente fuera de la vista, abajo.
        visible: { y: '0%', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } // Termina en su lugar.
    };

    return (
        // El contenedor principal que ocupa toda la pantalla.
        <div className="relative w-full h-screen overflow-hidden">

            {/* El video de fondo. */}

            <video
                className="absolute inset-0 w-full h-full object-cover z-0"
                src="https://cdn.discordapp.com/attachments/1171998042581389395/1424622229403996202/fnd.mp4?ex=68e49e57&is=68e34cd7&hm=f7e59bb09f0ec25f5112739a4ba985fb1264bec70ecb3a7e6f4d365f178bbc4d&"
                autoPlay loop muted playsInline
            />
            {/* La capa oscura para que el texto resalte y se vea chido. */}
            <div className="absolute inset-0 bg-black/60 z-10" />

            {/* Contenedor GENERAL para todos los elementos animados. */}
            <div className="relative z-20 flex items-center justify-center h-full w-full">

                {/* IMAGEN IZQUIERDA (con deslizamiento) */}
                {/* quinglychei */}
                <motion.div
                    className="absolute bottom-0 left-0 z-20 w-auto h-auto max-w-[35%] md:max-w-[40%] lg:max-w-[45%]"
                    variants={slideUpVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                >
                    {/*  */}
                    <img

                        src="https://media.discordapp.net/attachments/1171998042581389395/1424638140668182598/asd.png?ex=68e4ad29&is=68e35ba9&hm=bc12735cc566bb002660a3ed0e7172852e73e38ebec7491db650609f55c90988&=&format=webp&quality=lossless"
                        alt="Escudo de la universidad"
                        className="block w-full h-auto"
                    />
                </motion.div>

                {/*  Contenido de Texto Central */}
                {/* Mensaje principal*/}
                <motion.div
                    className="w-full md:w-1/2 flex flex-col items-center text-center p-8 z-30" // z-30 para que esté SIEMPRE encima de las imágenes.
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        className="
                        text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                        -6xl font-extrabold py-2 drop-shadow-lg 
                                     bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
                        variants={fadeInVariants}
                    >
                        Universidad Tecnológica de Nayarit
                    </motion.h1>

                    <motion.p
                        className="text-xl lg:text-2xl my-8 drop-shadow-md text-white"
                        variants={itemVariants}
                    >
                        Formando a los profesionales del mañana, hoy.
                    </motion.p>

                    <motion.button
                        className="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-500 transition-colors"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Inscríbete
                    </motion.button>
                </motion.div>

                {/* IMAGEN DERECHA (con fade in) */}
                {/* La imagen de los estudiantes */}
                <motion.div
                    className="absolute bottom-0 right-0 z-20 w-auto h-auto max-w-[40%] md:max-w-[45%] lg:max-w-[50%]"
                    variants={slideUpVariants} //aplicar la animación de aparición suave.
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                >
                    <img
                        src="https://media.discordapp.net/attachments/1171998042581389395/1424638140668182598/asd.png?ex=68e4ad29&is=68e35ba9&hm=bc12735cc566bb002660a3ed0e7172852e73e38ebec7491db650609f55c90988&=&format=webp&quality=lossless"
                        alt="Estudiantes de la UT Nayarit"
                        className="block w-full h-auto"
                    />
                </motion.div>

            </div>
        </div>
    );
}