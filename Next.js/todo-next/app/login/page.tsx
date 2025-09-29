    'use client';
    import React, { useEffect } from 'react';
    import { useForm } from 'react-hook-form';
    import { useRouter } from 'next/navigation';
    import { useAuth } from '../../context/AuthContext';

    type Form = { username: string; password: string };

    export default function LoginPage(): JSX.Element {
    const router = useRouter();
    const { user, login } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<Form>();

    useEffect(() => {
        if (user) router.replace('/');
    }, [user, router]);

    const onSubmit = (data: Form) => {
        login({ id: `user-${Date.now()}`, username: data.username, token: 'simulated-token' });
        router.replace('/');
    };

    if (user) return <div>Redirecting...</div>;

    return (
        <section style={{ maxWidth: 400, margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: 8 }}>
        <h1>🔐 Login (Simulated)</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
            <div className="form-group">
            <label>Username</label>
            <input type="text" {...register('username', { required: 'Enter any username' })} className={`form-control ${errors.username ? 'is-invalid' : ''}`} placeholder="Enter any username" />
            {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
            </div>

            <div className="form-group mt-2">
            <label>Password</label>
            <input type="password" {...register('password', { required: 'Enter any password' })} className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Enter any password" />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary mt-3 w-100">Login</button>
        </form>
        </section>
    );
    }
