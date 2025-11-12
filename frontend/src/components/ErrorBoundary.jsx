import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('React error boundary caught:', error, info);
    // Store error details so we can show a helpful message in development
    this.setState({ error, info });
  }

  render() {
    if (this.state.hasError) {
      // In development show details to help debugging. In production keep generic message.
      if (process.env.NODE_ENV !== 'production') {
        return (
          <div style={{ padding: 20 }}>
            <h2>Something went wrong. Please refresh.</h2>
            <h3 style={{ marginTop: 12 }}>Error:</h3>
            <pre style={{ whiteSpace: 'pre-wrap', background: '#111', color: '#fff', padding: 12, borderRadius: 6 }}>{String(this.state.error && this.state.error.toString())}</pre>
            <h3 style={{ marginTop: 12 }}>Component Stack:</h3>
            <pre style={{ whiteSpace: 'pre-wrap', background: '#111', color: '#fff', padding: 12, borderRadius: 6 }}>{this.state.info?.componentStack}</pre>
          </div>
        );
      }
      return <h2>Something went wrong. Please refresh.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;


