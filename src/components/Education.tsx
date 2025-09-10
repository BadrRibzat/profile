import { useTranslation } from 'next-i18next';

const Education = () => {
  const { t } = useTranslation('common');

  const education = [
    {
      institution: 'International University of Technology',
      degree: 'Master of Science in Computer Science',
      year: '2019'
    },
    {
      institution: 'Global Technical Institute',
      degree: 'Bachelor of Engineering in Software Engineering',
      year: '2017'
    }
  ];

  return (
    <section id="education" className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('education.title')}</h2>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="border-l-4 border-green-500 pl-6">
            <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
            <p className="text-lg text-green-600 font-medium">{edu.institution}</p>
            <p className="text-sm text-gray-500">{edu.year}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;