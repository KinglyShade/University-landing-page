// src/components/react/Hero.jsx
import { motion, useInView } from 'framer-motion';
// Importa los hooks necesarios de React
import { useRef, useState, useEffect } from 'react';

//me caga reac 
// Este código fue posible gracias a una dosis peligrosa de café y a Gemini.
export default function Hero() {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.25 });

    // Estado para controlar manualmente la visibilidad con retardo
    const [show, setShow] = useState(false);

    // Hook para aplicar el retardo solo al salir de la vista
    useEffect(() => {
        if (isInView) {
            setShow(true);
        } else {
            // Aplica un retardo de 500ms antes de ocultar
            const timer = setTimeout(() => setShow(false), 500);
            return () => clearTimeout(timer); // Limpia el temporizador
        }
    }, [isInView]);

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                ease: "easeOut",
                duration: 0.5
            }
        },
    };

    // Animación para que la imagen suba desde fuera de la pantalla
    const imageVariants = {
        hidden: { y: '100%' }, // Empieza 100% abajo (fuera de la pantalla)
        visible: {
            y: '0%', // Termina en su posición final
            transition: {
                ease: [0.22, 1, 0.36, 1],
                duration: 1
            }
        }
    };

    return (
        <div ref={ref} className="relative w-full h-screen overflow-hidden">

            {/* Video de fondo */}
            {/* Ayuda no se que hago con mi vida */}

            <video 
                className="absolute inset-0 w-full h-full object-cover z-0"
                src="https://cdn.discordapp.com/attachments/1171998042581389395/1424622229403996202/fnd.mp4?ex=68e49e57&is=68e34cd7&hm=f7e59bb09f0ec25f5112739a4ba985fb1264bec70ecb3a7e6f4d365f178bbc4d&"
                autoPlay
                loop
                muted
                playsInline
            />
            {/* puto video no se acomodo alv */}

            <div className="absolute inset-0 bg-black/60 z-10" />

            {/* Contenedor para el texto a la izquierda */}
            <div className="relative z-20 flex items-center justify-start h-full w-full">
                     {/* Contenedor para la imagen anclada a la esquina inferior derecha */}
            <motion.div 
                className="absolute bottom-0 left-0 z-20 w-auto h-auto max-w-[40%] md:max-w-[45%] lg:max-w-[50%]"
                variants={imageVariants}
                initial="hidden"
                animate={show ? 'visible' : 'hidden'}
            >
                <img
                    src="https://media.discordapp.net/attachments/1171998042581389395/1424638140668182598/asd.png?ex=68e4ad29&is=68e35ba9&hm=bc12735cc566bb002660a3ed0e7172852e73e38ebec7491db650609f55c90988&=&format=webp&quality=lossless"
                    alt="Estudiantes universitarios"
                    className="block w-full h-auto"
                />
            </motion.div>
                <motion.div
                    className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left p-8 lg:p-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate={show ? 'visible' : 'hidden'}
                >
                    <motion.h1
                        className="text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg 
                                   bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
                        variants={itemVariants}
                    >
                        Universidad Tecnológica de Nayarit
                    </motion.h1>

                    <motion.p
                        className="text-xl lg:text-2xl mb-8 drop-shadow-md text-white"
                        variants={itemVariants}
                    >
                        no le sé a web
                    </motion.p>
                    
                    <motion.button
                        className="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-500 transition-colors"
                        variants={itemVariants}
                    >
                        Inscríbete
                    </motion.button>
                </motion.div>
            </div>

            {/* Contenedor para la imagen anclada a la esquina inferior derecha */}
            <motion.div 
                className="absolute bottom-0 right-0 z-20 w-auto h-auto max-w-[40%] md:max-w-[45%] lg:max-w-[50%]"
                variants={imageVariants}
                initial="hidden"
                animate={show ? 'visible' : 'hidden'}
            >
                <img
                    src="https://media.discordapp.net/attachments/1171998042581389395/1424638140668182598/asd.png?ex=68e4ad29&is=68e35ba9&hm=bc12735cc566bb002660a3ed0e7172852e73e38ebec7491db650609f55c90988&=&format=webp&quality=lossless"
                    alt="Estudiantes universitarios"
                    className="block w-full h-auto"
                />
            </motion.div>
        </div>
    );
}