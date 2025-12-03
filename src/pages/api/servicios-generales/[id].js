import connectDB from '../../../DB/conect.js';
import ServicioGeneral from '../../../DB/models/ServicioGeneral.js';

async function parseBody(request) {
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return await request.json();
  }
  const form = await request.formData();
  return Object.fromEntries(form);
}

export async function GET({ params }) {
  await connectDB();
  const { id } = params;
  const item = await ServicioGeneral.findById(id).lean();
  if (!item) {
    return new Response(JSON.stringify({ error: 'No encontrado' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(JSON.stringify(item), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PATCH({ params, request }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await parseBody(request);

    const item = await ServicioGeneral.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!item) {
      return new Response(JSON.stringify({ error: 'No encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(item), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error updating servicios-generales item', err);
    return new Response(JSON.stringify({ error: 'Error al actualizar' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE({ params }) {
  try {
    await connectDB();
    const { id } = params;
    const res = await ServicioGeneral.findByIdAndDelete(id).lean();
    if (!res) {
      return new Response(JSON.stringify({ error: 'No encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error('Error deleting servicios-generales item', err);
    return new Response(JSON.stringify({ error: 'Error al eliminar' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
