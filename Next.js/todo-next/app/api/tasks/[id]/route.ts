    // app/api/tasks/[id]/route.ts
    import { NextResponse, type NextRequest } from 'next/server';
    import type { Todo } from '@/types/todo';

    export const runtime = 'nodejs';
    export const dynamic = 'force-dynamic';
    export const preferredRegion = 'iad1';

    const key = '__TODO_STORE__';
    const store: Todo[] = ((globalThis as any)[key] ||= []);

    type Params = { id: string };

    export async function GET(_req: NextRequest, { params }: { params: Promise<Params> }) {
    const { id } = await params;
    const todo = store.find(t => String(t.id) === id);
    if (!todo) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(todo);
    }

    export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
    const { id } = await params;
    const body = (await req.json()) as Partial<Todo>;
    const idx = store.findIndex(t => String(t.id) === id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    store[idx] = { ...store[idx], ...body, updatedAt: new Date().toISOString() } as Todo;
    return NextResponse.json(store[idx]);
    }

    export async function DELETE(_req: NextRequest, { params }: { params: Promise<Params> }) {
    const { id } = await params;
    const idx = store.findIndex(t => String(t.id) === id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const [deleted] = store.splice(idx, 1);
    return NextResponse.json(deleted);
    }
