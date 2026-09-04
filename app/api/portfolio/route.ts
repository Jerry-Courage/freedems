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
    const { name, area, title, description, link } = body;

    if (!name || !area || !title || !description) {
      return NextResponse.json({ error: 'Name, area, title, and description are required' }, { status: 400 });
    }

    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const item = { id, name, area, title, description, link: link || '', createdAt: new Date().toISOString() };

    const kv = env.FREDEMS_KV as any;
    await kv.put(`portfolio:${id}`, JSON.stringify(item));

    const index: string[] = (await kv.get('portfolio:index', { type: 'json' })) || [];
    index.push(id);
    await kv.put('portfolio:index', JSON.stringify(index));

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
    const index: string[] = (await kv.get('portfolio:index', { type: 'json' })) || [];
    const items = [];
    for (const id of index) {
      const item = await kv.get(`portfolio:${id}`, { type: 'json' });
      if (item) items.push(item);
    }
    items.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json(items);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}
