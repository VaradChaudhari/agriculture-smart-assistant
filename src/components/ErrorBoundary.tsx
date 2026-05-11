import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    message: '',
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error.message,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] React render error:', error, errorInfo);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="min-h-screen bg-gray-50 px-4 py-16 text-gray-900 dark:bg-gray-950 dark:text-white">
        <div className="mx-auto max-w-lg rounded-lg border border-red-100 bg-white p-8 text-center shadow-sm dark:border-red-900/40 dark:bg-gray-900">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h1 className="mb-2 text-xl font-semibold">Something went wrong</h1>
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            The page hit an unexpected rendering error. You can reload and continue working.
          </p>
          {this.state.message && (
            <p className="mb-6 rounded-lg bg-gray-50 p-3 text-left text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              {this.state.message}
            </p>
          )}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}
