/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@masst/ui"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
