import React from "react";

type ErrorBoundaryState = { hasError: boolean };

export class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, info);
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
