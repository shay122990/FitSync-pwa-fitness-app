import withPWA from 'next-pwa';
import type { NextConfig } from 'next';

const nextConfig = {
  reactStrictMode: true,
  experimental: {},
  images: {
    remotePatterns: [
      { protocol: 'https' as const, hostname: 'img.clerk.com' },
      { protocol: 'https' as const, hostname: 'images.clerk.dev' },
    ],
  },
} satisfies NextConfig;

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);
