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
}

module.exports = nextConfig
