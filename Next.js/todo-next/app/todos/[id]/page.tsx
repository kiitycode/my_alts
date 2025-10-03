    'use client';

    import React, { useEffect, useState } from 'react';
    import Link from 'next/link';
    import { useParams, useRouter } from 'next/navigation';
    import { fetchTaskById, deleteTask } from '../../../services/api';
    import type { Todo } from '../../../types/todo';

    export default function TaskDetailsPage(): React.ReactElement {
    const router = useRouter();
    const params = useParams();
    const rawId = params?.id as string | string[] | undefined;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;

    const [task, setTask] = useState<Todo | null>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        let mounted = true;
        (async () => {
        try {
            if (!id) return;
            const t = await fetchTaskById(id);
            if (mounted) setTask(t);
        } catch (e) {
            if (mounted) setErr(e instanceof Error ? e.message : 'Failed to load');
        } finally {
            if (mounted) setLoading(false);
        }
        })();
        return () => { mounted = false; };
    }, [id]);

    async function handleDelete() {
        if (!id) return;
        if (!window.confirm('Delete this task?')) return;
        try {
        setDeleting(true);
        await deleteTask(id);
        router.push('/');
        } catch (e) {
        alert(e instanceof Error ? e.message : 'Delete failed');
        } finally {
        setDeleting(false);
        }
    }

    if (!id) return <div className="text-center">Missing id</div>;
    if (loading) return <div className="spinner" />;
    if (err) return <div className="text-danger">{err}</div>;
    if (!task) return <div className="text-center">Not found</div>;

    return (
        <>
        <h1>Task Details</h1>
        <div className="card">
            <div className="font-semibold text-lg mb-1">{task.name}</div>
            <div className="text-sm mb-3" style={{ opacity: 0.85 }}>
            {task.status} • {task.priority}
            </div>
            <p className="mb-3 whitespace-pre-wrap">{task.description}</p>

            <div className="flex gap-2">
            <Link href={`/todos/${task.id}/edit`} className="btn">Edit</Link>
            <button
                onClick={handleDelete}
                disabled={deleting}
                className="btn"
                style={{ backgroundColor: 'var(--danger)', color: '#fff' }}
            >
                {deleting ? 'Deleting…' : 'Delete'}
            </button>
            <button onClick={() => router.back()} className="btn">Back</button>
            </div>
        </div>
        </>
    );
    }
