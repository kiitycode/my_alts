// app/api/tasks/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import type { Todo } from '@/types/todo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Uid = string | number;
type StoredTodo = Todo & { userId?: Uid; owner?: Uid; user_id?: Uid };

const KEY = '__TODO_STORE__';
const g = globalThis as Record<string, unknown>;
const store: StoredTodo[] =
  Array.isArray(g[KEY]) ? (g[KEY] as StoredTodo[]) : ((g[KEY] = [] as StoredTodo[]), (g[KEY] as StoredTodo[]));

type CreatePayload = {
  id?: string;
  name?: string;
  description?: string;
  status?: Todo['status'];
  priority?: Todo['priority'];
  userId?: Uid;
  owner?: Uid;
  user_id?: Uid;
};

function coerceCreatePayload(u: unknown): CreatePayload {
  const o = typeof u === 'object' && u !== null ? (u as Record<string, unknown>) : {};
  const uid = (v: unknown): Uid | undefined =>
    typeof v === 'string' || typeof v === 'number' ? (v as Uid) : undefined;

  return {
    id: typeof o.id === 'string' ? o.id : undefined,
    name: typeof o.name === 'string' ? o.name : undefined,
    description: typeof o.description === 'string' ? o.description : undefined,
    status: typeof o.status === 'string' ? (o.status as Todo['status']) : undefined,
    priority: typeof o.priority === 'string' ? (o.priority as Todo['priority']) : undefined,
    userId: uid(o.userId),
    owner: uid(o.owner),
    user_id: uid(o.user_id),
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get('userId');
  if (!uid) return NextResponse.json(store);
  const filtered = store.filter(t => String(t.userId ?? t.owner ?? t.user_id) === uid);
  return NextResponse.json(filtered);
}

export async function POST(req: NextRequest) {
  const body = coerceCreatePayload(await req.json());
  if (!body.name) return NextResponse.json({ error: 'name required' }, { status: 400 });

  const todo: StoredTodo = {
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
