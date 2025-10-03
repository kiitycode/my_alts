    // components/Footer.tsx
    import React from 'react';

    export default function Footer(): React.ReactElement {
    return (
        <footer className="mt-8">
        <div className="max-w-[960px] w-full mx-auto text-center text-sm" style={{ color: 'var(--text-color)' }}>
            © {new Date().getFullYear()} Todo App Next.js
        </div>
        </footer>
    );
    }
