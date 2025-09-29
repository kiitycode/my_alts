    'use client';
    import React, { useEffect, useState } from 'react';
    import { useParams, useRouter } from 'next/navigation';
    import { useAuth } from '../../../context/AuthContext';
    import { fetchTaskById, updateTask, deleteTask } from '../../../services/api';
    import type { Todo } from '../../../types/todo';

    export default function TaskDetailsPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const router = useRouter();
    const [task, setTask] = useState<Todo | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState<Partial<Todo>>({});

    useEffect(() => {
        if (!user) {
        router.replace('/login');
        return;
        }
        if (!id) return;

        (async () => {
        try {
            const data = await fetchTaskById(id);
            setTask(data);
            setForm({
            name: data.name,
            description: data.description,
            status: data.status,
            priority: data.priority,
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        })();
    }, [id, user, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        if (!task) return;
        try {
        const updated = await updateTask(task.id, form, user!.id as any);
        setTask(updated);
        setEditing(false);
        } catch (err) {
        console.error('Failed to update task', err);
        alert('Failed to update task');
        }
    };

    const handleDelete = async () => {
        if (!task) return;
        if (!confirm('Are you sure you want to delete this task?')) return;
        try {
        await deleteTask(task.id);
        router.push('/');
        } catch (err) {
        console.error('Failed to delete task', err);
        alert('Failed to delete task');
        }
    };

    if (!user) return <div className="p-8">Redirecting...</div>;
    if (loading) return <div className="p-8">Loading...</div>;
    if (!task) return <div className="p-8">Task not found</div>;

    return (
        <main className="max-w-2xl mx-auto p-6">
        {editing ? (
            <div className="space-y-3">
            <input
                name="name"
                value={form.name || ''}
                onChange={handleChange}
                className="form-control"
                placeholder="Task Name"
            />
            <textarea
                name="description"
                value={form.description || ''}
                onChange={handleChange}
                className="form-control"
                placeholder="Description"
            />
            <select name="status" value={form.status || ''} onChange={handleChange} className="form-control">
                <option value="">-- Select Status --</option>
                <option value="TODO">📝 TODO</option>
                <option value="IN_PROGRESS">🚧 In Progress</option>
                <option value="DONE">✅ Done</option>
                <option value="CANCELLED">❌ Cancelled</option>
            </select>
            <select name="priority" value={form.priority || ''} onChange={handleChange} className="form-control">
                <option value="">-- Select Priority --</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
            </select>
            <div className="flex gap-3">
                <button onClick={handleSave} className="btn">💾 Save</button>
                <button onClick={() => setEditing(false)} className="btn">Cancel</button>
            </div>
            </div>
        ) : (
            <>
            <h1 className="text-2xl font-bold mb-2">{task.name}</h1>
            <p className="mb-1"><strong>Status:</strong> {task.status}</p>
            <p className="mb-1"><strong>Priority:</strong> {task.priority}</p>
            {task.description && <p className="mb-4"><strong>Description:</strong> {task.description}</p>}

            <div className="flex gap-3">
                <button onClick={() => setEditing(true)} className="btn">✏️ Edit</button>
                <button onClick={handleDelete} className="btn text-red-600 border-red-600">🗑 Delete</button>
                <button onClick={() => router.push('/')} className="btn">⬅ Back</button>
            </div>
            </>
        )}
        </main>
    );
    }
