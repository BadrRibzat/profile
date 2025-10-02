// components/ResumeGenerator.tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { registerFonts } from "../utils/fontLoader";
import {
  Download,
  Globe,
  Briefcase,
  Award,
  Heart,
  Loader,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import CountrySpecificResume from "./CountrySpecificResume";

const ResumeGenerator: React.FC = () => {
  const router = useRouter();
  const locale = (router.query.locale as string) || router.locale || 'en';
  const { t } = useTranslation("resume");
  const [resumeData, setResumeData] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontError, setFontError] = useState<string | null>(null);

  // Load fonts with retry and error handling
  useEffect(() => {
    const loadFonts = async () => {
      try {
        await registerFonts();
        setFontsLoaded(true);
        console.log('Fonts loaded successfully');
      } catch (error) {
        console.error('Font loading failed:', error);
        setFontError('Failed to load custom fonts. Retrying with fallbacks...');
        // Retry once with fallbacks
        try {
          await registerFonts(); // Assuming registerFonts has fallback logic
          setFontsLoaded(true);
        } catch (retryError) {
          setFontError('Font loading failed completely. Using system defaults.');
          setFontsLoaded(true); // Proceed anyway to avoid blocking
        }
      }
    };
    
    if (isClient) {
      loadFonts();
    }
  }, [isClient]);

  // Load resume data
  useEffect(() => {
    if (!locale) return;
    async function load() {
      try {
        setLoadError(null);
        const mod = await import(`../data/resume/${locale}.json`);
        setResumeData(mod.default);
      } catch (err) {
        console.error(`Resume data missing for ${locale}`, err);
        setLoadError(t("errors.unavailable", "Resume unavailable for {{locale}}", { locale: locale.toUpperCase() }));
        try {
          const fallback = await import(`../data/resume/en.json`);
          setResumeData(fallback.default);
        } catch (fallbackErr) {
          console.error("Fallback resume load failed", fallbackErr);
          setLoadError(t("errors.fallbackFailed", "Failed to load fallback resume"));
        }
      }
    }
    load();
  }, [locale, t]);

  useEffect(() => setIsClient(true), []);

  // Translated strings (unchanged)
  const translatedStrings = {
    summaryTitle: t('summary.title', 'PROFESSIONAL SUMMARY'),
    skillsTitle: t('skills.title', 'TECHNICAL COMPETENCIES'),
    programming: t('skills.programming', 'Programming Languages'),
    backend: t('skills.backend', 'Backend Technologies'),
    frontend: t('skills.frontend', 'Frontend & UI'),
    database: t('skills.database', 'Database & Cloud'),
    experienceTitle: t('experience.title', 'PROFESSIONAL EXPERIENCE'),
    projectsTitle: t('projects.title', 'KEY PROJECTS'),
    tech: t('projects.tech', 'Technologies'),
    liveDemo: t('projects.liveDemo', 'Live Demo'),
    educationTitle: t('education.title', 'EDUCATION & CERTIFICATIONS'),
    achievement: t('achievement', 'Achievement'),
    languagesTitle: t('languages.title', 'LANGUAGES'),
    germanContact: t('german.contact', 'Persönliche Daten'),
    germanBirth: t('german.birth', 'Geburtsdatum'),
    germanNationality: t('german.nationality', 'Nationalität'),
    germanScore: t('german.score', 'Note'),
    germanLanguages: t('german.languages', 'Sprachen'),
    germanSkills: t('german.skills', 'Kernkompetenzen'),
    germanSkill1: t('german.skill1', 'Full-Stack Entwicklung'),
    germanSkill2: t('german.skill2', 'API Design & Integration'),
    germanSkill3: t('german.skill3', 'Datenbank Management'),
    germanSkill4: t('german.skill4', 'Docker & DevOps'),
    germanSkill5: t('german.skill5', 'KI & Machine Learning'),
    germanSummary: t('german.summary', 'Berufliche Zusammenfassung'),
    germanExperience: t('german.experience', 'Berufserfahrung'),
    germanEducation: t('german.education', 'Bildungsweg'),
    germanProjects: t('german.projects', 'Hauptprojekte'),
    japaneseTitle: t('japanese.title', '履 歴 書'),
    japaneseKana: t('japanese.kana', 'ふりがな'),
    japaneseName: t('japanese.name', '氏名'),
    japaneseBirth: t('japanese.birth', '生年月日'),
    japaneseContact: t('japanese.contact', '連絡先'),
    japaneseEducationWork: t('japanese.educationWork', '学歴・職歴'),
    japaneseEducation: t('japanese.education', '学歴'),
    japaneseWork: t('japanese.work', '職歴'),
    japaneseEnd: t('japanese.end', '以上'),
    japaneseCertifications: t('japanese.certifications', '免許・資格'),
    japanesePR: t('japanese.pr', '自己PR'),
    japaneseHopes: t('japanese.hopes', '本人希望記入欄'),
    arabicContact: t('arabic.contact', 'معلومات الاتصال'),
    arabicLanguages: t('arabic.languages', 'اللغات'),
    arabicSkills: t('arabic.skills', 'المهارات التقنية'),
    arabicSkill1: t('arabic.skill1', 'تطوير التطبيقات الشاملة'),
    arabicSkill2: t('arabic.skill2', 'تصميم واجهات البرمجة'),
    arabicSkill3: t('arabic.skill3', 'إدارة قواعد البيانات'),
    arabicSkill4: t('arabic.skill4', 'الذكاء الاصطناعي'),
    arabicSummary: t('arabic.summary', 'الملخص المهني'),
    arabicExperience: t('arabic.experience', 'الخبرة العملية'),
    arabicEducation: t('arabic.education', 'التعليم والشهادات'),
    arabicProjects: t('arabic.projects', 'المشاريع الرئيسية'),
    arabicScore: t('arabic.score', 'التقدير'),
    arabicTech: t('arabic.tech', 'التقنيات'),
    modernContact: t('modern.contact', 'Contact'),
    modernPortfolio: t('modern.portfolio', 'Portfolio'),
    modernLanguages: t('modern.languages', 'Languages'),
    modernSkills: t('modern.skills', 'Skills'),
    modernSkill1: t('modern.skill1', 'Full-Stack Development'),
    modernSkill2: t('modern.skill2', 'API Design & Integration'),
    modernSkill3: t('modern.skill3', 'Database Management'),
    modernSkill4: t('modern.skill4', 'Docker & DevOps'),
    modernSkill5: t('modern.skill5', 'AI & Machine Learning'),
    modernSummary: t('modern.summary', 'Professional Summary'),
    modernExperience: t('modern.experience', 'Experience'),
    modernEducation: t('modern.education', 'Education'),
    modernProjects: t('modern.projects', 'Key Projects'),
    modernScore: t('modern.score', 'Score'),
    modernTech: t('modern.tech', 'Tech'),
  };

  if (loadError && !resumeData) {
    return (
      <div className="flex items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        <AlertCircle className="w-8 h-8 text-red-500" />
        <p className="ml-4 text-red-600 dark:text-red-400">{loadError}</p>
      </div>
    );
  }

  if (!resumeData || !fontsLoaded) {
    return (
      <div className="flex items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
        <p className="ml-4 text-gray-600 dark:text-gray-300">
          {!resumeData ? t("loading", "Loading resume data...") : "Loading fonts..."}
        </p>
      </div>
    );
  }

  const getLocalizedTitle = () => {
    const titles = {
      en: t("titles.professional", "Professional"),
      de: t("titles.german", "German"),
      fr: t("titles.french", "French"),
      es: t("titles.spanish", "Spanish"),
      ar: t("titles.arabic", "Arabic"),
      ja: t("titles.japanese", "Japanese"),
    };
    return titles[locale as keyof typeof titles] || titles.en;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {getLocalizedTitle()} – {locale?.toUpperCase()}
        </h2>
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600 dark:text-gray-400">{t("subtitle", "Multilingual Resume Generator")}</span>
        </div>
      </div>

      {/* Font error notice */}
      {fontError && (
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-700 dark:text-yellow-300 text-sm">
          <AlertCircle className="w-4 h-4 inline mr-2" />
          {fontError}
        </div>
      )}

      {/* Optional fallback notice */}
      {loadError && (
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-700 dark:text-yellow-300 text-sm">
          <AlertCircle className="w-4 h-4 inline mr-2" />
          {loadError} – {t("fallbackNotice", "Please review the translation placeholders.")}
        </div>
      )}

      {/* Preview + download */}
      <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white">{t("preview", "Preview & Download")}</h3>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Award className="w-4 h-4 text-yellow-500" />
              {t("features.atsOptimized", "ATS Optimized")}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-4 h-4 text-green-500" />
              {t("features.visaReady", "Visa Ready")}
            </span>
          </div>
        </div>

        {/* PDF download button */}
        <div className="flex justify-center mt-4">
          {isClient ? (
            <PDFDownloadLink
              document={
                <CountrySpecificResume 
                  data={resumeData} 
                  locale={locale} 
                  translatedStrings={translatedStrings} 
                  fontsLoaded={fontsLoaded}
                />
              }
              fileName={`Badr_Ribzat_Resume_${locale?.toUpperCase()}.pdf`}
            >
              {({ loading, error }) => (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className={`w-full max-w-sm flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : error
                      ? "bg-red-500 text-white"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>{t("buttons.generating", "Generating...")}</span>
                    </>
                  ) : error ? (
                    <>
                      <AlertCircle className="w-5 h-5" />
                      <span>{t("buttons.error", "Error")}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>{t("buttons.download", "Download PDF", { locale: locale?.toUpperCase() })}</span>
                    </>
                  )}
                </motion.button>
              )}
            </PDFDownloadLink>
          ) : (
            <div className="w-full max-w-sm flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-gray-200 dark:bg-gray-700">
              <Loader className="w-5 h-5 animate-spin" />
              <span className="text-gray-600 dark:text-gray-300">{t("buttons.loadingLink", "Loading...")}</span>
            </div>
          )}
        </div>

        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-xs text-green-700 dark:text-green-300">
          <Heart className="w-4 h-4 inline mr-2" />
          {t("cta.description", "My comprehensive skill set and proven track record make me an excellent candidate.")}
        </div>
      </div>

      {/* Template meta-info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">{t("meta.style", "Style")}</h4>
          <p className="text-blue-600 dark:text-blue-400">{t(`meta.styleValues.${locale}`, "Professional Format")}</p>
        </div>
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">{t("meta.optimization", "Optimization")}</h4>
          <p className="text-green-600 dark:text-green-400">{t("meta.optimizationDesc", "ATS & Visa Ready")}</p>
        </div>
        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-1">{t("meta.purpose", "Purpose")}</h4>
          <p className="text-purple-600 dark:text-purple-400">{t("meta.purposeDesc", "Job Applications & Opportunities")}</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeGenerator;
