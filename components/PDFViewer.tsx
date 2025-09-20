// components/PDFViewer.tsx
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useTranslation } from 'next-i18next';
import { Loader } from 'lucide-react';
import { translateText } from '../data/document-translations';

// Enhanced worker setup with fallbacks
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

interface TextItem {
  text: string;
  translatedText: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PDFViewerProps {
  pdfUrl: string;
  pageNumber: number;
  scale: number;
  isTranslateMode: boolean;
  showOverlay: boolean;
  targetLanguage: string;
  originalLanguage: string;
  documentId: string;
  onDocumentLoadSuccess: (pageCount: number) => void;
  onPageLoadSuccess: () => void;
  isLoading?: boolean;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({
  pdfUrl,
  pageNumber,
  scale,
  isTranslateMode,
  showOverlay,
  targetLanguage,
  originalLanguage,
  documentId,
  onDocumentLoadSuccess,
  onPageLoadSuccess,
  isLoading = false,
}) => {
  const { t } = useTranslation('documents');
  const [textItems, setTextItems] = useState<TextItem[]>([]);
  const [pageWidth, setPageWidth] = useState<number>(0);
  const [pageHeight, setPageHeight] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState<boolean>(false);

  // Enhanced translation indicator
  const getTranslationOverlay = () => {
    if (!isTranslateMode || !showOverlay) return null;
    
    return (
      <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-lg text-sm z-10 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span>
            Translation: {originalLanguage.toUpperCase()} → {targetLanguage.toUpperCase()}
          </span>
        </div>
      </div>
    );
  };

  // Enhanced text extraction with better positioning
  const extractTextFromPage = useCallback(async (pdf: any, pageNum: number) => {
    try {
      setLoadingText(true);
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const viewport = page.getViewport({ scale });
      
      setPageWidth(viewport.width);
      setPageHeight(viewport.height);

      const items: TextItem[] = textContent.items
        .filter((item: any) => item.str && item.str.trim())
        .map((item: any) => {
          const translatedText = translateText(
            item.str.trim(), 
            targetLanguage, 
            originalLanguage, 
            documentId
          );
          
          return {
            text: item.str.trim(),
            translatedText,
            x: item.transform[4],
            y: viewport.height - item.transform[5] - (item.height || 12),
            width: item.width || item.str.length * 8,
            height: item.height || 12,
          };
        })
        .filter((item: TextItem) => item.translatedText);

      return items;
    } catch (error) {
      console.error('Error extracting text:', error);
      return [];
    } finally {
      setLoadingText(false);
    }
  }, [scale, targetLanguage, originalLanguage, documentId]);

  // Load text items when translation mode changes
  useEffect(() => {
    async function loadTextItems() {
      if (isTranslateMode && typeof window !== 'undefined') {
        try {
          const pdf = await pdfjs.getDocument(pdfUrl).promise;
          const items = await extractTextFromPage(pdf, pageNumber);
          setTextItems(items);
        } catch (error) {
          console.error('Error loading text items:', error);
          setTextItems([]);
        }
      } else {
        setTextItems([]);
      }
    }
    
    loadTextItems();
  }, [isTranslateMode, pageNumber, pdfUrl, extractTextFromPage]);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setError(null);
    onDocumentLoadSuccess(numPages);
  };

  const handlePageLoadSuccess = () => {
    setError(null);
    onPageLoadSuccess();
  };

  const handleDocumentLoadError = (error: Error) => {
    console.error('PDF load error:', error);
    setError('Failed to load PDF document');
  };

  const handlePageLoadError = (error: Error) => {
    console.error('Page load error:', error);
    setError('Failed to load PDF page');
  };

  // SSR protection
  if (typeof window === 'undefined') {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-100 dark:bg-gray-800 rounded-xl">
        <Loader className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  // Error display
  if (error) {
    return (
      <div className="flex items-center justify-center h-[600px] text-red-600 bg-red-50 dark:bg-red-900/20 rounded-xl">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-lg font-semibold mb-2">Error Loading PDF</p>
          <p className="text-sm mb-4">{error}</p>
          <button 
            onClick={() => {
              setError(null);
              window.location.reload();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {getTranslationOverlay()}
      
      {/* Loading text overlay */}
      {loadingText && (
        <div className="absolute top-12 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs z-10">
          Extracting text...
        </div>
      )}

      <Document
        file={pdfUrl}
        onLoadSuccess={handleDocumentLoadSuccess}
        onLoadError={handleDocumentLoadError}
        loading={
          <div className="flex items-center justify-center h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <div className="text-center">
              <div className="relative">
                <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
                <div className="absolute inset-0 w-12 h-12 border-4 border-blue-200 rounded-full"></div>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
                Loading Document...
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                Please wait...
              </p>
            </div>
          </div>
        }
        error={
          <div className="flex items-center justify-center h-[600px] text-red-600 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📄❌</div>
              <p className="text-lg font-semibold">Failed to load document</p>
              <p className="text-sm text-gray-600 mt-2">Please check your connection</p>
            </div>
          </div>
        }
        options={{
          cMapUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
          cMapPacked: true,
          standardFontDataUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
          disableWorker: false,
        }}
      >
        <div className="relative">
          <Page
            pageNumber={pageNumber}
            scale={scale}
            onLoadSuccess={handlePageLoadSuccess}
            onLoadError={handlePageLoadError}
            loading={
              <div className="flex items-center justify-center h-[400px] bg-gray-50 dark:bg-gray-800">
                <div className="text-center">
                  <Loader className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Loading page {pageNumber}...
                  </p>
                </div>
              </div>
            }
            error={
              <div className="flex items-center justify-center h-[400px] text-red-600 bg-red-50 dark:bg-red-900/20">
                <div className="text-center">
                  <p className="font-semibold">Failed to load page</p>
                  <p className="text-sm">Try another page</p>
                </div>
              </div>
            }
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
          
          {/* Enhanced translation overlay */}
          {isTranslateMode && showOverlay && textItems.length > 0 && (
            <div 
              className="absolute top-0 left-0 pointer-events-none z-10"
              style={{
                width: pageWidth * scale,
                height: pageHeight * scale,
              }}
            >
              {textItems.map((item, index) => (
                <div
                  key={index}
                  className="absolute bg-gradient-to-r from-blue-600 to-purple-600 text-white px-1.5 py-0.5 rounded shadow-lg transition-opacity hover:opacity-100"
                  style={{
                    left: Math.max(0, item.x * scale),
                    top: Math.max(0, item.y * scale),
                    maxWidth: Math.min(item.width * scale * 1.5, 300),
                    fontSize: `${Math.max(8, 10 * scale)}px`,
                    lineHeight: '1.2',
                    opacity: 0.92,
                    backdropFilter: 'blur(1px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                  title={`Original: ${item.text}`}
                >
                  <span className="font-medium">
                    {item.translatedText}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Translation stats */}
          {isTranslateMode && showOverlay && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs z-10">
              {textItems.length} translations found
            </div>
          )}
        </div>
      </Document>
    </div>
  );
};

export default PDFViewer;
