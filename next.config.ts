import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sentimentai.nexatestwp.com',
      },
    ],
  },
};

export default nextConfig;
