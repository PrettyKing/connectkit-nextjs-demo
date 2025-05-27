/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 完全禁用 SSR
  experimental: {
    ssr: false
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

module.exports = nextConfig;