import connectDB from '../../DB/conect.js';
import ServicioGeneral from '../../DB/models/ServicioGeneral.js';

async function parseBody(request) {
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return await request.json();
  }
  const form = await request.formData();
  return Object.fromEntries(form);
}

export async function GET() {
  await connectDB();
  const items = await ServicioGeneral.find().sort({ createdAt: -1 }).lean();
  return new Response(JSON.stringify(items), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST({ request }) {
  try {
    await connectDB();
    const body = await parseBody(request);

    const doc = await ServicioGeneral.create({
      name: body.name || '',
      role: body.role || '',
      location: body.location || '',
      requestType: body.requestType || '',
      description: body.description || '',
    });

    const accept = request.headers.get('accept') || '';
    if (accept.includes('application/json')) {
      return new Response(JSON.stringify(doc), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(null, {
      status: 303,
      headers: { Location: '/servicios-generales?success=1' },
    });
  } catch (err) {
    console.error('Error creating servicios-generales item', err);
    return new Response(JSON.stringify({ error: 'Error al enviar la solicitud' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
