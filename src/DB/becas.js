import academicaLogo from "../assets/images/becas/becaacademica.png"
import familialogo from "../assets/images/becas/becafamilia.png";
import deportivalogo from "../assets/images/becas/becadeportiva.png";
import companerologo from "../assets/images/becas/becacompanero.png";


export const becasData = [
    {
        id: 1,
        titulo: "Beca Académica",
        resumen: "Apoyo de condonación a la colegiatura por promedio",
        monto: "Hasta 100% de descuento",
        pdfURL: "../assets/becaspdf/Academica.pdf",
        gradiente: "linear-gradient(135deg, #16a34a 0%, #15803d 50%, #052e16 100%)",
        imagenFrente: academicaLogo.src,
        activa: true,
        // Desglosamos la info de la beca fea en un array limpio
        detalles: [
            { label: "9.0 - 9.2", value: "40%" },
            { label: "9.3 - 9.4", value: "50%" },
            { label: "9.5 - 9.6", value: "60%" },
            { label: "9.7 - 9.8", value: "80%" },
            { label: "9.9 - 10", value: "100% (Total)" },
        ]
    },
    {
        id: 2,
        titulo: "Beca Familia",
        resumen: "Excención total del pago de colegiatura",
        monto: "100% de descuento",
        pdfURL: "../assets/becaspdf/Familiar.pdf",
        gradiente: "linear-gradient(135deg, #16a34a 0%, #15803d 50%, #052e16 100%)",
        imagenFrente: familialogo.src,
        activa: true

    },
    {
        id: 3,
        titulo: "Beca Compañeros",
        resumen: "Excención total de colegiatura por cuatrimestre, elegible por votación grupal",
        monto: "100% de descuento",
        pdfURL: "../assets/becaspdf/Companeros.pdf",
        gradiente: "linear-gradient(135deg, #16a34a 0%, #15803d 50%, #052e16 100%)",
        imagenFrente: companerologo.src,
        activa: true

    },

    {
        id: 4,
        titulo: "Beca Deportiva y Cultural",
        resumen: "Apoyo de condonación a la colegiatura por Perfil",
        monto: "Hasta 100% de descuento",
        pdfURL: "../assets/becaspdf/Deportiva.pdf",
        gradiente: "linear-gradient(135deg, #16a34a 0%, #15803d 50%, #052e16 100%)",
        imagenFrente: deportivalogo.src,
        activa: true,
        // Desglosamos la info de la beca fea en un array limpio
        detalles: [
            { label: "Artística Cultural", value: "50%" },
            { label: "Seleccionado UT", value: "50%" },
            { label: "Seleccionado Nacional ", value: "100%" },
        ]

    }
];