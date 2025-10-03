    // components/ErrorBoundary.tsx
    'use client';
    import React from 'react';

    type Props = { children: React.ReactNode };
    type State = { hasError: boolean; error?: Error };

    export default class ErrorBoundary extends React.Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    // removed eslint-disable; typed args to avoid `{}` usage
    componentDidCatch(_error: Error, _info: React.ErrorInfo) {
        // hook for logging if needed
    }

    render() {
        if (this.state.hasError) {
        return (
            <div className="p-6 border rounded bg-red-50 text-red-700">
            <h2 className="font-semibold mb-2">Something went wrong.</h2>
            <pre className="text-xs overflow-auto">{this.state.error?.message}</pre>
            </div>
        );
        }
        return this.props.children;
    }
    }
