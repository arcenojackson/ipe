import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
    {
      source: '/sw.js',
      headers: [
        {
          key: 'Content-Type',
          value: 'application/javascript; charset=utf-8',
        },
        {
          key: 'Cache-Control',
          value: 'no-cache, no-store, must-revalidate',
        },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self'",
        },
      ],
    },
  ],
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development'
  },
  images: {
    remotePatterns: [
      {
        hostname: 'i.ytimg.com'
      },
    ],
  }
};

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true
})(nextConfig);
