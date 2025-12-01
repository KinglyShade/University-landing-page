// @ts-nocheck
import { getCollection } from 'astro:content';
import dbConnect from '../../lib/dbConnect';
import Alumno from '../../models/Alumno';

export async function GET() {
    try {
        await dbConnect();
        const alumnos = await Alumno.find({}).sort({ createdAt: -1 });
        return new Response(
            JSON.stringify({ success: true, data: alumnos }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: 'Error al obtener los alumnos' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}

export async function POST({ request }) {
    try {
        await dbConnect();
        const data = await request.json();

        // Validación básica
        if (!data.nombre || !data.matricula || data.calificacion === undefined) {
            return new Response(
                JSON.stringify({ success: false, error: 'Faltan campos requeridos' }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }

        const alumno = await Alumno.create(data);
        return new Response(
            JSON.stringify({ success: true, data: alumno }),
            {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            return new Response(
                JSON.stringify({ success: false, error: 'Ya existe un alumno con esta matrícula' }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }
        return new Response(
            JSON.stringify({ success: false, error: 'Error al crear el alumno' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}

export async function DELETE({ request }) {
    try {
        await dbConnect();
        const { id } = await request.json();

        if (!id) {
            return new Response(
                JSON.stringify({ success: false, error: 'Se requiere el ID del alumno' }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }

        const alumno = await Alumno.findByIdAndDelete(id);

        if (!alumno) {
            return new Response(
                JSON.stringify({ success: false, error: 'Alumno no encontrado' }),
                {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }

        return new Response(
            JSON.stringify({ success: true, data: {} }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: 'Error al eliminar el alumno' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}

// Handle all methods
const ALLOWED_METHODS = ['GET', 'POST', 'DELETE'];

export async function ALL({ request }) {
    const method = request.method;

    if (!ALLOWED_METHODS.includes(method)) {
        return new Response(
            JSON.stringify({ success: false, error: 'Método no permitido' }),
            {
                status: 405,
                headers: {
                    'Content-Type': 'application/json',
                    'Allow': ALLOWED_METHODS.join(', '),
                },
            }
        );
    }

    switch (method) {
        case 'GET':
            return GET({ request });
        case 'POST':
            return POST({ request });
        case 'DELETE':
            return DELETE({ request });
        default:
            return new Response(
                JSON.stringify({ success: false, error: 'Método no implementado' }),
                {
                    status: 501,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
    }
}
