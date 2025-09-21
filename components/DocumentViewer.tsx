// components/DocumentViewer.tsx
"use client";
import React, { useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import {
  Loader,
  Languages,
  ArrowLeft,
  ArrowRight,
  Download,
  Eye,
  EyeOff,
  ZoomIn,
  ZoomOut,
  Settings,
  Share2,
  FileText,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------------------------
   Tiny loading component that can use the i18n hook
   ------------------------------------------------- */
const PDFViewerLoading: React.FC = () => {
  const { t } = useTranslation("documents");
  return (
    <div className="flex items-center justify-center h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl">
      <div className="text-center">
        <div className="relative mb-4">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
          <div className="absolute inset-0 w-12 h-12 border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">{t("loadingPDFViewer")}</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{t("pleaseWait")}</p>
      </div>
    </div>
  );
};

/* -------------------------------------------------
   Dynamic import of the heavy PDFViewer component
   ------------------------------------------------- */
const PDFViewer = dynamic(
  () => import("./PDFViewer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <PDFViewerLoading />,
  }
);

/* -------------------------------------------------
   Props interface – documentId is required for translation
   ------------------------------------------------- */
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

/* -------------------------------------------------
   Main DocumentViewer component
   ------------------------------------------------- */
const DocumentViewer: React.FC<DocumentViewerProps> = ({
  pdfUrl,
  title,
  description,
  originalLanguage = "ar",
  documentId,
  category = "general",
  issuer,
  dateIssued,
}) => {
  const { t, i18n } = useTranslation("documents");
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isTranslateMode, setIsTranslateMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(1.2);
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /* -------------------------------------------------
     Navigation helpers
     ------------------------------------------------- */
  const changePage = useCallback(
    (offset: number) => {
      const newPage = pageNumber + offset;
      if (newPage >= 1 && newPage <= (numPages || 1)) {
        setPageNumber(newPage);
        setIsLoading(true);
      }
    },
    [pageNumber, numPages]
  );

  const handleZoom = useCallback((factor: number) => {
    setScale((prev) => {
      const next = prev + factor;
      return Math.max(0.5, Math.min(3.0, next));
    });
  }, []);

  const resetZoom = useCallback(() => setScale(1.2), []);

  const jumpToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= (numPages || 1)) {
        setPageNumber(page);
        setIsLoading(true);
      }
    },
    [numPages]
  );

  /* -------------------------------------------------
     PDF load callbacks
     ------------------------------------------------- */
  const handleDocumentLoadSuccess = useCallback((pageCount: number) => {
    setNumPages(pageCount);
    setIsLoading(false);
    setError(null);
  }, []);

  const handlePageLoadSuccess = useCallback(() => setIsLoading(false), []);

  /* -------------------------------------------------
     Translation toggle (+ analytics stub)
     ------------------------------------------------- */
  const handleTranslationToggle = useCallback(() => {
    setIsTranslateMode((prev) => !prev);
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "translation_toggle", {
        document_id: documentId,
        language_pair: `${originalLanguage}_to_${i18n.language}`,
        enabled: !isTranslateMode,
      });
    }
  }, [isTranslateMode, documentId, originalLanguage, i18n.language]);

  /* -------------------------------------------------
     Share button (Web Share API with clipboard fallback)
     ------------------------------------------------- */
  const handleShare = useCallback(async () => {
    const shareData = {
      title,
      text: description || t("shareDescription", "View my professional document"),
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert(t("linkCopied", "Link copied to clipboard!"));
      }
    } catch (err) {
      console.error("Error sharing:", err);
      alert(t("shareFailed", "Failed to share. Please copy the URL manually."));
    }
  }, [title, description, t]);

  /* -------------------------------------------------
     Keyboard shortcuts
     ------------------------------------------------- */
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "+":
          case "=":
            e.preventDefault();
            handleZoom(0.2);
            break;
          case "-":
            e.preventDefault();
            handleZoom(-0.2);
            break;
          case "0":
            e.preventDefault();
            resetZoom();
            break;
          case "t":
          case "T":
            e.preventDefault();
            handleTranslationToggle();
            break;
        }
      } else {
        switch (e.key) {
          case "ArrowLeft":
            if (!showSettings) {
              e.preventDefault();
              changePage(-1);
            }
            break;
          case "ArrowRight":
            if (!showSettings) {
              e.preventDefault();
              changePage(1);
            }
            break;
          case "Escape":
            setShowSettings(false);
            setIsTranslateMode(false);
            break;
        }
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [
    handleZoom,
    resetZoom,
    handleTranslationToggle,
    changePage,
    showSettings,
    isTranslateMode,
  ]);

  /* -------------------------------------------------
     Category badge (color‑coded)
     ------------------------------------------------- */
  const categoryBadge = useMemo(() => {
    const colors = {
      education:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      professional:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      technical:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      health: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      language:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      general: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
    };
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          colors[category as keyof typeof colors] || colors.general
        }`}
      >
        <FileText className="w-3 h-3 mr-1" />
        {t(`categories.${category}`)}
      </span>
    );
  }, [category, t]);

  /* -------------------------------------------------
     Guard: documentId must be provided
     ------------------------------------------------- */
  if (!documentId) {
    return (
      <div className="flex items-center justify-center h-[600px] text-red-600 bg-red-50 dark:bg-red-900/20 rounded-xl">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-lg font-semibold mb-2">{t("configurationError")}</p>
          <p className="text-sm mb-4">{t("documentIdRequired")}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {t("reloadPage")}
          </button>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------
     Main UI
     ------------------------------------------------- */
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
              {categoryBadge}
            </div>

            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              {issuer && (
                <span className="flex items-center space-x-1">
                  <Info className="w-3 h-3" />
                  <span>
                    {t("issuedBy")}: {issuer}
                  </span>
                </span>
              )}
              {dateIssued && (
                <span className="flex items-center space-x-1">
                  <span>
                    {t("issuedOn")}: {dateIssued}
                  </span>
                </span>
              )}
              <span className="flex items-center space-x-1">
                <span>
                  {t("originalLanguage")}: {t(`languages.${originalLanguage}`)}
                </span>
              </span>
              <span className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                <span>
                  {t("documentId")}: {documentId}
                </span>
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title={t("keyboardShortcuts.title")}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <div className="flex flex-wrap justify-between items-center gap-4">
          {/* Pagination */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1 || isLoading}
              className={`p-2 rounded-full transition-all ${
                pageNumber <= 1 || isLoading
                  ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105"
              }`}
              title={`${t("previousPage")} (←)`}
              aria-label={t("previousPage")}
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
                className="w-12 text-center text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`${t("page")} ${pageNumber}`}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t("of")} {numPages || "-"}
              </span>
            </div>

            <button
              onClick={() => changePage(1)}
              disabled={pageNumber >= (numPages || 1) || isLoading}
              className={`p-2 rounded-full transition-all ${
                pageNumber >= (numPages || 1) || isLoading
                  ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105"
              }`}
              title={`${t("nextPage")} (→)`}
              aria-label={t("nextPage")}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            {/* Zoom */}
            <div className="flex items-center space-x-1 bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-600 shadow-sm">
              <button
                onClick={() => handleZoom(-0.2)}
                disabled={scale <= 0.5}
                className={`p-1.5 rounded transition-colors ${
                  scale <= 0.5
                    ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110"
                }`}
                title={`${t("zoomOut")} (Ctrl+-)`}
                aria-label={t("zoomOut")}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={resetZoom}
                className="px-2 py-1 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded font-mono"
                title={`${t("resetZoom")} (Ctrl+0)`}
                aria-label={`${t("resetZoom")} - ${Math.round(scale * 100)}%`}
              >
                {Math.round(scale * 100)}%
              </button>
              <button
                onClick={() => handleZoom(0.2)}
                disabled={scale >= 3.0}
                className={`p-1.5 rounded transition-colors ${
                  scale >= 3.0
                    ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110"
                }`}
                title={`${t("zoomIn")} (Ctrl+=)`}
                aria-label={t("zoomIn")}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Translation toggle */}
            <div className="flex items-center space-x-1">
              <button
                onClick={handleTranslationToggle}
                disabled={isLoading}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isLoading
                    ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
                    : isTranslateMode
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md transform hover:scale-105"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 hover:shadow-md"
                }`}
                title={`${t("keyboardShortcuts.translation")} (Ctrl+T)`}
                aria-label={isTranslateMode ? t("hideTranslation") : t("showTranslation")}
                aria-pressed={isTranslateMode}
              >
                <Languages className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {isTranslateMode ? t("hideTranslation") : t("showTranslation")}
                </span>
              </button>

              {isTranslateMode && (
                <button
                  onClick={() => setShowOverlay(!showOverlay)}
                  className={`flex items-center space-x-1 px-2 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    showOverlay
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 hover:shadow-md"
                      : "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300 hover:bg-gray-300 hover:shadow-md"
                  }`}
                  title={showOverlay ? t("hideOverlay") : t("showOverlay")}
                  aria-label={showOverlay ? t("hideOverlay") : t("showOverlay")}
                  aria-pressed={showOverlay}
                >
                  {showOverlay ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              )}
            </div>

            {/* Share & Download */}
            <div className="flex items-center space-x-1">
              <button
                onClick={handleShare}
                className="flex items-center space-x-1 px-2 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded-lg text-sm transition-all hover:shadow-md hover:scale-105"
                title={t("share")}
                aria-label={t("share")}
              >
                <Share2 className="w-4 h-4" />
              </button>

              <a
                href={pdfUrl}
                download={`${documentId}.pdf`}
                className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:scale-105 transform"
                title={`${t("download")} PDF`}
                aria-label={`${t("download")} PDF document`}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">{t("download")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Settings panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-gray-200 dark:border-gray-700 bg-yellow-50 dark:bg-yellow-900/20 p-4 overflow-hidden"
          >
            <div className="text-sm">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>{t("keyboardShortcuts.title")}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div className="flex items-center space-x-2">
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 min-w-[40px] text-center">
                    ← →
                  </kbd>
                  <span className="text-gray-600 dark:text-gray-400">{t("keyboardShortcuts.navigate")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 min-w-[60px] text-center">
                    Ctrl ±
                  </kbd>
                  <span className="text-gray-600 dark:text-gray-400">{t("keyboardShortcuts.zoom")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 min-w-[50px] text-center">
                    Ctrl T
                  </kbd>
                  <span className="text-gray-600 dark:text-gray-400">{t("keyboardShortcuts.translation")}</span>
                </div>
                <div className="flex items-center space-x-2 sm:col-span-2 md:col-span-3">
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 min-w-[40px] text-center">
                    Esc
                  </kbd>
                  <span className="text-gray-600 dark:text-gray-400">{t("keyboardShortcuts.close")}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Viewer */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex justify-center p-4 overflow-auto min-h-[600px]">
        {/* Loading overlay –‑ handled inside PDFViewer component */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm z-20 rounded-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <Loader className="w-10 h-10 text-blue-600 animate-spin" />
                  <div className="absolute inset-0 w-10 h-10 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-pulse"></div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {t("loadingPage")} {pageNumber}...
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{t("pleaseWait")}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error overlay */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm z-20 rounded-lg"
            >
              <div className="text-center p-6 max-w-md">
                <div className="text-4xl mb-4 text-red-500">⚠️</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t("errors.title")}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{error}</p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <button
                    onClick={() => {
                      setError(null);
                      setIsLoading(true);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    {t("errors.retry")}
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                  >
                    {t("reloadPage")}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actual PDF component */}
        <div className="relative shadow-2xl rounded-lg overflow-hidden" style={{ transformOrigin: "top center" }}>
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

      {/* Translation status bar */}
      {isTranslateMode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-t border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-center justify-between text-sm text-blue-700 dark:text-blue-300">
            <div className="flex items-center space-x-2">
              <Languages className="w-4 h-4" />
              <span>
                {t("translationActive")}: {t(`languages.${originalLanguage}`)} → {t(`languages.${i18n.language}`)}
              </span>
            </div>
            <span className="font-medium">{t("translationNotice.description")}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DocumentViewer;
