'use client';

import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {t('about.description')}
            </p>
            <div className="bg-primary-50 p-6 rounded-lg border-l-4 border-primary-600">
              <p className="text-primary-700 font-semibold">
                💡 {t('about.highlight')}
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="font-semibold text-gray-900 mb-2">7+ Languages</h3>
              <p className="text-gray-600 text-sm">Multi-language support for global reach</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="font-semibold text-gray-900 mb-2">Multiple Formats</h3>
              <p className="text-gray-600 text-sm">PDF, Word, and web formats available</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-semibold text-gray-900 mb-2">5 Templates</h3>
              <p className="text-gray-600 text-sm">Professional templates for different industries</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="font-semibold text-gray-900 mb-2">Country-Specific</h3>
              <p className="text-gray-600 text-sm">Adapted to local professional standards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}