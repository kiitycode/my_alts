    'use client';

    import React from 'react';
    import { useForm, type SubmitHandler } from 'react-hook-form';
    import { useRouter } from 'next/navigation';
    import { useAuth } from '../../context/AuthContext';

    type Form = { username: string; password: string };

    export default function LoginPage(): React.ReactElement {
    const router = useRouter();
    const { user, login } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<Form>();

    React.useEffect(() => { if (user) router.replace('/'); }, [user, router]);

    const onSubmit: SubmitHandler<Form> = (data) => {
        login({ id: `user-${Date.now()}`, username: data.username, token: 'simulated-token' });
        router.replace('/');
    };

    if (user) return <div className="text-center">Redirecting...</div>;

    return (
        <>
        <h1>🔐 Login (Simulated)</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="card mt-2" style={{ maxWidth: 480, margin: '0 auto' }}>
            <div className="form-group">
            <label>Username</label>
            <input type="text" {...register('username', { required: 'Enter any username' })} />
            {errors.username && <div className="text-danger">{errors.username.message}</div>}
            </div>

            <div className="form-group">
            <label>Password</label>
            <input type="password" {...register('password', { required: 'Enter any password' })} />
            {errors.password && <div className="text-danger">{errors.password.message}</div>}
            </div>

            <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
        </form>
        </>
    );
    }
