// @ts-nocheck
import dbConnect from '../../lib/dbConnect';
import Docente from '../../models/Docente';

export async function GET() {
  try {
    await dbConnect();
    const docentes = await Docente.find({}).sort({ createdAt: -1 });
    return new Response(JSON.stringify({ success: true, data: docentes }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('GET /api/docentes', error);
    return new Response(JSON.stringify({ success: false, error: 'Error al obtener los docentes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST({ request }) {
  try {
    await dbConnect();
    const data = await request.json();

    if (!data.name || !data.employeeNumber) {
      return new Response(JSON.stringify({ success: false, error: 'Faltan campos requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const docente = await Docente.create({
      name: data.name,
      employeeNumber: data.employeeNumber,
      department: data.department || '',
      email: data.email || '',
    });

    return new Response(JSON.stringify({ success: true, data: docente }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('POST /api/docentes', error);
    if (error.code === 11000) {
      return new Response(JSON.stringify({ success: false, error: 'Número de empleado duplicado' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ success: false, error: 'Error al crear docente' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE({ request }) {
  try {
    await dbConnect();
    const { id } = await request.json();
    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'Se requiere el ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const del = await Docente.findByIdAndDelete(id);
    if (!del) {
      return new Response(JSON.stringify({ success: false, error: 'Docente no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ success: true, data: {} }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('DELETE /api/docentes', error);
    return new Response(JSON.stringify({ success: false, error: 'Error al eliminar' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

const ALLOWED = ['GET', 'POST', 'DELETE'];
export async function ALL({ request }) {
  const method = request.method;
  if (!ALLOWED.includes(method)) {
    return new Response(JSON.stringify({ success: false, error: 'Método no permitido' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Allow': ALLOWED.join(', ') },
    });
  }
  switch (method) {
    case 'GET':
      return GET({ request });
    case 'POST':
      return POST({ request });
    case 'DELETE':
      return DELETE({ request });
    default:
      return new Response(JSON.stringify({ success: false, error: 'Método no implementado' }), {
        status: 501,
        headers: { 'Content-Type': 'application/json' },
      });
  }
}
