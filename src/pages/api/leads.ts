// @ts-nocheck
import dbConnect from '../../lib/dbConnect';
import Lead from '../../models/Lead';

export async function GET() {
  try {
    await dbConnect();
    const items = await Lead.find({}).sort({ createdAt: -1 }).lean();
    return new Response(JSON.stringify({ success: true, data: items }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('GET /api/leads', err);
    return new Response(JSON.stringify({ success: false, error: 'Error al obtener leads' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST({ request }) {
  try {
    await dbConnect();
    const body = await request.json();
    const { email, source } = body || {};
    if (!email) {
      return new Response(JSON.stringify({ success: false, error: 'Email requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const doc = await Lead.create({ email, source });
    return new Response(JSON.stringify({ success: true, data: doc }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('POST /api/leads', err);
    return new Response(JSON.stringify({ success: false, error: 'Error al crear lead' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

const ALLOWED = ['GET', 'POST'];
export async function ALL({ request }) {
  const m = request.method;
  if (!ALLOWED.includes(m)) {
    return new Response(JSON.stringify({ success: false, error: 'Método no permitido' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Allow': ALLOWED.join(', ') },
    });
  }
  if (m === 'GET') return GET({ request });
  if (m === 'POST') return POST({ request });
}
