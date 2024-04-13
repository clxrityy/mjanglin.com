/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ADMIN_PASS: process.env.ADMIN_PASS,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.gyazo.com',
            },
        ]
    }
};

export default nextConfig;
