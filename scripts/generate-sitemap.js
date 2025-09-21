// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://badrribzat.dev';
const locales = ['en', 'fr', 'ar', 'de', 'es', 'ja'];

const pages = [
  '',
  '/about', 
  '/projects',
  '/skills',
  '/experience', 
  '/certifications',
  '/contact'
];

const resumePages = locales.map(locale => `/resume/${locale}`);
const allPages = [...pages, ...resumePages];

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allPages.map(page => {
  return locales.map(locale => `
  <url>
    <loc>${baseUrl}${locale === 'en' ? '' : `/${locale}`}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
    ${locales.map(altLocale => `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}${altLocale === 'en' ? '' : `/${altLocale}`}${page}" />
    `).join('')}
  </url>`).join('');
}).join('')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully!');
}

generateSitemap();
