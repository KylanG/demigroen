import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    optimizePackageImports: ['sanity'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig;
