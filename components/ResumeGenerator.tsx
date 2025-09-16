// components/ResumeGenerator.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download, Globe, Briefcase, Award, Heart, Loader, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import CountrySpecificResume from './CountrySpecificResume';

const ResumeGenerator: React.FC = () => {
  const router = useRouter();
  const { locale } = router.query as { locale: string };
  const { t } = useTranslation('resume');
  const [resumeData, setResumeData] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Load resume data for the current locale
  useEffect(() => {
    if (!locale) return;
    
    async function loadData() {
      try {
        setLoadError(null);
        const mod = await import(`../data/resume/${locale}.json`);
        setResumeData(mod.default);
      } catch (error) {
        console.error(`Failed to load resume data for locale: ${locale}`, error);
        setLoadError(`Resume data not available for ${locale.toUpperCase()}`);
        
        // Fallback to English if available
        try {
          const fallback = await import(`../data/resume/en.json`);
          setResumeData(fallback.default);
        } catch (fallbackError) {
          console.error('Failed to load fallback English resume data', fallbackError);
        }
      }
    }
    
    loadData();
  }, [locale]);
  
  // Ensure PDFDownloadLink only renders on the client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (loadError && !resumeData) {
    return (
      <div className="flex items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        <AlertCircle className="w-8 h-8 text-red-500" />
        <p className="ml-4 text-red-600 dark:text-red-400">{loadError}</p>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="flex items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
        <p className="ml-4 text-gray-600 dark:text-gray-300">Loading Resume Data...</p>
      </div>
    );
  }

  const getLocalizedTitle = () => {
    const titles = {
      en: 'Professional Resume',
      de: 'Professioneller Lebenslauf', 
      fr: 'CV Professionnel',
      es: 'Currículum Profesional',
      ar: 'السيرة الذاتية المهنية',
      ja: '履歴書'
    };
    return titles[locale as keyof typeof titles] || titles.en;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {getLocalizedTitle()} – {locale?.toUpperCase()}
        </h2>
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Country-Optimized</span>
        </div>
      </div>

      {loadError && (
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-700 dark:text-yellow-300 text-sm">
          <AlertCircle className="w-4 h-4 inline mr-2" />
          {loadError} - Using English version as fallback.
        </div>
      )}

      <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white">Resume Preview</h3>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Award className="w-4 h-4 text-yellow-500" />
              ATS Optimized
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-4 h-4 text-green-500" />
              Visa-Sponsorship Ready
            </span>
          </div>
        </div>

        {/* Download button */}
        <div className="flex justify-center mt-4">
          {isClient ? (
            <PDFDownloadLink
              document={<CountrySpecificResume data={resumeData} locale={locale} />}
              fileName={`Badr_Ribzat_Resume_${locale.toUpperCase()}.pdf`}
            >
              {({ loading, error }) => (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className={`w-full max-w-sm flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : error
                      ? 'bg-red-500 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Generating PDF...</span>
                    </>
                  ) : error ? (
                    <>
                      <AlertCircle className="w-5 h-5" />
                      <span>Error generating PDF</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>Download {locale.toUpperCase()} Resume</span>
                    </>
                  )}
                </motion.button>
              )}
            </PDFDownloadLink>
          ) : (
            <div className="w-full max-w-sm flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-gray-200 dark:bg-gray-700">
              <Loader className="w-5 h-5 animate-spin" />
              <span className="text-gray-600 dark:text-gray-300">Loading download link...</span>
            </div>
          )}
        </div>

        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-xs text-green-700 dark:text-green-300">
          <Heart className="w-4 h-4 inline mr-2" />
          This resume highlights my self-taught journey and resilience. Ready to relocate immediately with visa sponsorship to contribute meaningfully to your team.
        </div>
      </div>

      {/* Template Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Template Style</h4>
          <p className="text-blue-600 dark:text-blue-400">
            {locale === 'en' && 'ATS-Optimized Professional'}
            {locale === 'de' && 'German Lebenslauf with Photo'}
            {locale === 'fr' && 'Modern French CV'}
            {locale === 'es' && 'Spanish Curriculum Professional'}
            {locale === 'ar' && 'Arabic RTL Resume'}
            {locale === 'ja' && 'Japanese Rirekisho Format'}
          </p>
        </div>
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">Optimization</h4>
          <p className="text-green-600 dark:text-green-400">
            Country-specific formatting and cultural adaptation
          </p>
        </div>
        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-1">Purpose</h4>
          <p className="text-purple-600 dark:text-purple-400">
            Entry-level positions with visa sponsorship
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeGenerator;
