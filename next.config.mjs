import withMdx from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from "rehype-pretty-code";

/** @type {import('rehype-pretty-code').Options} */
const options = {
    keepBackground: true,
    theme: "one-dark-pro",
    defaultLang: "plaintext",
};

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
            {
                protocol: 'https',
                hostname: "github.com"
            }
        ]
    },
    pageExtensions: ['ts', 'tsx', 'mdx',],
};

export default withMdx({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, options]],
    }
})(nextConfig);
