/**
 * Environment variables validation and type safety
 * This ensures all required environment variables are present at runtime
 */

type NodeEnvironment = 'development' | 'production' | 'test';

interface EnvironmentVariables {
    SPOTIFY_API_CLIENT_ID: string;
    SPOTIFY_API_CLIENT_SECRET: string;
    NODE_ENV: NodeEnvironment;
}

class EnvironmentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EnvironmentError';
    }
}

function validateEnvironmentVariable(name: string, value: string | undefined): string {
    if (!value || value.trim() === '') {
        throw new EnvironmentError(`Missing required environment variable: ${name}`);
    }
    return value;
}

function validateNodeEnv(value: string | undefined): NodeEnvironment {
    const validEnvs = ['development', 'production', 'test'] as const;
    if (!value || !validEnvs.includes(value as NodeEnvironment)) {
        return 'development'; // Default fallback
    }
    return value as NodeEnvironment;
}

export function validateEnvironment(): EnvironmentVariables {
    try {
        return {
            SPOTIFY_API_CLIENT_ID: validateEnvironmentVariable('SPOTIFY_API_CLIENT_ID', process.env.SPOTIFY_API_CLIENT_ID),
            SPOTIFY_API_CLIENT_SECRET: validateEnvironmentVariable('SPOTIFY_API_CLIENT_SECRET', process.env.SPOTIFY_API_CLIENT_SECRET),
            NODE_ENV: validateNodeEnv(process.env.NODE_ENV),
        };
    } catch (error) {
        console.error('Environment validation failed:', error);
        throw error;
    }
}

// Validate environment on module load in development
if (process.env.NODE_ENV === 'development') {
    try {
        validateEnvironment();
    } catch (error) {
        console.warn('Environment validation warning:', error);
    }
}

export { EnvironmentError };
