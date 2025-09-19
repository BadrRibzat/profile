// next.config.js
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['github.com', 'vercel.app', 'fly.dev', 'localhost'],
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  env: {
    CUSTOM_KEY: 'badr-ribzat-portfolio',
    SITE_URL: 'https://badrribzat.dev'
  },
  // Add webpack configuration for PDF.js
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        canvas: false,
      };
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      },
      {
        source: '/resume/:path*',
        headers: [
          { key: 'Content-Type', value: 'application/pdf' },
          { key: 'Cache-Control', value: 'public, max-age=31536000' }
        ]
      },
      {
        source: '/documents/:path*',
        headers: [
          { key: 'Content-Type', value: 'application/pdf' },
          { key: 'Cache-Control', value: 'public, max-age=31536000' },
          { key: 'Access-Control-Allow-Origin', value: '*' }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
