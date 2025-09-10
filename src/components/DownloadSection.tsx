'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function DownloadSection() {
  const { t, i18n } = useTranslation();
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);

  const formats = [
    { id: 'pdf', name: t('formats.pdf'), icon: '📄' },
    { id: 'docx', name: t('formats.docx'), icon: '📝' },
    { id: 'html', name: t('formats.html'), icon: '🌐' },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];

  const templates = [
    { id: 'modern', name: t('templates.modern'), preview: '🎨' },
    { id: 'classic', name: t('templates.classic'), preview: '📜' },
    { id: 'minimalist', name: t('templates.minimalist'), preview: '✨' },
    { id: 'academic', name: t('templates.academic'), preview: '🎓' },
    { id: 'creative', name: t('templates.creative'), preview: '🌈' },
  ];

  const generateDocument = async () => {
    setIsGenerating(true);
    
    try {
      if (selectedFormat === 'pdf') {
        await generatePDF();
      } else if (selectedFormat === 'html') {
        generateHTML();
      } else if (selectedFormat === 'docx') {
        generateDOCX();
      }
    } catch (error) {
      console.error('Error generating document:', error);
      alert('Error generating document. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePDF = async () => {
    const pdf = new jsPDF();
    
    // Add content based on selected language and template
    pdf.setFontSize(20);
    pdf.text(t('hero.name'), 20, 30);
    
    pdf.setFontSize(14);
    pdf.text(t('hero.title'), 20, 50);
    
    pdf.setFontSize(12);
    const description = pdf.splitTextToSize(t('hero.description'), 170);
    pdf.text(description, 20, 70);
    
    // Add sections
    pdf.setFontSize(16);
    pdf.text(t('about.title'), 20, 120);
    
    pdf.setFontSize(12);
    const aboutText = pdf.splitTextToSize(t('about.description'), 170);
    pdf.text(aboutText, 20, 140);
    
    // Save the PDF
    pdf.save(`portfolio-${selectedLanguage}-${selectedTemplate}.pdf`);
  };

  const generateHTML = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="${selectedLanguage}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${t('hero.name')} - ${t('hero.title')}</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 40px; }
          .section { margin-bottom: 30px; }
          h1 { color: #2563eb; font-size: 2.5em; margin-bottom: 10px; }
          h2 { color: #1d4ed8; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; }
          .template-${selectedTemplate} { /* Template-specific styles */ }
        </style>
      </head>
      <body class="template-${selectedTemplate}">
        <div class="header">
          <h1>${t('hero.name')}</h1>
          <p style="font-size: 1.2em; color: #666;">${t('hero.title')}</p>
        </div>
        <div class="section">
          <h2>${t('about.title')}</h2>
          <p>${t('about.description')}</p>
        </div>
        <div class="section">
          <h2>${t('experience.title')}</h2>
          <p>Professional experience content would go here...</p>
        </div>
        <div class="section">
          <h2>${t('skills.title')}</h2>
          <p>Skills content would go here...</p>
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${selectedLanguage}-${selectedTemplate}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateDOCX = () => {
    // Simplified DOCX generation - in a real app, you'd use a library like docx
    const content = `
${t('hero.name')}
${t('hero.title')}

${t('about.title')}
${t('about.description')}

${t('experience.title')}
Professional experience content...

${t('skills.title')}
Skills content...
    `;
    
    const blob = new Blob([content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${selectedLanguage}-${selectedTemplate}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="download" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('download.title')}
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate your professional portfolio in multiple formats and languages
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Format Selection */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('download.format')}
              </h3>
              <div className="space-y-3">
                {formats.map((format) => (
                  <label key={format.id} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value={format.id}
                      checked={selectedFormat === format.id}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                      className="mr-3 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="mr-2">{format.icon}</span>
                    <span className="text-gray-700">{format.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('download.language')}
              </h3>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Template Selection */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('download.template')}
              </h3>
              <div className="space-y-3">
                {templates.map((template) => (
                  <label key={template.id} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="template"
                      value={template.id}
                      checked={selectedTemplate === template.id}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                      className="mr-3 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="mr-2">{template.preview}</span>
                    <span className="text-gray-700">{template.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={generateDocument}
              disabled={isGenerating}
              className={`btn-primary px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                isGenerating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                  Generating...
                </>
              ) : (
                <>
                  📥 {t('download.generate')}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}