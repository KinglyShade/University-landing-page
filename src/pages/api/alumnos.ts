// @ts-nocheck
export const prerender = false; // Renderizado en servidor (SSR) obligatorio para APIs

// ---------------------------------------------------------
// 1. IMPORTACIONES CORREGIDAS (Rutas relativas exactas)
// ---------------------------------------------------------
import { connectDB } from "../../DB/conect"; // Sube 2 niveles -> entra a DB -> archivo conect
import Alumno from "../../models/Alumno";    // Sube 2 niveles -> entra a models -> archivo Alumno

// ---------------------------------------------------------
// 2. ENDPOINTS (GET, POST, DELETE)
// ---------------------------------------------------------

export const GET = async () => {
    try {
        console.log("--> API: Iniciando GET /alumnos");

        // Conexión
        await connectDB();
        console.log("--> API: Conectado a Mongo. Buscando alumnos...");

        // Consulta (Ordenados por fecha de creación descendente)
        const alumnos = await Alumno.find({}).sort({ createdAt: -1 });

        return new Response(JSON.stringify({
            success: true,
            data: alumnos
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("--> API ERROR en GET:", error);
        return new Response(JSON.stringify({
            success: false,
            error: 'Error al obtener los alumnos',
            details: error instanceof Error ? error.message : String(error)
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};

export const POST = async ({ request }) => {
    try {
        await connectDB();
        const data = await request.json();

        // Validación básica de campos requeridos por tu Schema
        if (!data.nombre || !data.matricula || data.calificacion === undefined) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Faltan campos requeridos (nombre, matricula, calificacion)'
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const alumno = await Alumno.create(data);

        return new Response(JSON.stringify({
            success: true,
            data: alumno
        }), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("--> API ERROR en POST:", error);

        // Manejo de error de llave duplicada (Matrícula única)
        if (error.code === 11000) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Ya existe un alumno con esta matrícula'
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify({
            success: false,
            error: 'Error al crear el alumno'
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};

export const DELETE = async ({ request }) => {
    try {
        await connectDB();
        const { id } = await request.json();

        if (!id) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Se requiere el ID del alumno'
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const alumno = await Alumno.findByIdAndDelete(id);

        if (!alumno) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Alumno no encontrado'
            }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify({
            success: true,
            data: {}
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("--> API ERROR en DELETE:", error);
        return new Response(JSON.stringify({
            success: false,
            error: 'Error al eliminar el alumno'
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};