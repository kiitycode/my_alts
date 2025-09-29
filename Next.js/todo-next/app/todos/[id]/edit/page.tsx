    'use client';
    import React, { useEffect, useState } from 'react';
    import { useParams, useRouter } from 'next/navigation';
    import { fetchTaskById, updateTask } from '@/services/api';
    import { useAuth } from '@/context/AuthContext';
    import type { Todo } from '@/types/todo';

    export default function EditTodoPage(): JSX.Element {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [todo, setTodo] = useState<Todo | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function load() {
        if (!id) return;
        try {
            const data = await fetchTaskById(id);
            setTodo(data);
            setTitle(data.title ?? data.name ?? data.text ?? '');
            setDescription(data.description ?? '');
        } catch (e) {
            router.replace('/todos');
        }
        }
        load();
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!todo) return;
        setSaving(true);
        try {
        await updateTask(todo.id, { title, description }, user?.id);
        router.push(`/todos/${todo.id}`);
        } catch (err) {
        console.error(err);
        alert('Update failed.');
        } finally {
        setSaving(false);
        }
    };

    if (!todo) return <div className="spinner" />;

    return (
        <section>
        <h2 className="text-2xl mb-4">Edit Todo</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" />
            <div className="flex gap-3">
            <button type="submit" className="btn" disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
            </button>
            <button type="button" className="btn" onClick={() => router.back()}>
                Cancel
            </button>
            </div>
        </form>
        </section>
    );
    }
