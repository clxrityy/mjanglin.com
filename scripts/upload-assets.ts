import dotenv from 'dotenv';
// Load .env.local (used by Next.js) fallback to .env
dotenv.config({ path: '.env.local' });
dotenv.config();
import { readdir, stat, readFile } from "fs/promises";
import { join, extname } from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import mime from 'mime';

const bucket = process.env.R2_BUCKET_NAME || "mjanglin-assets";
const prefix = "assets/"; // maintain folder namespace in bucket

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var ${name}`);
  return v;
}

// validate early
requireEnv('R2_ACCESS_KEY_ID');
requireEnv('R2_SECRET_ACCESS_KEY');
requireEnv('S3_ENDPOINT_URL');

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.S3_ENDPOINT_URL,
  forcePathStyle: true, // R2 prefers path-style
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

async function walk(dir: string, files: string[] = []) {
  for (const entry of await readdir(dir)) {
    const p = join(dir, entry);
    const st = await stat(p);
    if (st.isDirectory()) await walk(p, files);
    else files.push(p);
  }
  return files;
}

async function run() {
  const root = join(process.cwd(), "public", "assets");
  const files = await walk(root);
  let success = 0;
  let failed = 0;
  for (const file of files) {
    const body = await readFile(file);
    const rel = file.substring(root.length + 1);
    const key = prefix + rel;
    const contentType = mime.getType(extname(file)) || 'application/octet-stream';
    try {
      await s3.send(
        new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType })
      );
      console.log(`✔ Uploaded ${key} (${contentType})`);
      success++;
    } catch (e) {
      console.error(`✖ Failed ${key}`, e);
      failed++;
    }
  }
  console.log(`Done. Success: ${success}, Failed: ${failed}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
