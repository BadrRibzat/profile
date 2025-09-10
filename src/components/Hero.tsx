'use client';

import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDownload = () => {
    const element = document.getElementById('download');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-16 min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Profile Image Placeholder */}
          <div className="mb-8">
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
              BR
            </div>
          </div>

          {/* Hero Content */}
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-600 mb-4">
              {t('hero.greeting')}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('hero.name')}
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-600 mb-8">
              {t('hero.title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={scrollToDownload}
                className="btn-primary px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                📄 {t('hero.downloadCV')}
              </button>
              <button
                onClick={scrollToContact}
                className="bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                💬 {t('hero.contactMe')}
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce">
            <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}