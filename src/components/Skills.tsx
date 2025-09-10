'use client';

import { useTranslation } from 'react-i18next';

export default function Skills() {
  const { t } = useTranslation();

  const skillCategories = [
    {
      category: "Frontend Development",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"]
    },
    {
      category: "Backend Development", 
      skills: ["Node.js", "Python", "Java", "REST APIs", "GraphQL", "Database Design"]
    },
    {
      category: "Internationalization",
      skills: ["i18next", "Multi-language Support", "Cultural Adaptation", "RTL Languages"]
    },
    {
      category: "Document Generation",
      skills: ["PDF Generation", "HTML to PDF", "Template Systems", "Print Layouts"]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('skills.title')}
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm text-center">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}