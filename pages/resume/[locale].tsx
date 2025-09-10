// pages/resume/[locale].tsx
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../components/Layout';
import ResumeGenerator from '../../components/ResumeGenerator';
import { motion } from 'framer-motion';
import { Globe, Download, FileText, Star, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const ResumePage: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation('resume');
  const { locale: pageLocale } = router.query;

  const supportedLocales = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
  ];

  const currentLocale = supportedLocales.find(loc => loc.code === pageLocale) || supportedLocales[0];

  return (
    <Layout
      title={`${t('title')} - ${currentLocale.name}`}
      description={t('seo.description')}
      noindex={false}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link href="/">
              <motion.button
                whileHover={{ x: -5 }}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t('navigation.back')}</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              {t('pageTitle')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              {t('pageDescription')}
            </p>
            
            {/* Current Language Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              <span className="text-2xl">{currentLocale.flag}</span>
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {currentLocale.name}
              </span>
              <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  {t('active')}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Language Switcher */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                {t('languageSelector.title')}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {supportedLocales.map((locale, index) => (
                  <motion.div
                    key={locale.code}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Link href={`/resume/${locale.code}`}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 rounded-xl text-center cursor-pointer transition-all duration-300 ${
                          locale.code === pageLocale
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                            : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-2">{locale.flag}</div>
                        <div className="text-sm font-medium">{locale.name}</div>
                        {locale.code === 'ja' && (
                          <div className="text-xs mt-1 opacity-75">履歴書</div>
                        )}
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Resume Generator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ResumeGenerator />
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {/* ATS Optimization */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t('features.ats.title')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t('features.ats.description')}
              </p>
            </div>

            {/* International Standards */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t('features.international.title')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t('features.international.description')}
              </p>
            </div>

            {/* Quality Assurance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/50 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t('features.quality.title')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t('features.quality.description')}
              </p>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                {t('cta.title')}
              </h3>
              <p className="text-lg mb-6 opacity-90">
                {t('cta.description')}
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  {t('cta.button')}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const locales = ['en', 'fr', 'ar', 'de', 'es', 'ja'];
  
  const paths = locales.map(locale => ({
    params: { locale },
    locale
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const resumeLocale = params?.locale as string;
  
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'resume'])),
      resumeLocale
    },
  };
};

export default ResumePage;
