import { useTranslation } from 'next-i18next';

const Contact = () => {
  const { t } = useTranslation('common');

  const contactInfo = {
    email: 'badr.ribzat@example.com',
    phone: '+1 (555) 123-4567',
    location: 'International',
    linkedin: 'linkedin.com/in/badrribzat',
    github: 'github.com/BadrRibzat'
  };

  return (
    <section id="contact" className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('contact.title')}</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">@</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('contact.email')}</p>
              <p className="text-gray-800">{contactInfo.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">📞</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('contact.phone')}</p>
              <p className="text-gray-800">{contactInfo.phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">📍</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('contact.location')}</p>
              <p className="text-gray-800">{contactInfo.location}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">in</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('contact.linkedin')}</p>
              <p className="text-gray-800">{contactInfo.linkedin}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">git</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('contact.github')}</p>
              <p className="text-gray-800">{contactInfo.github}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;