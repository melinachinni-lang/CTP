
  import React from "react";
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { error: Error | null }
  > {
    constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { error: null };
    }
    static getDerivedStateFromError(error: Error) {
      return { error };
    }
    render() {
      if (this.state.error) {
        return (
          <div style={{ padding: 32, fontFamily: 'monospace', color: '#b91c1c', background: '#fef2f2', minHeight: '100vh' }}>
            <h2 style={{ marginBottom: 16 }}>⚠ Error de renderizado</h2>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {this.state.error.message}
              {'\n\n'}
              {this.state.error.stack}
            </pre>
          </div>
        );
      }
      return this.props.children;
    }
  }

  createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
