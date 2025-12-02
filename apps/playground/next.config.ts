import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@masst/ui"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
