    // components/Header.tsx
    'use client';
    import React from 'react';
    import Link from 'next/link';
    import { usePathname, useRouter } from 'next/navigation';
    import { useAuth } from '@/context/AuthContext';

    export default function Header(): React.ReactElement {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    return (
        <header className="max-w-[960px] w-full mx-auto">
        <div className="flex-between">
            <Link href="/" className="text-2xl font-bold" aria-label="Home">
            <span style={{ color: 'var(--accent)' }}>Todo</span> App
            </Link>
            <div className="flex gap-2">
            {pathname !== '/create' && (
                <Link href="/create" className="btn">+ New Task</Link>
            )}
            {user ? (
                <button
                className="btn"
                onClick={() => { logout(); router.push('/login'); }}
                >
                Logout
                </button>
            ) : (
                <Link href="/login" className="btn">Login</Link>
            )}
            </div>
        </div>
        </header>
    );
    }
