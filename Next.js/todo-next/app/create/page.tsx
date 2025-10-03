    'use client';

    import React from 'react';
    import { useForm, type SubmitHandler } from 'react-hook-form';
    import { useRouter } from 'next/navigation';
    import { createTask } from '../../services/api';
    import { useAuth } from '../../context/AuthContext';
    import type { Todo } from '../../types/todo';

    type FormValues = { name: string; description: string; status: Todo['status']; priority: Todo['priority'] };

    export default function CreateTaskPage(): React.ReactElement {
    const { user } = useAuth();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } =
        useForm<FormValues>({ defaultValues: { name: '', description: '', status: 'TODO', priority: 'Low' } });

    const [err, setErr] = React.useState<string | null>(null);

    if (!user) return <div className="p-6 text-center">Redirecting…</div>;

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setErr(null);
        try {
        await createTask(data, user.id as string | number);
        reset();
        router.push('/?r=1');
        } catch (e) {
        setErr((e as Error).message);
        }
    };

    return (
        <>
        <h1>Create Task</h1>
        {err && <div className="text-danger mb-2">{err}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="card">
            <div className="form-group">
            <label>Name</label>
            <input placeholder="Name" {...register('name', { required: 'Name is required' })} />
            {errors.name && <div className="text-danger">{errors.name.message}</div>}
            </div>

            <div className="form-group">
            <label>Description</label>
            <textarea placeholder="Description" {...register('description')} />
            </div>

            <div className="flex-between">
            <select {...register('status')}>
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="DONE">DONE</option>
            </select>
            <select {...register('priority')}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button type="submit" disabled={isSubmitting} className="btn">
                {isSubmitting ? 'Saving…' : 'Create'}
            </button>
            </div>
        </form>
        </>
    );
    }
