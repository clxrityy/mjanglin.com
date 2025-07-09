/**
 * Performance monitoring and error tracking utilities
 */

export interface PerformanceMetric {
    name: string;
    value: number;
    timestamp: number;
}

export interface ErrorLog {
    message: string;
    stack?: string;
    timestamp: number;
    context?: Record<string, unknown>;
    url?: string;
    userAgent?: string;
}

class PerformanceMonitor {
    private metrics: PerformanceMetric[] = [];
    private errors: ErrorLog[] = [];

    /**
     * Log a performance metric
     */
    logMetric(name: string, value: number): void {
        const metric: PerformanceMetric = {
            name,
            value,
            timestamp: Date.now()
        };

        this.metrics.push(metric);

        // Keep only last 100 metrics
        if (this.metrics.length > 100) {
            this.metrics = this.metrics.slice(-100);
        }

        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`📊 Performance: ${name} = ${value}ms`);
        }
    }

    /**
     * Log an error with context
     */
    logError(error: Error, context?: Record<string, unknown>): void {
        const errorLog: ErrorLog = {
            message: error.message,
            stack: error.stack,
            timestamp: Date.now(),
            context,
            url: typeof window !== 'undefined' ? window.location.href : undefined,
            userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined
        };

        this.errors.push(errorLog);

        // Keep only last 50 errors
        if (this.errors.length > 50) {
            this.errors = this.errors.slice(-50);
        }

        // Log to console
        console.error('🚨 Error logged:', errorLog);

        // In production, you would send this to your monitoring service
        // sendToMonitoringService(errorLog);
    }

    /**
     * Measure function execution time
     */
    measureFunction<T>(name: string, fn: () => T): T {
        const start = performance.now();
        try {
            const result = fn();
            const duration = performance.now() - start;
            this.logMetric(name, duration);
            return result;
        } catch (error) {
            const duration = performance.now() - start;
            this.logMetric(`${name}_error`, duration);
            if (error instanceof Error) {
                this.logError(error, { functionName: name });
            }
            throw error;
        }
    }

    /**
     * Measure async function execution time
     */
    async measureAsyncFunction<T>(name: string, fn: () => Promise<T>): Promise<T> {
        const start = performance.now();
        try {
            const result = await fn();
            const duration = performance.now() - start;
            this.logMetric(name, duration);
            return result;
        } catch (error) {
            const duration = performance.now() - start;
            this.logMetric(`${name}_error`, duration);
            if (error instanceof Error) {
                this.logError(error, { functionName: name });
            }
            throw error;
        }
    }

    /**
     * Get all collected metrics
     */
    getMetrics(): PerformanceMetric[] {
        return [...this.metrics];
    }

    /**
     * Get all collected errors
     */
    getErrors(): ErrorLog[] {
        return [...this.errors];
    }

    /**
     * Clear all collected data
     */
    clear(): void {
        this.metrics = [];
        this.errors = [];
    }
}

// Export a singleton instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * Convenience function for logging errors
 */
export function logError(error: Error, context?: Record<string, unknown>): void {
    performanceMonitor.logError(error, context);
}

/**
 * Convenience function for logging metrics
 */
export function logMetric(name: string, value: number): void {
    performanceMonitor.logMetric(name, value);
}

/**
 * Web Vitals tracking (for client-side only)
 */
export function trackWebVitals(): void {
    if (typeof window === 'undefined') return;

    // Track Core Web Vitals when they become available
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(metric => logMetric('CLS', metric.value));
        getFID(metric => logMetric('FID', metric.value));
        getFCP(metric => logMetric('FCP', metric.value));
        getLCP(metric => logMetric('LCP', metric.value));
        getTTFB(metric => logMetric('TTFB', metric.value));
    }).catch(error => {
        console.warn('Failed to load web-vitals:', error);
    });
}
