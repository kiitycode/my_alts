    'use client';

    import React, { useEffect, useState } from 'react';
    import { useParams, useRouter } from 'next/navigation';
    import { fetchTaskById, updateTask } from '../../../../services/api';
    import { useAuth } from '../../../../context/AuthContext';
    import type { Todo } from '../../../../types/todo';

    export default function EditTodoPage(): React.ReactElement {
    const params = useParams<{ id: string }>();
    const id = params?.id;
    const router = useRouter();
    const { user } = useAuth();

    const [todo, setTodo] = useState<Todo | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        let mounted = true;
        (async () => {
        if (!id) return;
        try {
            const data = await fetchTaskById(id);
            if (!mounted) return;
            setTodo(data);
            setTitle(data.name ?? '');
            setDescription(data.description ?? '');
        } catch {
            router.replace('/todos');
        }
        })();
        return () => { mounted = false; };
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!todo) return;
        setSaving(true);
        try {
        await updateTask(String(todo.id), { name: title, description }, user?.id);
        router.push(`/todos/${todo.id}`);
        } finally {
        setSaving(false);
        }
    };

    if (!todo) return <div className="spinner" />;

    return (
        <>
        <h1>Edit Todo</h1>
        <form onSubmit={handleSubmit} className="card">
            <div className="form-group">
            <label>Title</label>
            <input
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
            </div>
            <div className="form-group">
            <label>Description</label>
            <textarea
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            />
            </div>
            <div className="flex gap-2">
            <button type="submit" className="btn" disabled={saving}>
                {saving ? 'Saving…' : 'Save'}
            </button>
            <button type="button" className="btn" onClick={() => router.back()}>
                Cancel
            </button>
            </div>
        </form>
        </>
    );
    }
