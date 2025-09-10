import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const PDFGenerator = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale } = router;
  const [isGenerating, setIsGenerating] = useState(false);

  const resumeTemplates = [
    { id: 'modern', name: 'Modern International', description: 'Clean, modern design suitable for tech companies globally' },
    { id: 'traditional', name: 'Traditional/Conservative', description: 'Classic format preferred in traditional industries' },
    { id: 'creative', name: 'Creative', description: 'Artistic design for creative industries' },
    { id: 'european', name: 'European CV', description: 'Standard European CV format' },
    { id: 'american', name: 'American Resume', description: 'US-style resume format' },
    { id: 'asian', name: 'Asian Format', description: 'Format commonly used in Asian countries' }
  ];

  const handleDownloadPDF = async (templateId: string) => {
    setIsGenerating(true);
    try {
      // Simulate PDF generation
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template: templateId,
          language: locale,
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `resume_${templateId}_${locale}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('common.downloadResume')}</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resumeTemplates.map((template) => (
          <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{template.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{template.description}</p>
            <button
              onClick={() => handleDownloadPDF(template.id)}
              disabled={isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              {isGenerating ? 'Generating...' : t('common.downloadPDF')}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Available Formats & Languages</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>Supported Languages:</strong>
            <ul className="list-disc list-inside mt-1">
              <li>English (EN) - International standard</li>
              <li>Español (ES) - Spanish/Latin American markets</li>
              <li>Français (FR) - French/Francophone markets</li>
              <li>Deutsch (DE) - German/Austrian/Swiss markets</li>
              <li>العربية (AR) - Middle Eastern markets</li>
              <li>日本語 (JA) - Japanese market</li>
              <li>Português (PT) - Brazilian/Portuguese markets</li>
            </ul>
          </div>
          <div>
            <strong>Document Features:</strong>
            <ul className="list-disc list-inside mt-1">
              <li>PDF format for universal compatibility</li>
              <li>Country-specific formatting</li>
              <li>Cultural adaptation for different markets</li>
              <li>Professional typography and layout</li>
              <li>ATS (Applicant Tracking System) friendly</li>
              <li>Print-ready high resolution</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PDFGenerator;