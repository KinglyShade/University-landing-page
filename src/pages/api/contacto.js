import connectDB from '../../DB/conect.js';
import ContactMessage from '../../DB/models/Contact.js';

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
  const items = await ContactMessage.find().sort({ createdAt: -1 }).lean();
  return new Response(JSON.stringify(items), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST({ request }) {
  try {
    await connectDB();
    const body = await parseBody(request);

    const doc = await ContactMessage.create({
      name: body.name || '',
      email: body.email || '',
      subject: body.subject || '',
      message: body.message || '',
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
      headers: { Location: '/contacto?success=1' },
    });
  } catch (err) {
    console.error('Error creating contact message', err);
    return new Response(JSON.stringify({ error: 'Error al enviar el mensaje' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
