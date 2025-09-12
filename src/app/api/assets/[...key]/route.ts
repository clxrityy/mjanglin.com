/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server';
import { streamR2Object } from '@/lib/r2';

// We intentionally avoid caching for now; can add CDN headers later.

export const runtime = 'nodejs'; // Using AWS SDK v3 Node adapter

// Next.js route handler context generic typing
export async function GET(req: NextRequest, context: any) {
    const { params } = await context;
    const bucket = process.env.R2_BUCKET_NAME;
    if (!bucket) return new Response('R2_BUCKET_NAME not configured', { status: 500 });
    const keyParts = await params?.key;
    if (!keyParts || keyParts.length === 0) return new Response('No key provided', { status: 400 });
    const key = keyParts.join('/');

    try {
        const obj = await streamR2Object(bucket, key);

        const contentType = obj.ContentType || 'application/octet-stream';
        const contentLength = obj.ContentLength?.toString();
        const lastModified = obj.LastModified?.toUTCString();
        const etag = obj.ETag?.replace(/"/g, '');

        const headers = new Headers();
        headers.set('Content-Type', contentType);
        if (contentLength) headers.set('Content-Length', contentLength);
        if (lastModified) headers.set('Last-Modified', lastModified);
        if (etag) headers.set('ETag', etag);
        headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');

        // Body may be a Readable or web stream; Next 15 should handle both
        // obj.Body is a stream; respond directly
        return new Response(obj.Body as BodyInit, { status: 200, headers });
    } catch (err) {
        const anyErr = err as { $metadata?: { httpStatusCode?: number } };
        if (anyErr?.$metadata?.httpStatusCode === 404) {
            return new Response('Not found', { status: 404 });
        }
        console.error('R2 asset fetch error', err);
        return new Response('Internal error fetching asset', { status: 500 });
    }
}
