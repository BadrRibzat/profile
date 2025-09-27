// components/SEOHead.tsx
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  canonical?: string;
  noindex?: boolean;
  structuredData?: any;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image = '/images/me.jpg',
  canonical,
  noindex = false,
  structuredData
}) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  
  // Use provided props or fallback to translations
  const pageTitle = title || t('seo.title', 'Badr Ribzat - Full-Stack Software Engineer');
  const pageDescription = description || t('seo.description', 'Professional portfolio of Badr Ribzat, featuring verified certificates, projects, and multilingual resume generation.');
  const pageKeywords = keywords || t('seo.keywords', 'software engineer, full-stack developer, Morocco, ALX, portfolio, certificates, multilingual resume');
  
  const currentUrl = `https://badrribzat.dev${router.asPath}`;
  const canonicalUrl = canonical || currentUrl;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="language" content={router.locale || 'en'} />
      <meta name="author" content="Badr Ribzat" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={`https://badrribzat.dev${image}`} />
      <meta property="og:locale" content={router.locale || 'en'} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={`https://badrribzat.dev${image}`} />

      {/* Favicons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Performance hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="dns-prefetch" href="//unpkg.com" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      {/* Hreflang tags for multilingual support */}
      {['en', 'fr', 'ar', 'de', 'es', 'ja'].map(locale => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={`https://badrribzat.dev/${locale}${router.asPath}`}
        />
      ))}
    </Head>
  );
};

export default SEOHead;
