/** Helper to build the API path for R2-hosted assets */
export function r2AssetPath(relativeKey: string) {
    // normalize leading slash
    const key = relativeKey.startsWith('/') ? relativeKey.slice(1) : relativeKey;
    return `/api/assets/${key}`;
}
