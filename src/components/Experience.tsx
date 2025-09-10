import { useTranslation } from 'next-i18next';

const Experience = () => {
  const { t } = useTranslation('common');

  const experiences = [
    {
      company: 'International Tech Solutions',
      position: 'Senior Full Stack Developer',
      duration: '2022 - Present',
      description: 'Leading development of international applications with multi-language support and global deployment.'
    },
    {
      company: 'Global Software Inc.',
      position: 'Frontend Developer',
      duration: '2020 - 2022',
      description: 'Developed responsive web applications for diverse international markets with focus on localization.'
    },
    {
      company: 'Startup Innovations',
      position: 'Junior Developer',
      duration: '2019 - 2020',
      description: 'Built cross-platform applications and gained experience in international software development practices.'
    }
  ];

  return (
    <section id="experience" className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('experience.title')}</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
            <p className="text-lg text-blue-600 font-medium">{exp.company}</p>
            <p className="text-sm text-gray-500 mb-2">{exp.duration}</p>
            <p className="text-gray-700">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;