    import React from 'react';
    import Link from 'next/link';

    export default function NotFound() {
    return (
        <section className="text-center">
        <h1>404</h1>
        <p>Oops! Page not found.</p>
        <Link href="/" className="btn mt-2">Back to Home</Link>
        </section>
    );
    }
