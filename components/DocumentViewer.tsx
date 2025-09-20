// components/DocumentViewer.tsx
"use client";
import React, { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { 
  Loader, Languages, ArrowLeft, ArrowRight, Download, 
  Eye, EyeOff, ZoomIn, ZoomOut, RotateCcw, Share2, 
  FileText, Info, Settings 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced dynamic import with better error handling
const PDFViewer = dynamic(
  () => import('./PDFViewer').then(mod => mod.PDFViewer),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl">
        <div className="text-center">
          <div className="relative mb-4">
            <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
            <div className="absolute inset-0 w-12 h-12 border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading PDF Viewer...</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Please wait...</p>
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
  documentId: string;
  category?: string;
  issuer?: string;
  dateIssued?: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ 
  pdfUrl, 
  title, 
  description,
  originalLanguage = 'ar',
  documentId,
  category = 'general',
  issuer,
  dateIssued
}) => {
  const { t, i18n } = useTranslation('documents');
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isTranslateMode, setIsTranslateMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(1.2);
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Enhanced page navigation
  const changePage = useCallback((offset: number) => {
    const newPage = pageNumber + offset;
    if (newPage >= 1 && newPage <= (numPages || 1)) {
      setPageNumber(newPage);
      setIsLoading(true);
    }
  }, [pageNumber, numPages]);
  
  // Enhanced zoom with better boundaries
  const handleZoom = useCallback((factor: number) => {
    setScale(prevScale => {
      const newScale = prevScale + factor;
      return Math.max(0.5, Math.min(3.0, newScale));
    });
  }, []);
  
  // Reset zoom
  const resetZoom = useCallback(() => {
    setScale(1.2);
  }, []);
  
  // Jump to page
  const jumpToPage = useCallback((page: number) => {
    if (page >= 1 && page <= (numPages || 1)) {
      setPageNumber(page);
      setIsLoading(true);
    }
  }, [numPages]);

  // Handle PDF loading success
  const handleDocumentLoadSuccess = useCallback((pageCount: number) => {
    setNumPages(pageCount);
    setIsLoading(false);
    setError(null);
  }, []);
  
  // Handle page loading success
  const handlePageLoadSuccess = useCallback(() => {
    setIsLoading(false);
  }, []);
  
  // Enhanced translation toggle with analytics
  const handleTranslationToggle = useCallback(() => {
    setIsTranslateMode(prev => !prev);
    
    // Analytics tracking (if implemented)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'translation_toggle', {
        document_id: documentId,
        language_pair: `${originalLanguage}_to_${i18n.language}`,
        enabled: !isTranslateMode
      });
    }
  }, [isTranslateMode, documentId, originalLanguage, i18n.language]);

  // Share functionality
  const handleShare = useCallback(async () => {
    const shareData = {
      title: title,
      text: description || t('shareDescription'),
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        // Show toast notification (implement as needed)
        console.log('Link copied to clipboard');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  }, [title, description, t]);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case '=':
          case '+':
            event.preventDefault();
            handleZoom(0.2);
            break;
          case '-':
            event.preventDefault();
            handleZoom(-0.2);
            break;
          case '0':
            event.preventDefault();
            resetZoom();
            break;
          case 't':
            event.preventDefault();
            handleTranslationToggle();
            break;
        }
      } else {
        switch (event.key) {
          case 'ArrowLeft':
            if (!showSettings) {
              event.preventDefault();
              changePage(-1);
            }
            break;
          case 'ArrowRight':
            if (!showSettings) {
              event.preventDefault();
              changePage(1);
            }
            break;
          case 'Escape':
            setShowSettings(false);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleZoom, resetZoom, handleTranslationToggle, changePage, showSettings]);

  // Memoized category badge
  const categoryBadge = useMemo(() => {
    const categoryColors = {
      education: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      professional: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', 
      technical: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      health: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      language: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      general: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        categoryColors[category as keyof typeof categoryColors] || categoryColors.general
      }`}>
        <FileText className="w-3 h-3 mr-1" />
        {t(`categories.${category}`)}
      </span>
    );
  }, [category, t]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Enhanced Header */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h3>
              {categoryBadge}
            </div>
            
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {description}
              </p>
            )}
            
            {/* Document metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              {issuer && (
                <span className="flex items-center space-x-1">
                  <Info className="w-3 h-3" />
                  <span>{t('issuedBy')}: {issuer}</span>
                </span>
              )}
              {dateIssued && (
                <span className="flex items-center space-x-1">
                  <span>{t('issuedOn')}: {dateIssued}</span>
                </span>
              )}
              <span className="flex items-center space-x-1">
                <span>{t('originalLanguage')}: {t(`languages.${originalLanguage}`)}</span>
              </span>
            </div>
          </div>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Enhanced Controls */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <div className="flex flex-wrap justify-between items-center gap-4">
          {/* Page Navigation */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => changePage(-1)}
                disabled={pageNumber <= 1 || isLoading}
                className={`p-2 rounded-full transition-all ${
                  pageNumber <= 1 || isLoading
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105'
                }`}
                title={t('previousPage')}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={pageNumber}
                  onChange={(e) => jumpToPage(parseInt(e.target.value) || 1)}
                  min={1}
                  max={numPages || 1}
                  className="w-12 text-center text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  / {numPages || '-'}
                </span>
              </div>
              
              <button
                onClick={() => changePage(1)}
                disabled={pageNumber >= (numPages || 1) || isLoading}
                className={`p-2 rounded-full transition-all ${
                  pageNumber >= (numPages || 1) || isLoading
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105'
                }`}
                title={t('nextPage')}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-600">
              <button
                onClick={() => handleZoom(-0.2)}
                disabled={scale <= 0.5}
                className={`p-1.5 rounded transition-colors ${
                  scale <= 0.5
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title={t('zoomOut')}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={resetZoom}
                className="px-2 py-1 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                title={t('resetZoom')}
              >
                {Math.round(scale * 100)}%
              </button>
              <button
                onClick={() => handleZoom(0.2)}
                disabled={scale >= 3.0}
                className={`p-1.5 rounded transition-colors ${
                  scale >= 3.0
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title={t('zoomIn')}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
            
            {/* Translation Controls */}
            <div className="flex items-center space-x-1">
              <button
                onClick={handleTranslationToggle}
                disabled={isLoading}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isLoading
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                    : isTranslateMode
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md'
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                }`}
                title={`${t('keyboardShortcuts.translation')} (Ctrl+T)`}
              >
                <Languages className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {isTranslateMode ? t('hideTranslation') : t('showTranslation')}
                </span>
              </button>
              
              {isTranslateMode && (
                <button
                  onClick={() => setShowOverlay(!showOverlay)}
                  className={`flex items-center space-x-1 px-2 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    showOverlay
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200'
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300 hover:bg-gray-300'
                  }`}
                  title={showOverlay ? t('hideOverlay') : t('showOverlay')}
                >
                  {showOverlay ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              )}
            </div>
            
            {/* Utility Buttons */}
            <div className="flex items-center space-x-1">
              <button
                onClick={handleShare}
                className="flex items-center space-x-1 px-2 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded-lg text-sm transition-colors"
                title={t('share')}
              >
                <Share2 className="w-4 h-4" />
              </button>
              
              <a
                href={pdfUrl}
                download
                className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all hover:shadow-md"
                title={t('download')}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">{t('download')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-gray-200 dark:border-gray-700 bg-yellow-50 dark:bg-yellow-900/20 p-4"
          >
            <div className="text-sm">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {t('keyboardShortcuts.title')}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                    ← →
                  </kbd>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">{t('keyboardShortcuts.navigate')}</span>
                </div>
                <div>
                  <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                    Ctrl +/-
                  </kbd>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">{t('keyboardShortcuts.zoom')}</span>
                </div>
                <div>
                  <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                    Ctrl T
                  </kbd>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">{t('keyboardShortcuts.translation')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Viewer */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex justify-center p-4 overflow-auto min-h-[600px]">
        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-20"
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Loader className="w-10 h-10 text-blue-600 animate-spin" />
                  <div className="absolute inset-0 w-10 h-10 border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
                </div>
                <p className="mt-3 text-gray-600 dark:text-gray-400 font-medium">
                  {t('loadingPage')} {pageNumber}...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PDF Document */}
        <div className="relative shadow-2xl rounded-lg overflow-hidden" style={{ transformOrigin: 'top center' }}>
          <PDFViewer 
            pdfUrl={pdfUrl}
            pageNumber={pageNumber}
            scale={scale}
            isTranslateMode={isTranslateMode}
            showOverlay={showOverlay}
            targetLanguage={i18n.language}
            originalLanguage={originalLanguage}
            documentId={documentId}
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
