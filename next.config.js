// next.config.js
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
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

  compress: true,
  
  // Enhanced headers with font support
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
      // Add font headers
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
        ],
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

  // Enhanced webpack configuration
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

    // Handle font fallback for server-side rendering
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    // Font file handling
    config.module.rules.push({
      test: /\.(ttf|woff|woff2|otf)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[hash][ext][query]'
      }
    });

    // PDF.js worker configuration
    config.resolve.alias = {
      ...config.resolve.alias,
      'pdfjs-dist/build/pdf.worker.entry': 'pdfjs-dist/build/pdf.worker.min.js',
    };

    // WebAssembly configuration
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    });

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
        fonts: {
          test: /\.(ttf|woff|woff2|otf)$/,
          name: 'fonts',
          chunks: 'all',
          priority: 8,
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
    esmExternals: false, // Important for font loading
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: 'Badr Ribzat Portfolio',
    NEXT_PUBLIC_APP_VERSION: '2.0.0',
    NEXT_PUBLIC_DOMAIN: 'badrribzat.dev',
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    BREVO_SENDER_EMAIL: process.env.BREVO_SENDER_EMAIL,
    BREVO_RECEIVER_EMAIL: process.env.BREVO_RECEIVER_EMAIL,
  },
};

module.exports = nextConfig;
