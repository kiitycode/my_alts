    'use client';
    import React, { useEffect, useState } from 'react';

    export default function ClientOnly({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return fallback as React.ReactNode;
    return <>{children}</>;
    }
