// components/ProofPack.tsx
import React from 'react';
import { useTranslation } from 'next-i18next';
import { Download, FileText, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProofPackProps {
  locale: string;
}

const ProofPack: React.FC<ProofPackProps> = ({ locale }) => {
  const { t } = useTranslation('about');
  
  // Hide on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  const fileName = `proof-pack-${locale}.pdf`;
  const fileSize = "2.7 MB"; // Update if you change files

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
    >
      <div className="flex items-center space-x-3 mb-4">
        <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t('proofPack.title')}
        </h3>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
        {t('proofPack.description')}
      </p>
      
      <a
        href={`/proof/${fileName}`}
        download
        className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        aria-label={t('proofPack.downloadAria')}
      >
        <Download className="w-5 h-5" />
        <span>{t('proofPack.download')} ({fileSize})</span>
      </a>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
        <FileText className="w-3 h-3 inline mr-1" />
        {t('proofPack.note')}
      </p>
    </motion.div>
  );
};

export default ProofPack;
