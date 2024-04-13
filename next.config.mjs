import withMdx from '@next/mdx';
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
    },
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    experimental: {
        mdxRs: true,
    },
};

export default withMdx(nextConfig);