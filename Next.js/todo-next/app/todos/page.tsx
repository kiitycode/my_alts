    'use client';
    import React from 'react';
    import Link from 'next/link';
    import TodoList from '../../components/TodoList';
    import { useCachedTodos } from '../../hooks/useCachedTodos';

    export default function TodosPage(): JSX.Element {
    const { todos, loading, error } = useCachedTodos();

    return (
        <section>
        <div className="flex-between mb-4">
            <h1 className="text-2xl">Your Todos</h1>
            <Link href="/create" className="btn">+ New</Link>
        </div>

        {loading ? <div className="spinner" /> : <TodoList todos={todos} />}
        </section>
    );
    }
