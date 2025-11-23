'use client'
'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-textMain p-4 text-center">
          <h1 className="text-2xl font-bold text-negative mb-2">Something went wrong</h1>
          <p className="text-textMuted max-w-md mb-4">
            The application encountered a critical error. Please refresh the page.
          </p>
          <div className="bg-[#0e1014] p-4 rounded border border-border text-left font-mono text-xs text-red-400 overflow-auto max-w-full">
            {this.state.error?.toString()}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-accent text-white rounded hover:bg-blue-600 transition-colors"
          >
            Refresh Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}