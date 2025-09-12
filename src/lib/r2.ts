import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

// Cloudflare R2 is S3-compatible. We map environment variables here.
const endpoint = process.env.S3_ENDPOINT_URL; // Includes account-specific host
const region = 'auto'; // R2 uses 'auto'

if (!endpoint) {
    // Fail fast in server context
    console.warn('S3_ENDPOINT_URL is not set; R2 client may not function.');
}

export const r2Client = new S3Client({
    region,
    endpoint,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
});

export async function getR2Object(bucket: string, key: string) {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    return r2Client.send(command);
}

export async function streamR2Object(bucket: string, key: string) {
    const obj = await getR2Object(bucket, key);
    if (!obj.Body) throw new Error('Object has no body');
    // Body is a ReadableStream in edge / web runtime or Node.js Readable in node runtime
    return obj;
}

export type R2GetObjectResult = Awaited<ReturnType<typeof getR2Object>>;
