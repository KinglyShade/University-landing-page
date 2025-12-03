import connectDB from '../../DB/conect.js';
import ServicioInformatica from '../../DB/models/ServicioInformatica.js';

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
  const items = await ServicioInformatica.find().sort({ createdAt: -1 }).lean();
  return new Response(JSON.stringify(items), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST({ request }) {
  try {
    await connectDB();
    const body = await parseBody(request);

    const doc = await ServicioInformatica.create({
      name: body.name || '',
      email: body.email || '',
      problemType: body.problemType || '',
      location: body.location || '',
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
      headers: { Location: '/servicios-informaticos?success=1' },
    });
  } catch (err) {
    console.error('Error creating servicios-informaticos item', err);
    return new Response(JSON.stringify({ error: 'Error al enviar el reporte' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
