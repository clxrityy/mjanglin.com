import withMdx from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

/** @type {import('rehype-pretty-code').Options} */
const options = {
  keepBackground: true,
  theme: "one-dark-pro",
  defaultLang: "plaintext",
};

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.gyazo.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "media2.dev.to"
      },
      {
        protocol: "https",
        hostname: "clxrity.xyz"
      },
      {
        protocol: "https",
        hostname: "flagsapi.com"
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
      }
    ],
  },
  pageExtensions: ["ts", "tsx", "mdx"],
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "unsafe-none" },
          {
            key: "Strict-Transport-Security",
            value: 'max-age=63072000; includeSubDomains; preload',
          }
        ],
      },
    ]
  }
};

export default withMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, options]],
  },
})(nextConfig);
