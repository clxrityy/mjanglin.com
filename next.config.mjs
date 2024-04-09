/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ADMIN_PASS: process.env.ADMIN_PASS,
    }
};

export default nextConfig;
