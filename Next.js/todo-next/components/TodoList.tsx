    'use client';

    import React from 'react';
    import Link from 'next/link';
    import type { Todo } from '../types/todo';

    interface Props {
    todos: Todo[];
    }

    export default function TodoList({ todos }: Props) {
    if (!todos || todos.length === 0) {
        return <p className="text-gray-500">No tasks yet.</p>;
    }

    return (
        <ul className="space-y-2">
        {todos.map((todo) => (
            <li key={todo.id} className="border p-3 rounded hover:bg-gray-50">
            <Link href={`/todos/${todo.id}`}>
                <span className={todo.completed ? 'line-through text-gray-400' : ''}>
                {todo.title}
                </span>
            </Link>
            </li>
        ))}
        </ul>
    );
    }
