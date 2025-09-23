// components/ResumeGenerator.tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { PDFDownloadLink } from "@react-pdf/renderer";
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
  // Use router.locale as fallback
  const locale = (router.query.locale as string) || router.locale || 'en';
  const { t } = useTranslation("resume");
  const [resumeData, setResumeData] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  /* -------------------------------------------------
     Load the locale‑specific JSON (fallback to English)
     ------------------------------------------------- */
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
        // Fallback to English
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

  // Ensure PDFDownloadLink only renders client‑side
  useEffect(() => setIsClient(true), []);

  /* -------------------------------------------------
     Pre-translate all strings for PDF
     ------------------------------------------------- */
  const translatedStrings = {
    // Summary
    summaryTitle: t('resume:summary.title', 'PROFESSIONAL SUMMARY'),
    // Skills
    skillsTitle: t('resume:skills.title', 'TECHNICAL COMPETENCIES'),
    programming: t('resume:skills.programming', 'Programming Languages'),
    backend: t('resume:skills.backend', 'Backend Technologies'),
    frontend: t('resume:skills.frontend', 'Frontend & UI'),
    database: t('resume:skills.database', 'Database & Cloud'),
    // Experience
    experienceTitle: t('resume:experience.title', 'PROFESSIONAL EXPERIENCE'),
    // Projects
    projectsTitle: t('resume:projects.title', 'KEY PROJECTS'),
    tech: t('resume:projects.tech', 'Technologies'),
    liveDemo: t('resume:projects.liveDemo', 'Live Demo'),
    // Education
    educationTitle: t('resume:education.title', 'EDUCATION & CERTIFICATIONS'),
    achievement: t('resume:education.achievement', 'Achievement'),
    // Languages
    languagesTitle: t('resume:languages.title', 'LANGUAGES'),
    // German
    germanContact: t('resume:german.contact', 'Persönliche Daten'),
    germanBirth: t('resume:german.birth', 'Geburtsdatum'),
    germanNationality: t('resume:german.nationality', 'Nationalität'),
    germanScore: t('resume:german.score', 'Note'),
    germanLanguages: t('resume:german.languages', 'Sprachen'),
    germanSkills: t('resume:german.skills', 'Kernkompetenzen'),
    germanSkill1: t('resume:german.skill1', 'Full-Stack Entwicklung'),
    germanSkill2: t('resume:german.skill2', 'API Design & Integration'),
    germanSkill3: t('resume:german.skill3', 'Datenbank Management'),
    germanSkill4: t('resume:german.skill4', 'Docker & DevOps'),
    germanSkill5: t('resume:german.skill5', 'KI & Machine Learning'),
    germanSummary: t('resume:german.summary', 'Berufliche Zusammenfassung'),
    germanExperience: t('resume:german.experience', 'Berufserfahrung'),
    germanEducation: t('resume:german.education', 'Bildungsweg'),
    germanProjects: t('resume:german.projects', 'Hauptprojekte'),
    // Japanese
    japaneseTitle: t('resume:japanese.title', '履 歴 書'),
    japaneseKana: t('resume:japanese.kana', 'ふりがな'),
    japaneseName: t('resume:japanese.name', '氏名'),
    japaneseBirth: t('resume:japanese.birth', '生年月日'),
    japaneseContact: t('resume:japanese.contact', '連絡先'),
    japaneseEducationWork: t('resume:japanese.educationWork', '学歴・職歴'),
    japaneseEducation: t('resume:japanese.education', '学歴'),
    japaneseWork: t('resume:japanese.work', '職歴'),
    japaneseEnd: t('resume:japanese.end', '以上'),
    japaneseCertifications: t('resume:japanese.certifications', '免許・資格'),
    japanesePR: t('resume:japanese.pr', '自己PR'),
    japaneseHopes: t('resume:japanese.hopes', '本人希望記入欄'),
    // Arabic
    arabicContact: t('resume:arabic.contact', 'معلومات الاتصال'),
    arabicLanguages: t('resume:arabic.languages', 'اللغات'),
    arabicSkills: t('resume:arabic.skills', 'المهارات التقنية'),
    arabicSkill1: t('resume:arabic.skill1', 'تطوير التطبيقات الشاملة'),
    arabicSkill2: t('resume:arabic.skill2', 'تصميم واجهات البرمجة'),
    arabicSkill3: t('resume:arabic.skill3', 'إدارة قواعد البيانات'),
    arabicSkill4: t('resume:arabic.skill4', 'الذكاء الاصطناعي'),
    arabicSummary: t('resume:arabic.summary', 'الملخص المهني'),
    arabicExperience: t('resume:arabic.experience', 'الخبرة العملية'),
    arabicEducation: t('resume:arabic.education', 'التعليم والشهادات'),
    arabicProjects: t('resume:arabic.projects', 'المشاريع الرئيسية'),
    arabicScore: t('resume:arabic.score', 'التقدير'),
    arabicTech: t('resume:arabic.tech', 'التقنيات'),
    // Modern (French/Spanish)
    modernContact: t('resume:modern.contact', 'Contact', 'Contacto'),
    modernPortfolio: t('resume:modern.portfolio', 'Portfolio', 'Portafolio'),
    modernLanguages: t('resume:modern.languages', 'Languages', 'Idiomas'),
    modernSkills: t('resume:modern.skills', 'Skills', 'Habilidades'),
    modernSkill1: t('resume:modern.skill1', 'Full-Stack Development', 'Desarrollo Full-Stack'),
    modernSkill2: t('resume:modern.skill2', 'API Design & Integration', 'Diseño e Integración de APIs'),
    modernSkill3: t('resume:modern.skill3', 'Database Management', 'Gestión de Bases de Datos'),
    modernSkill4: t('resume:modern.skill4', 'Docker & DevOps', 'Docker & DevOps'),
    modernSkill5: t('resume:modern.skill5', 'AI & Machine Learning', 'IA y Aprendizaje Automático'),
    modernSummary: t('resume:modern.summary', 'Professional Summary', 'Resumen Profesional'),
    modernExperience: t('resume:modern.experience', 'Experience', 'Experiencia'),
    modernEducation: t('resume:modern.education', 'Education', 'Educación'),
    modernProjects: t('resume:modern.projects', 'Key Projects', 'Proyectos Clave'),
    modernScore: t('resume:modern.score', 'Score', 'Puntuación'),
    modernTech: t('resume:modern.tech', 'Tech', 'Tecnologías'),
  };

  /* -------------------------------------------------
     UI – error / loading / main view
     ------------------------------------------------- */
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
        <p className="ml-4 text-gray-600 dark:text-gray-300">{t("loading", "Loading...")}</p>
      </div>
    );
  }

  /* -------------------------------------------------
     Localised title based on locale
     ------------------------------------------------- */
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
              document={<CountrySpecificResume data={resumeData} locale={locale} translatedStrings={translatedStrings} />}
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

        {/* Small tagline */}
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-xs text-green-700 dark:text-green-300">
          <Heart className="w-4 h-4 inline mr-2" />
          {t("cta.description", "My comprehensive skill set and proven track record make me an excellent candidate.")}
        </div>
      </div>

      {/* Template meta‑info */}
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
