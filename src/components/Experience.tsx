'use client';

import { useTranslation } from 'react-i18next';

export default function Experience() {
  const { t } = useTranslation();

  const experiences = [
    {
      title: "Senior Software Developer",
      company: "Tech Innovation Corp",
      period: "2022 - Present",
      description: "Leading international portfolio platform development"
    },
    {
      title: "Full Stack Developer", 
      company: "Global Solutions Ltd",
      period: "2020 - 2022",
      description: "Developed multi-language applications for international markets"
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('experience.title')}
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="card">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                  <p className="text-primary-600 font-medium">{exp.company}</p>
                </div>
                <span className="text-gray-500 text-sm md:text-base">{exp.period}</span>
              </div>
              <p className="text-gray-600">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}