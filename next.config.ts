import withPWA from 'next-pwa';

/** Next.js config only */
const nextConfig = {
  reactStrictMode: true,
  experimental: {},
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(nextConfig); 
