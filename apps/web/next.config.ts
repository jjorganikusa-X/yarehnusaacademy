import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  // Disable development indicators
  devIndicators: false,
  // Disable TypeScript and ESLint errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
