    'use client';

    import React from 'react';
    import Link from 'next/link';
    import type { Todo } from '../types/todo';

    type Props = { todos: Todo[] };

    function getTitle(t: Todo | Record<string, unknown>): string {
    if ('title' in t && typeof (t as { title?: unknown }).title === 'string') return (t as { title: string }).title;
    if ('name' in t && typeof (t as { name?: unknown }).name === 'string') return (t as { name: string }).name;
    return '';
    }

    function isDone(t: Todo | Record<string, unknown>): boolean {
    if ('completed' in t && typeof (t as { completed?: unknown }).completed === 'boolean') return (t as { completed: boolean }).completed;
    if ('status' in t && typeof (t as { status?: unknown }).status === 'string') return (t as { status: string }).status === 'DONE';
    return false;
    }

    export default function TodoList({ todos }: Props): React.ReactElement {
    if (!todos?.length) return <div className="text-center">No tasks yet.</div>;

    return (
        <ul className="grid gap-3">
        {todos.map((t) => {
            const title = getTitle(t);
            const done = isDone(t);
            return (
            <li key={String(t.id)} className="card">
                <div className="flex-between">
                <span className={done ? 'line-through text-gray-400' : ''}>{title}</span>
                <Link href={`/todos/${t.id}`} className="btn">View</Link>
                </div>
            </li>
            );
        })}
        </ul>
    );
    }
