import { NextRequest, NextResponse } from 'next/server';
import { env } from 'cloudflare:workers';

const AUTH = 'Basic ZnJlZGVtczoyMDI0';

function checkAuth(request: NextRequest) {
  const auth = request.headers.get('authorization');
  return auth === AUTH;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, area, message } = body;

    if (!name || !email || !area || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const submission = { id, name, email, area, message, createdAt: new Date().toISOString() };

    const kv = env.FREDEMS_KV as any;
    await kv.put(`submission:${id}`, JSON.stringify(submission));

    const index: string[] = (await kv.get('submission:index', { type: 'json' })) || [];
    index.push(id);
    await kv.put('submission:index', JSON.stringify(index));

    return NextResponse.json({ success: true, id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const kv = env.FREDEMS_KV as any;
    const index: string[] = (await kv.get('submission:index', { type: 'json' })) || [];
    const submissions = [];
    for (const id of index) {
      const item = await kv.get(`submission:${id}`, { type: 'json' });
      if (item) submissions.push(item);
    }
    submissions.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json(submissions);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}
