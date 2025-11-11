/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    NEXT_PUBLIC_APP_NAME: 'SISO',
  },

  // Ignore apps/ folder (reference only)
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/apps/**', '**/node_modules/**'],
    }
    return config
  },
  async rewrites() {
    return [
      // Preserve older single-partner prefix while moving to /partners
      { source: '/partner/academy', destination: '/partners/academy' },
      { source: '/partner/academy/:path*', destination: '/partners/academy/:path*' },
      { source: '/partner/training-spotlight', destination: '/partners/academy/training-spotlight' },
      // Optional: legacy learning path to academy
      { source: '/partners/learning', destination: '/partners/academy' },
      { source: '/partners/learning/:path*', destination: '/partners/academy/:path*' },
    ]
  },
}

module.exports = nextConfig
