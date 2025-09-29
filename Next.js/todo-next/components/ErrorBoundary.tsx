    import React from 'react';

    type State = { hasError: boolean };

    export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
    constructor(props: React.PropsWithChildren<{}>) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: unknown, info: unknown) {
        // keep logging behaviour
        // eslint-disable-next-line no-console
        console.error('Error caught by boundary:', error, info);
    }

    render() {
        if (this.state.hasError) {
        return (
            <section className="text-center mt-2">
            <h2>Something went wrong 😵</h2>
            <p>Try reloading the page or checking your connection.</p>
            </section>
        );
        }
        return this.props.children;
    }
    }
