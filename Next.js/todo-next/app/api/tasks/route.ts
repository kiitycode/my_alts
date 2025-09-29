    // app/api/tasks/route.ts
    import { NextResponse } from 'next/server';
    import type { Todo } from '../../../types/todo';

    const globalKey = '__TODO_STORE__';
    const store: Todo[] = ((globalThis as any)[globalKey] ||= []);

    export async function GET() {
    return NextResponse.json(store);
    }

    export async function POST(req: Request) {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: 'invalid body' }, { status: 400 });

    const item: Todo = {
        id: Date.now().toString(),
        name: body.name ?? body.text ?? 'Untitled',
        description: body.description ?? '',
        status: body.status ?? 'TODO',
        priority: body.priority ?? 'LOW',
        owner: body.owner ?? body.user_id ?? null,
        isTemp: false,
    };

    store.push(item);
    return NextResponse.json(item, { status: 201 });
    }
