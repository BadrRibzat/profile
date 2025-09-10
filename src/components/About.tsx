import { useTranslation } from 'next-i18next';

const About = () => {
  const { t } = useTranslation('common');

  return (
    <section id="about" className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('about.title')}</h2>
      <div className="prose max-w-none">
        <p className="text-gray-700 leading-relaxed text-lg">
          {t('about.description')}
        </p>
      </div>
    </section>
  );
};

export default About;