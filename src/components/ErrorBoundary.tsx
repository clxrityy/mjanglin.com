"use client";

import React from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ComponentType<{ error?: Error }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        // Here you could send error to monitoring service
        // logError(error, { errorInfo });
    }

    render() {
        if (this.state.hasError) {
            const FallbackComponent = this.props.fallback || DefaultErrorFallback;
            return <FallbackComponent error={this.state.error} />;
        }

        return this.props.children;
    }
}

function DefaultErrorFallback({ error }: Readonly<{ error?: Error }>) {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
                Something went wrong
            </h2>
            <p className="text-red-600 text-center mb-4">
                We apologize for the inconvenience. Please try refreshing the page.
            </p>
            {error && process.env.NODE_ENV === 'development' && (
                <details className="text-sm text-red-700">
                    <summary className="cursor-pointer">Error details</summary>
                    <pre className="mt-2 whitespace-pre-wrap">{error.message}</pre>
                </details>
            )}
            <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
                Refresh Page
            </button>
        </div>
    );
}

export { ErrorBoundary, DefaultErrorFallback };
