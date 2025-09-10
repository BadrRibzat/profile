import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Header = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale, locales, asPath } = router;

  const languages = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    ar: 'العربية',
    ja: '日本語',
    pt: 'Português'
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{t('common.name')}</h1>
            <p className="text-lg text-gray-600">{t('common.title')}</p>
          </div>
          
          <nav className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-4">
              <a href="#about" className="text-gray-700 hover:text-blue-600">{t('common.about')}</a>
              <a href="#experience" className="text-gray-700 hover:text-blue-600">{t('common.experience')}</a>
              <a href="#education" className="text-gray-700 hover:text-blue-600">{t('common.education')}</a>
              <a href="#skills" className="text-gray-700 hover:text-blue-600">{t('common.skills')}</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">{t('common.contact')}</a>
            </div>
            
            <div className="relative">
              <select
                value={locale}
                onChange={(e) => router.push(asPath, asPath, { locale: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {locales?.map((loc) => (
                  <option key={loc} value={loc}>
                    {languages[loc as keyof typeof languages]}
                  </option>
                ))}
              </select>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;