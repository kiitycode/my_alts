// app/api/tasks/[id]/route.ts
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

type Params = { id: string };
type UpdatePayload = Partial<Pick<Todo, 'name' | 'description' | 'status' | 'priority'>>;

function coerceUpdatePayload(u: unknown): UpdatePayload {
  const o = typeof u === 'object' && u !== null ? (u as Record<string, unknown>) : {};
  const out: UpdatePayload = {};
  if (typeof o.name === 'string') out.name = o.name;
  if (typeof o.description === 'string') out.description = o.description;
  if (typeof o.status === 'string') out.status = o.status as Todo['status'];
  if (typeof o.priority === 'string') out.priority = o.priority as Todo['priority'];
  return out;
}

export async function GET(_req: NextRequest, ctx: { params: Promise<Params> }) {
  const { id } = await ctx.params;
  const todo = store.find(t => String(t.id) === id);
  if (!todo) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(todo);
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<Params> }) {
  const { id } = await ctx.params;
  const idx = store.findIndex(t => String(t.id) === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const updates = coerceUpdatePayload(await req.json());
  store[idx] = { ...store[idx], ...updates, updatedAt: new Date().toISOString() };
  return NextResponse.json(store[idx]);
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<Params> }) {
  const { id } = await ctx.params;
  const idx = store.findIndex(t => String(t.id) === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const [deleted] = store.splice(idx, 1);
  return NextResponse.json(deleted);
}
