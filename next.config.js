// 2. Enhanced next.config.js with production optimizations
/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  
  // Production optimizations
  images: {
    domains: ['badrribzat.dev', 'localhost'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compression
  compress: true,
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options', 
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      },
      {
        source: '/documents/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate'
          }
        ]
      }
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/cv',
        destination: '/resume/en',
        permanent: true
      },
      {
        source: '/certificates',
        destination: '/documents',
        permanent: true
      }
    ];
  },

  // Bundle analyzer
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Bundle analyzer in development
    if (process.env.ANALYZE === 'true') {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: isServer ? 8888 : 8889,
        openAnalyzer: true
      }));
    }

    // PDF.js worker configuration
    config.resolve.alias = {
      ...config.resolve.alias,
      'pdfjs-dist/build/pdf.worker.entry': 'pdfjs-dist/build/pdf.worker.min.js',
    };

    // Optimize imports
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      cacheGroups: {
        ...config.optimization.splitChunks.cacheGroups,
        pdf: {
          test: /[\\/]node_modules[\\/](react-pdf|pdfjs-dist)[\\/]/,
          name: 'pdf-chunk',
          chunks: 'all',
          priority: 10,
        },
        translations: {
          test: /[\\/]public[\\/]locales[\\/]/,
          name: 'translations',
          chunks: 'all',
          priority: 5,
        },
      },
    };

    return config;
  },

  // Experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: 'Badr Ribzat Portfolio',
    NEXT_PUBLIC_APP_VERSION: '2.0.0',
    NEXT_PUBLIC_DOMAIN: 'badrribzat.dev',
  },
};

module.exports = nextConfig;
