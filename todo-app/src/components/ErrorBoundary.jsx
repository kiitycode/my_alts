import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
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
