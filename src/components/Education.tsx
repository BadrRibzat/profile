'use client';

import { useTranslation } from 'react-i18next';

export default function Education() {
  const { t } = useTranslation();

  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('education.title')}
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

        <div className="card max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Computer Science Degree
            </h3>
            <p className="text-primary-600 font-medium mb-2">International University</p>
            <p className="text-gray-500">2016 - 2020</p>
            <p className="text-gray-600 mt-4">
              Specialized in software engineering with focus on international applications and multi-language systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}