// components/LanguageSwitcher.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useTranslation } from 'next-i18next';

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('common');

  const languages = [
    { code: 'en', name: t('languages.en', 'English'), flag: '🇺🇸', nativeName: 'English' },
    { code: 'fr', name: t('languages.fr', 'Français'), flag: '🇫🇷', nativeName: 'Français' },
    { code: 'ar', name: t('languages.ar', 'العربية'), flag: '🇲🇦', nativeName: 'العربية' },
    { code: 'de', name: t('languages.de', 'Deutsch'), flag: '🇩🇪', nativeName: 'Deutsch' },
    { code: 'es', name: t('languages.es', 'Español'), flag: '🇪🇸', nativeName: 'Español' },
    { code: 'ja', name: t('languages.ja', '日本語'), flag: '🇯🇵', nativeName: '日本語' }
  ];

  const currentLanguage = languages.find(lang => lang.code === router.locale) || languages[0];

  const handleLanguageChange = (locale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl rounded-full py-3 px-4 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-300"
        >
          <Globe className="w-4 h-4" />
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="text-sm font-medium hidden sm:block">
            {currentLanguage.name}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 -z-10"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full mb-2 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 min-w-[200px] max-h-80 overflow-y-auto"
              >
                {languages.map((language, index) => (
                  <motion.button
                    key={language.code}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                      language.code === router.locale 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-xl">{language.flag}</span>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{language.nativeName}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{language.name}</div>
                    </div>
                    {language.code === router.locale && (
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
