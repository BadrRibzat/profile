// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'ar', 'de', 'es', 'ja'],
    localeDetection: false,
    domains: [
      {
        domain: 'badrribzat.com',
        defaultLocale: 'en',
      },
      {
        domain: 'badrribzat.fr',
        defaultLocale: 'fr',
      },
      // Add more domains as needed
    ]
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  saveMissing: false,
  strictMode: true,
  serializeConfig: false,
  react: {
    useSuspense: false
  }
};
