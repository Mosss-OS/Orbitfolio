import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 bg-card rounded-lg border">
          <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

interface FallbackProps {
  error: Error;
  resetError: () => void;
}

export function WebGLFallback({ error, resetError }: FallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-card rounded-lg border">
      <div className="text-4xl mb-4">📊</div>
      <h3 className="text-lg font-semibold mb-2">3D View Unavailable</h3>
      <p className="text-sm text-muted-foreground text-center mb-4">
        Your browser doesn't support WebGL. Showing 2D fallback view.
      </p>
      <button
        onClick={resetError}
        className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Retry 3D View
      </button>
    </div>
  );
}

export function APIFallback({ error, resetError }: FallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-amber-500/10 rounded-lg border border-amber-500/20">
      <div className="text-4xl mb-4">🔄</div>
      <h3 className="text-lg font-semibold mb-2">API Unavailable</h3>
      <p className="text-sm text-muted-foreground text-center mb-4">
        Using demo data. Error: {error.message}
      </p>
      <button
        onClick={resetError}
        className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Retry Connection
      </button>
    </div>
  );
}

export function DemoModeBanner() {
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 text-sm rounded-lg">
      <span>📱</span>
      <span>Demo Mode - Using mock data</span>
    </div>
  );
}