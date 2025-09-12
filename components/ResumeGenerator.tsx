// components/ResumeGenerator.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download, FileText, Globe, Briefcase, Award, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import CountrySpecificResume from './CountrySpecificResume';

/* --------------  TYPES  -------------- */
interface ResumeData {
  personalInfo: {
    name: string;
    nameKana?: string;
    title: string;
    location: string;
    phone: string;
    email: string;
    github: string;
    linkedin?: string;
    portfolio: string;
    birthDate?: string;
    nationality?: string;
    visaStatus: string;
    photo?: string;
  };
  objective: string;
  summary: string;
  technicalSkills: {
    languages: string[];
    frontend: string[];
    backend: string[];
    databases: string[];
    tools: string[];
    cloud: string[];
  };
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
    achievements: string[];
    links: { live?: string; github?: string; docs?: string };
  }>;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    period: string;
    achievements: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    period: string;
    score?: string;
    details?: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    credential?: string;
  }>;
  languages: Array<{
    language: string;
    level: string;
    certification?: string;
  }>;
  additionalSkills: string[];
  interests?: string[];
}

/* --------------  COMPONENT  -------------- */
const ResumeGenerator: React.FC = () => {
  const router = useRouter();
  const { locale } = router.query as { locale: string };
  const { t } = useTranslation('resume');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  useEffect(() => {
    if (!locale) return;
    async function load() {
      const mod = await import(`../data/resume/${locale}.json`);
      setResumeData(mod.default);
    }
    load();
  }, [locale]);

  if (!resumeData)
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <p className="text-center text-gray-600">Loading…</p>
      </div>
    );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('title')} – {locale?.toUpperCase()}
        </h2>
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Country-Optimised</span>
        </div>
      </div>

      {/* Preview panel ---------------------------------------------------- */}
      <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white">Résumé Preview</h3>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1"><Award className="w-4 h-4 text-yellow-500" />ATS Optimised</span>
            <span className="flex items-center gap-1"><Briefcase className="w-4 h-4 text-green-500" />Visa-Sponsorship Ready</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Key Strengths</h4>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• ALX Program: 106.76 %</li>
              <li>• 3+ Production Apps</li>
              <li>• Full-Stack Engineer</li>
              <li>• API Documentation Expert</li>
              <li>• Multilingual (5 languages)</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Seeking</h4>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Entry-Level / Internship</li>
              <li>• Apprenticeship (Ausbildung)</li>
              <li>• Training Programs</li>
              <li className="text-green-600 font-medium">• With Visa Sponsorship</li>
            </ul>
          </div>
        </div>

        {/* Download buttons --------------------------------------------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <PDFDownloadLink
            document={<CountrySpecificResume data={resumeData} locale={locale} />}
            fileName={`Badr_Ribzat_${locale}_${new Date().toISOString().slice(0, 10)}.pdf`}
            className="flex-1"
          >
            {({ loading }) => (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'}`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t('generating')}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>{t('download')} PDF</span>
                  </>
                )}
              </motion.button>
            )}
          </PDFDownloadLink>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const win = window.open('', '_blank');
              if (!win) return;
              win.document.write(`<!doctype html>
<html dir="${locale === 'ar' ? 'rtl' : 'ltr'}">
  <head>
    <meta charset="utf-8"/>
    <title>Badr Ribzat – Résumé</title>
    <style>
      body{font-family:'Inter',sans-serif;margin:40px;color:#000;background:#fff}
      h1{font-size:22px;margin-bottom:4px}
      h2{font-size:14px;margin-bottom:6px;border-bottom:1px solid #ddd;padding-bottom:2px}
      .sm{font-size:11px;color:#555}
      .xs{font-size:10px;color:#666}
      .visa{background:#ecfdf5;padding:4px 6px;border-radius:3px;font-size:10px;color:#065f46;margin-top:4px;display:inline-block}
      .section{margin-bottom:14px}
      .badge{display:inline-block;background:#eff6ff;color:#1e40af;padding:2px 5px;border-radius:3px;font-size:9px;margin:2px}
      .grid{display:flex;flex-wrap:wrap;gap:6px}
      ul{margin:4px 0 0 16px;padding:0}
      li{margin-bottom:2px}
      a{color:#2563eb;text-decoration:underline}
      @media print{body{margin:15mm}}
    </style>
  </head>
  <body>${printableHTML(resumeData, locale)}</body></html>`);
              win.document.close();
              win.focus();
              win.print();
            }}
            className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
          >
            <FileText className="w-5 h-5" />
            <span>Print</span>
          </motion.button>
        </div>

        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-xs text-green-700 dark:text-green-300">
          <Heart className="w-4 h-4 inline mr-2" />
          This résumé highlights my self-taught journey. I’m ready to relocate immediately with visa sponsorship.
        </div>
      </div>
    </div>
  );
};

export default ResumeGenerator;

/* --------------  helpers  -------------- */
function printableHTML(d: ResumeData, l: string): string {
  const t = (en: string, ja: string, de: string, fr: string, es: string, ar: string) => {
    if (l === 'ja') return ja;
    if (l === 'de') return de;
    if (l === 'fr') return fr;
    if (l === 'es') return es;
    if (l === 'ar') return ar;
    return en;
  };
  return `
<div class="section">
  <h1>${d.personalInfo.name}</h1>
  <p class="sm">${d.personalInfo.title}</p>
  <p class="xs">${d.personalInfo.location} • ${d.personalInfo.phone} • ${d.personalInfo.email}</p>
  <p class="xs">${d.personalInfo.github} • ${d.personalInfo.portfolio} • ${d.personalInfo.linkedin}</p>
  <div class="visa">${d.personalInfo.visaStatus}</div>
</div>

<div class="section">
  <h2>${t('Objective','志望動機','Zielsetzung','Objectif','Objetivo','الهدف')}</h2>
  <p class="xs">${d.objective}</p>
</div>

<div class="section">
  <h2>${t('Professional Summary','職務要約','Berufliche Zusammenfassung','Résumé Professionnel','Resumen Profesional','الملخص المهني')}</h2>
  <p class="xs">${d.summary}</p>
</div>

<div class="section">
  <h2>${t('Technical Skills','技術スキル','Technische Fähigkeiten','Compétences Techniques','Habilidades Técnicas','المهارات التقنية')}</h2>
  <div class="grid">${d.technicalSkills.languages.map((s) => `<span class="badge">${s}</span>`).join('')}</div>
  <div class="grid">${d.technicalSkills.frontend.map((s) => `<span class="badge">${s}</span>`).join('')}</div>
  <div class="grid">${d.technicalSkills.backend.map((s) => `<span class="badge">${s}</span>`).join('')}</div>
</div>

<div class="section">
  <h2>${t('Education','学歴','Ausbildung','Formation','Educación','التعليم')}</h2>
  ${d.education.map((e) => `<div class="sm">${e.period} – <strong>${e.degree}</strong><br/>${e.institution} ${e.score ? '| ' + e.score : ''}</div>`).join('')}
</div>

<div class="section">
  <h2>${t('Languages','語学力','Sprachen','Langues','Idiomas','اللغات')}</h2>
  <div class="grid">${d.languages.map((l) => `<span class="badge"><strong>${l.language}</strong> ${l.level}</span>`).join('')}</div>
</div>

<div class="section">
  <h2>${t('Certifications','免許・資格','Zertifikate','Certifications','Certificaciones','الشهادات')}</h2>
  ${d.certifications.map((c) => `<div class="xs"><strong>${c.name}</strong> – ${c.issuer} (${c.date}) ${c.credential ? '| ' + c.credential : ''}</div>`).join('')}
</div>
`;
}
