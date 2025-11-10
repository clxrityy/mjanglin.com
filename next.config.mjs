/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    mdxRs: true,
  },
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
        hostname: "media2.dev.to",
      },
      {
        protocol: "https",
        hostname: "clxrity.xyz",
      },
      {
        protocol: "https",
        hostname: "flagsapi.com",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      // {
      //   protocol: "https",
      //   hostname: "distrokid.imgix.net",
      // },
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
      },
    ],
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "unsafe-none" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000;", // includeSubDomains; preload
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/spotify",
        destination: "https://open.spotify.com/artist/0HaFO6TLXEZ2De3d67dThV",
        permanent: true,
        statusCode: 302,
      },
      {
        source: "/the-undertow",
        destination: "https://distrokid.com/hyperfollow/clxrity/the-undertow",
        permanent: true,
        statusCode: 302,
      },
      {
        source: "/discord",
        destination: "https://discord.gg/RnwJEdsmy2",
        permanent: true,
        statusCode: 302,
      },
      {
        source: "/github",
        destination: "https://github.com/clxrityy",
        permanent: true,
        statusCode: 302,
      },
      {
        source: "/soundcloud",
        destination: "https://soundcloud.com/clxrityy",
        permanent: true,
        statusCode: 302,
      },
      {
        source: "/youtube",
        destination: "https://www.youtube.com/@clxrity_",
        permanent: true,
        statusCode: 302,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/mjxnglin/",
        permanent: true,
        statusCode: 302,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/mjanglin1/",
        permanent: true,
        statusCode: 302,
      },
      {
        source: "/apple-music",
        destination: "https://music.apple.com/us/artist/clxrity/1702200875",
        permanent: true,
        statusCode: 302,
      },
    ];
  },
};

export default nextConfig;
