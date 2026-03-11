import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['sanity', '@sanity/vision'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },
  // Empty turbopack config to opt into Turbopack (Next.js 16 default)
  turbopack: {},
};

export default nextConfig;
