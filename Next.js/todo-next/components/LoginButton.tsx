    'use client';
    import React from 'react';
    import { useRouter } from 'next/navigation';
    import { useAuth } from '../context/AuthContext';

    export default function LogoutButton(): JSX.Element {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <button onClick={handleLogout} className="btn logout-btn">
        Logout
        </button>
    );
    }
