// pages/about.tsx
import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router'; // ✅ ADDED — this was missing
import { motion } from 'framer-motion';
import ProofPack from '../components/ProofPack';
import Layout from '../components/Layout';
import { 
  User, 
  Code, 
  GraduationCap, 
  Award, 
  Globe, 
  Heart, 
  Coffee,
  BookOpen,
  Briefcase,
  Download
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const { t } = useTranslation(['common', 'about']);
  const router = useRouter(); // ✅ Get router
  const { locale } = router;  // ✅ Extract locale — this fixes the error

  // Career timeline data
  const timelineItems = [
    {
      year: '2020-Present',
      title: t('about:timeline.selfTaught.title'),
      description: t('about:timeline.selfTaught.description'),
      icon: <Code className="w-5 h-5" />
    },
    {
      year: '2018-2020',
      title: t('about:timeline.business.title'),
      description: t('about:timeline.business.description'),
      icon: <Briefcase className="w-5 h-5" />
    },
    {
      year: '2016-2018',
      title: t('about:timeline.education.title'),
      description: t('about:timeline.education.description'),
      icon: <GraduationCap className="w-5 h-5" />
    }
  ];

  return (
    <Layout
      title={t('about:seo.title')}
      description={t('about:seo.description')}
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Profile Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2"
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                {t('about:hero.title')}
              </h1>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                {t('about:hero.subtitle')}
              </p>
              
              <div className="mb-8 space-y-4">
                {/* Bio Points */}
                <div className="flex items-start space-x-3">
                  <div className="mt-1 bg-blue-100 dark:bg-blue-900/40 p-2 rounded-full text-blue-600 dark:text-blue-400">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {t('about:hero.location.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t('about:hero.location.description')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="mt-1 bg-purple-100 dark:bg-purple-900/40 p-2 rounded-full text-purple-600 dark:text-purple-400">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {t('about:hero.focus.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t('about:hero.focus.description')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="mt-1 bg-green-100 dark:bg-green-900/40 p-2 rounded-full text-green-600 dark:text-green-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {t('about:hero.achievement.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t('about:hero.achievement.description')}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a 
                  href="/contact" 
                  className="flex items-center justify-center space-x-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-700 transition-all duration-300"
                >
                  <User className="w-5 h-5" />
                  <span>{t('about:hero.buttons.contact')}</span>
                </a>
              </div>
            </motion.div>
            
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full md:w-1/2"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-75 blur-lg"></div>
                <div className="relative aspect-square overflow-hidden rounded-xl border-4 border-white dark:border-gray-800 shadow-2xl">
                  <img 
                    src="/images/me.jpg" 
                    alt="Badr Ribzat" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex space-x-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        6+
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {t('about:hero.stats.languages')}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        10+
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {t('about:hero.stats.certifications')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('about:story.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t('about:story.subtitle')}
            </p>
          </motion.div>

          {/* Career Timeline */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-5 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-800"></div>
              
              {/* Timeline Items */}
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative pl-8 md:pl-0 mb-12"
                >
                  <div className={`flex flex-col md:flex-row items-start md:items-center md:space-x-6 ${index % 2 === 1 ? 'md:flex-row-reverse md:space-x-reverse' : ''}`}>
                    {/* Year Badge */}
                    <div className={`absolute left-0 md:static flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white z-10 ${
                      index % 2 === 1 ? 'md:order-1' : ''
                    }`}>
                      {item.icon}
                    </div>
                    
                    {/* Content */}
                    <div className={`md:w-1/2 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
                        <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full mb-3">
                          {item.year}
                        </span>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Personal Interests */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-10"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {t('about:interests.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {t('about:interests.description')}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-md transition-all duration-300">
                <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <p className="font-medium text-gray-900 dark:text-white">
                  {t('about:interests.items.reading')}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-md transition-all duration-300">
                <Coffee className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <p className="font-medium text-gray-900 dark:text-white">
                  {t('about:interests.items.coffee')}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-md transition-all duration-300">
                <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <p className="font-medium text-gray-900 dark:text-white">
                  {t('about:interests.items.languages')}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-md transition-all duration-300">
                <Heart className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <p className="font-medium text-gray-900 dark:text-white">
                  {t('about:interests.items.cooking')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('about:certifications.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t('about:certifications.subtitle')}
            </p>
          </motion.div>

          {/* Certificate Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Technical Certificates */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="p-1 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
              <div className="p-6">
                <div className="bg-blue-100 dark:bg-blue-900/40 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('about:certifications.technical.title')}
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                    <span>ALX Software Engineering Program (106.76%)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                    <span>IBM Design Thinking Practitioner</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                    <span>Full-Stack Software Engineering</span>
                  </li>
                </ul>
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center"
                >
                  {t('about:certifications.viewAll')}
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Professional Certificates */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="p-1 bg-gradient-to-r from-green-600 to-emerald-500"></div>
              <div className="p-6">
                <div className="bg-green-100 dark:bg-green-900/40 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('about:certifications.professional.title')}
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></span>
                    <span>Professional Hairstylist Certification</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></span>
                    <span>Therapeutic Nutrition Specialist</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></span>
                    <span>CACES R489 & R485 Forklift Operation</span>
                  </li>
                </ul>
                <a
                  href="#"
                  className="text-green-600 dark:text-green-400 font-medium hover:underline inline-flex items-center"
                >
                  {t('about:certifications.viewAll')}
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Languages & Education */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="p-1 bg-gradient-to-r from-purple-600 to-pink-500"></div>
              <div className="p-6">
                <div className="bg-purple-100 dark:bg-purple-900/40 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('about:certifications.languages.title')}
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full"></span>
                    <span>English for Tourism Certificate</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full"></span>
                    <span>Currently Learning: German (Basic)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full"></span>
                    <span>Currently Learning: Spanish (Basic)</span>
                  </li>
                </ul>
                <a
                  href="#"
                  className="text-purple-600 dark:text-purple-400 font-medium hover:underline inline-flex items-center"
                >
                  {t('about:certifications.viewAll')}
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/* ✅ Proof Pack - Desktop Only */}
          <ProofPack locale={locale} />

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                {t('about:cta.title')}
              </h3>
              <p className="text-lg mb-6 opacity-90">
                {t('about:cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  {t('about:cta.button')}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'about'])),
    },
  };
};

export default AboutPage;
