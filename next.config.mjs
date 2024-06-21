import "./src/env.mjs"
/** @type {import('next').NextConfig} */

const nextConfig = {
    eslint: {
        dirs: ['src'],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.discordapp.com",
                pathname: "/icons/**"
            }
        ]
    }
};

export default nextConfig;