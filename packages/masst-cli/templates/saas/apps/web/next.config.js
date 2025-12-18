/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@masst/ui', '@{{PROJECT_NAME}}/database'],
};

module.exports = nextConfig;
