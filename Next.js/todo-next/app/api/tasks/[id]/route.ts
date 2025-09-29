    // app/api/tasks/[id]/route.ts
    import { NextResponse } from 'next/server';
    import type { Todo } from '../../../../types/todo';

    const globalKey = '__TODO_STORE__';
    const store: Todo[] = ((globalThis as any)[globalKey] ||= []);

    export async function GET(_req: Request, { params }: { params: { id: string } }) {
    const item = store.find((t) => String(t.id) === params.id);
    if (!item) return NextResponse.json({ error: 'not found' }, { status: 404 });
    return NextResponse.json(item);
    }

    export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: 'invalid body' }, { status: 400 });
    const idx = store.findIndex((t) => String(t.id) === params.id);
    if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 });
    store[idx] = { ...store[idx], ...body };
    return NextResponse.json(store[idx]);
    }

    export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    const idx = store.findIndex((t) => String(t.id) === params.id);
    if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 });
    store.splice(idx, 1);
    return NextResponse.json({ ok: true });
    }
