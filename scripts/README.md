# Scripts

## Base

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the project for production.
- `pnpm build:analyze`: Builds the project and analyzes the bundle size.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Lints the codebase using ESLint.
- `pnpm lint:fix`: Lints and automatically fixes issues in the codebase using ESLint.
- `pnpm type-check`: Checks TypeScript types in the codebase.

---

## `scripts/`

- **`pnpm upload:assets`**: Uploads static assets to the CDN.
  - Assets within the `_assets/` directory are uploaded (as their respective filenames and paths) to the `R2_BUCKET_NAME` bucket to the `S3_ENDPOINT_URL` endpoint.
  - Requires the following environment variables to be set:
    - `R2_ACCESS_KEY_ID`
    - `R2_SECRET_ACCESS_KEY`
    - `R2_BUCKET_NAME`
    - `S3_ENDPOINT_URL`
    - `R2_ACCOUNT_API_TOKEN` (for Cloudflare API authentication)
