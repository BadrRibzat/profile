// components/DocumentViewer.tsx
"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { Loader, Languages, ArrowLeft, ArrowRight, Download, Eye, EyeOff, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically import PDF components with no SSR and better error handling
const PDFViewer = dynamic(
  () => import('./PDFViewer').then(mod => mod.PDFViewer),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[600px] bg-gray-100 dark:bg-gray-800 rounded-xl">
        <div className="text-center">
          <Loader className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading PDF Viewer...</p>
        </div>
      </div>
    )
  }
);

interface DocumentViewerProps {
  pdfUrl: string;
  title: string;
  description?: string;
  originalLanguage?: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ 
  pdfUrl, 
  title, 
  description,
  originalLanguage = 'ar' 
}) => {
  const { t, i18n } = useTranslation('documents');
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isTranslateMode, setIsTranslateMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(1.2);
  const [showOverlay, setShowOverlay] = useState<boolean>(true);

  // Handle page change
  const changePage = (offset: number) => {
    const newPage = pageNumber + offset;
    if (newPage >= 1 && newPage <= (numPages || 1)) {
      setPageNumber(newPage);
      setIsLoading(true);
    }
  };
  
  // Handle zoom
  const handleZoom = (factor: number) => {
    setScale(prevScale => {
      const newScale = prevScale + factor;
      return Math.max(0.5, Math.min(3.0, newScale));
    });
  };
  
  // Handle PDF loading success
  const handleDocumentLoadSuccess = (pageCount: number) => {
    setNumPages(pageCount);
    setIsLoading(false);
  };
  
  // Handle page loading success
  const handlePageLoadSuccess = () => {
    setIsLoading(false);
  };
  
  // Handle translation toggle
  const handleTranslationToggle = () => {
    setIsTranslateMode(!isTranslateMode);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap justify-between items-center bg-gray-50 dark:bg-gray-700 gap-4">
        {/* Page Navigation */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1 || isLoading}
            className={`p-2 rounded-full transition-colors ${
              pageNumber <= 1 || isLoading
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
            {t('page')} {pageNumber} {t('of')} {numPages || '-'}
          </span>
          <button
            onClick={() => changePage(1)}
            disabled={pageNumber >= (numPages || 1) || isLoading}
            className={`p-2 rounded-full transition-colors ${
              pageNumber >= (numPages || 1) || isLoading
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-3 flex-wrap gap-2">
          {/* Zoom Controls */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleZoom(-0.2)}
              disabled={scale <= 0.5}
              className={`p-2 rounded-full transition-colors ${
                scale <= 0.5
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs text-gray-600 dark:text-gray-400 min-w-[3rem] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => handleZoom(0.2)}
              disabled={scale >= 3.0}
              className={`p-2 rounded-full transition-colors ${
                scale >= 3.0
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
          
          {/* Translation Toggle */}
          <button
            onClick={handleTranslationToggle}
            disabled={isLoading}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
              isLoading
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                : isTranslateMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
            }`}
          >
            <Languages className="w-4 h-4" />
            <span className="whitespace-nowrap">
              {isTranslateMode ? t('hideTranslation') : t('showTranslation')}
            </span>
          </button>
          
          {/* Overlay Toggle */}
          {isTranslateMode && (
            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                showOverlay
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
              }`}
            >
              {showOverlay ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="whitespace-nowrap">{showOverlay ? t('hideOverlay') : t('showOverlay')}</span>
            </button>
          )}
          
          {/* Download Button */}
          <a
            href={pdfUrl}
            download
            className="flex items-center space-x-1 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            <span className="whitespace-nowrap">{t('download')}</span>
          </a>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="relative bg-gray-100 dark:bg-gray-900 flex justify-center p-4 overflow-auto min-h-[600px]">
        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-10"
            >
              <div className="flex flex-col items-center">
                <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="mt-2 text-gray-600 dark:text-gray-400">{t('loading')}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PDF Document */}
        <div className="relative" style={{ transformOrigin: 'top center' }}>
          <PDFViewer 
            pdfUrl={pdfUrl}
            pageNumber={pageNumber}
            scale={scale}
            isTranslateMode={isTranslateMode}
            showOverlay={showOverlay}
            targetLanguage={i18n.language}
            originalLanguage={originalLanguage}
            onDocumentLoadSuccess={handleDocumentLoadSuccess}
            onPageLoadSuccess={handlePageLoadSuccess}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
