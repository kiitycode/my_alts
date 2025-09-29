    'use client';
    import React from 'react';
    import { useForm } from 'react-hook-form';
    import { useRouter } from 'next/navigation';
    import { createTask } from '../../services/api';
    import { useAuth } from '../../context/AuthContext';
    import type { Todo } from '../../types/todo';

    type FormValues = {
    name: string;
    status: string;
    priority: string;
    description?: string;
    };

    export default function CreateTaskPage(): JSX.Element {
    const { user } = useAuth();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>();

    React.useEffect(() => {
        if (!user) router.replace('/login');
    }, [user, router]);

    const onSubmit = async (data: FormValues) => {
        try {
        const created = await createTask(
            {
            name: data.name,
            status: data.status,
            priority: data.priority,
            description: data.description || ''
            } as Partial<Todo>,
            user!.id as any
        );

        if ((created as any).isTemp) {
            alert('Saved locally. Will sync when network/API is available.');
        }

        reset();

        // Route back to Home page and refresh it to show the new task
        router.push('/');
        router.refresh(); // triggers a refresh so Home re-fetches tasks
        } catch (err: any) {
        alert(`Failed to create task: ${err?.message || err}`);
        console.error('Creation error:', err);
        }
    };

    return (
        <section>
        <h1>Create Task</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
            <div className="mb-1">
            <label htmlFor="name">Name</label><br />
            <input
                id="name"
                {...register('name', { required: 'Task name is required' })}
                placeholder="e.g. Buy groceries"
                className="form-control"
            />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </div>

            <div className="mb-1">
            <label htmlFor="description">Description</label><br />
            <textarea
                id="description"
                {...register('description')}
                placeholder="Optional details..."
                className="form-control"
            />
            </div>

            <div className="mb-1">
            <label>Status</label><br />
            <select {...register('status', { required: 'Status is required' })}>
                <option value="">-- Select --</option>
                <option value="TODO">📝 TODO</option>
                <option value="IN_PROGRESS">🚧 In Progress</option>
                <option value="DONE">✅ Done</option>
                <option value="CANCELLED">❌ Cancelled</option>
            </select>
            {errors.status && <p className="text-danger">{errors.status.message}</p>}
            </div>

            <div className="mb-1">
            <label>Priority</label><br />
            <select {...register('priority', { required: 'Priority is required' })}>
                <option value="">-- Select --</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
            </select>
            {errors.priority && <p className="text-danger">{errors.priority.message}</p>}
            </div>

            <div className="flex-between mt-2">
            <button
                type="button"
                className="btn"
                onClick={() => {
                router.push('/');
                router.refresh(); // refresh Home on cancel as well
                }}
            >
                ⬅ Cancel
            </button>
            <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : '💾 Save'}
            </button>
            </div>
        </form>
        </section>
    );
    }
