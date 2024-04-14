import withMdx from '@next/mdx';
import remarkPrism from 'remark-prism';
/** @type {import('next').NextConfig} */

const nextConfig = {
    // env: {
    //     ADMIN_PASS: process.env.ADMIN_PASS,
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.gyazo.com',
            },
        ]
    },
    pageExtensions: ['ts', 'tsx', 'mdx',],
    experimental: {
        mdxRs: true,
    },
};

export default withMdx({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkPrism],
    }
})(nextConfig);