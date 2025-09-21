// components/Layout.tsx
import React from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Header from './Header';
import Footer from './Footer';
import LanguageSwitcher from './LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
  image,
  noindex = false
}) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { locale } = router;

  const isRTL = locale === 'ar';
  const pageTitle = title ? `${title} | ${t('seo.title', 'Badr Ribzat')}` : t('seo.title', 'Badr Ribzat | Full-Stack Software Engineer');
  const pageDescription = description || t('seo.description');

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 ${isRTL ? 'rtl font-arabic' : 'ltr font-main'}`}>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={`https://badrribzat.dev${router.asPath}`}
        openGraph={{
          title: pageTitle,
          description: pageDescription,
          url: `https://badrribzat.dev${router.asPath}`,
          siteName: 'Badr Ribzat Portfolio',
          images: image ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: pageTitle,
            }
          ] : [
            {
              url: 'https://badrribzat.dev/og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'Badr Ribzat - Full-Stack Software Engineer',
            }
          ],
          type: 'website',
        }}
        twitter={{
          handle: '@BadrRibzat',
          site: '@BadrRibzat',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'Badr Ribzat, Full-Stack Developer, Software Engineer, Morocco, React, Python, Next.js, Biomedical AI, Educational Technology'
          },
          {
            name: 'author',
            content: 'Badr Ribzat'
          },
          {
            name: 'robots',
            content: noindex ? 'noindex,nofollow' : 'index,follow'
          }
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
          {
            rel: 'apple-touch-icon',
            href: '/apple-touch-icon.png',
            sizes: '180x180'
          },
          {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
          },
          {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: 'anonymous'
          }
        ]}
      />
      
      <Header />
      
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={router.asPath}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.25, 0, 1]
          }}
          className="flex-grow"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      
      <Footer />
      <LanguageSwitcher />
    </div>
  );
};

export default Layout;
