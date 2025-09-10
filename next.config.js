// next.config.js
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['github.com', 'vercel.app', 'fly.dev'],
    unoptimized: true
  },
  env: {
    CUSTOM_KEY: 'badr-ribzat-portfolio',
    SITE_URL: 'https://badrribzat.dev'
  },
  async headers() {
    return [
      {
        source: '/resume/:path*',
        headers: [
          { key: 'Content-Type', value: 'application/pdf' },
          { key: 'Cache-Control', value: 'public, max-age=31536000' }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
