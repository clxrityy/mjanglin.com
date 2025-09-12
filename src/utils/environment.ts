/**
 * Environment variables validation and type safety
 * This ensures all required environment variables are present at runtime
 */

type NodeEnvironment = 'development' | 'production' | 'test';

interface EnvironmentVariables {
    SPOTIFY_API_CLIENT_ID: string;
    SPOTIFY_API_CLIENT_SECRET: string;
    NODE_ENV: NodeEnvironment;
    R2_ACCOUNT_API_TOKEN: string;
    R2_ACCESS_KEY_ID: string;
    R2_SECRET_ACCESS_KEY: string;
    S3_ENDPOINT_URL: string;
    R2_BUCKET_NAME: string;
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
            R2_ACCOUNT_API_TOKEN: validateEnvironmentVariable('R2_ACCOUNT_API_TOKEN', process.env.R2_ACCOUNT_API_TOKEN),
            R2_ACCESS_KEY_ID: validateEnvironmentVariable('R2_ACCESS_KEY_ID', process.env.R2_ACCESS_KEY_ID),
            R2_SECRET_ACCESS_KEY: validateEnvironmentVariable('R2_SECRET_ACCESS_KEY', process.env.R2_SECRET_ACCESS_KEY),
            S3_ENDPOINT_URL: validateEnvironmentVariable('S3_ENDPOINT_URL', process.env.S3_ENDPOINT_URL),
            R2_BUCKET_NAME: validateEnvironmentVariable('R2_BUCKET_NAME', process.env.R2_BUCKET_NAME),
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
