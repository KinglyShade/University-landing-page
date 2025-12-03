// src/data/careers.js
import gastronomiaLogo from '../assets/images/carreras/logogastro_png.png'; 
import tiLogoN from '../assets/images/carreras/ITIIDNUEVO_png.png';
import administracionLogo from '../assets/images/carreras/LADCIRCULO_png.png';
import mecatronicaLogo from '../assets/images/carreras/logomecatronica_png.png';
import logisticaLogo from '../assets/images/carreras/logoli_png.png';
import turismoLogo from '../assets/images/carreras/LOGOS-20CONTORNO-20BLANCO-09_png.png';
import mantenimientoLogo from '../assets/images/carreras/LOGOS-20CONTORNO-20BLANCO-04-20(1)_png.png';
import seguridadLogo from '../assets/images/carreras/LOGOS-20CONTORNO-20BLANCO-08-20(1)_png.png';
import mercadotecniaLogo from '../assets/images/carreras/LINMCIRCULO_png.png';

export const careers = [
  {
    id:"gastronomia", // OK
    name: "Gastronomía",
    img: gastronomiaLogo.src,
    background: "",
    description: "Formando a los chefs del mañana.",
    duration: "3 años (TSU + Licenciatura)",
    modality: "Presencial",
    field: "Restaurantes, hoteles, catering, consultoría culinaria."
  },
  {
    id: "tecnologias-informacion", // <-- AÑADIDO
    name: "Tecnologías de la Información", // <-- CORREGIDO (tenía un espacio extra al final)
    img: tiLogoN.src,
    background: "",
    description: "Impulsando la innovación digital.",
    duration: "3 años",
    modality: "Presencial",
    field: "Desarrollo de software, redes, ciberseguridad y soporte técnico."
  },
  {
    id: "administracion", // <-- AÑADIDO
    name: "Administración",
    img: administracionLogo.src,
    background: "",
    description: "Liderando el futuro empresarial.",
    duration: "3 años",
    modality: "Presencial",
    field: "Empresas, gestión de recursos humanos, contabilidad, finanzas."
  },
  {
    id: "mecatronica", // <-- AÑADIDO
    name: "Mecatrónica",
    img: mecatronicaLogo.src,
    background: "",
    description: "Integrando tecnología y automatización.",
    duration: "3 años",
    modality: "Presencial",
    field: "Robótica, control de procesos, mantenimiento industrial."
  },
  {
    id: "logistica-internacional", // <-- AÑADIDO
    name: "Logística Internacional",
    img: logisticaLogo.src,
    background: "",
    description: "Moviendo el mundo eficientemente.",
    duration: "3 años",
    modality: "Presencial",
    field: "Comercio exterior, transporte, cadenas de suministro."
  },
  {
    id: "turismo", // <-- AÑADIDO
    name: "Turismo",
    img: turismoLogo.src,
    background: "",
    description: "Explorando destinos y culturas.",
    duration: "3 años",
    modality: "Presencial",
    field: "Hotelería, agencias de viajes, guías turísticos, gestión cultural."
  },
  {
    id: "mantenimiento-industrial", // <-- AÑADIDO
    name: "Mantenimiento Industrial",
    img: mantenimientoLogo.src,
    background: "",
    description: "Asegurando la operatividad continua.",
    duration: "3 años",
    modality: "Presencial",
    field: "Plantas industriales, gestión de mantenimiento, maquinaria pesada."
  },
  {
    id: "seguridad-publica", // <-- AÑADIDO
    name: "Seguridad Pública",
    img: seguridadLogo.src,
    background: "",
    description: "Formando profesionales para proteger y servir.",
    duration: "3 años",
    modality: "Presencial",
    field: "Corporaciones de seguridad, investigación forense, gestión pública."
  },
  {
    id: "innovacion-negocios-mercadotecnia", // <-- AÑADIDO
    name: "Innovación de Negocios y Mercadotecnia",
    img: mercadotecniaLogo.src,
    background: "",
    description: "Desarrollando estrategias de mercado con visión creativa.",
    duration: "3 años",
    modality: "Presencial",
    field: "Marketing digital, branding, comercio electrónico, ventas."
  }
];