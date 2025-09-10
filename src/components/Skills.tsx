import { useTranslation } from 'next-i18next';

const Skills = () => {
  const { t } = useTranslation('common');

  const technicalSkills = [
    'JavaScript/TypeScript', 'React.js', 'Next.js', 'Node.js', 'Python',
    'HTML/CSS', 'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'Git'
  ];

  const languages = [
    { name: 'English', level: 'Native' },
    { name: 'Arabic', level: 'Native' },
    { name: 'French', level: 'Fluent' },
    { name: 'Spanish', level: 'Intermediate' },
    { name: 'German', level: 'Basic' },
    { name: 'Japanese', level: 'Basic' }
  ];

  const tools = [
    'Visual Studio Code', 'Docker', 'AWS', 'Vercel', 'Figma',
    'Adobe Creative Suite', 'Postman', 'Jira', 'Slack', 'Notion'
  ];

  return (
    <section id="skills" className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('skills.title')}</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('skills.technical')}</h3>
          <div className="flex flex-wrap gap-2">
            {technicalSkills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('skills.languages')}</h3>
          <div className="space-y-2">
            {languages.map((lang, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-700">{lang.name}</span>
                <span className="text-sm text-gray-500">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('skills.tools')}</h3>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, index) => (
              <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;