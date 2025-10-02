  // app/api/tasks/route.ts
  import { NextResponse, type NextRequest } from 'next/server';
  import type { Todo } from '@/types/todo';

  export const runtime = 'nodejs';
  export const dynamic = 'force-dynamic';
  export const preferredRegion = 'iad1'; // pick one region to reduce split state

  const key = '__TODO_STORE__';
  const store: Todo[] = ((globalThis as any)[key] ||= []);

  export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get('userId');
    if (!uid) return NextResponse.json(store);
    const filtered = store.filter(t => String(t.userId ?? t.owner ?? t.user_id) === uid);
    return NextResponse.json(filtered);
  }

  export async function POST(req: NextRequest) {
    const body = (await req.json()) as any;
    if (!body?.name) return NextResponse.json({ error: 'name required' }, { status: 400 });

    const todo: Todo & { userId?: string | number; owner?: string | number; user_id?: string | number } = {
      id: body.id ?? crypto.randomUUID(),
      name: body.name,
      description: body.description ?? '',
      status: body.status ?? 'TODO',
      priority: body.priority ?? 'Low',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: body.userId,
      owner: body.owner,
      user_id: body.user_id,
    };

    store.push(todo);
    return NextResponse.json(todo, { status: 201 });
  }
