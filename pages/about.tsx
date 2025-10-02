// pages/about.tsx
import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import ProofPack from '../components/ProofPack';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
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
  Target,
  Lightbulb,
  Zap,
  Users,
  MapPin,
  Calendar,
  TrendingUp,
  CheckCircle,
  Star,
  Trophy,
  Clock
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const { t } = useTranslation(['common', 'about']);
  const router = useRouter();
  const { locale } = router;

  const achievements = [
    {
      metric: "106.76%",
      label: t('about:achievements.alxScore', 'ALX Program Score'),
      description: t('about:achievements.alxDescription', 'Exceeded program requirements by completing advanced projects'),
      icon: <Trophy className="w-6 h-6" />
    },
    {
      metric: "18+",
      label: t('about:achievements.monthsStudy', 'Months of Intensive Study'),
      description: t('about:achievements.studyDescription', 'Self-directed learning with 8+ hours daily commitment'),
      icon: <Clock className="w-6 h-6" />
    },
    {
      metric: "6+",
      label: t('about:achievements.languages', 'Programming Languages'),
      description: t('about:achievements.langDescription', 'Proficient in multiple technology stacks'),
      icon: <Code className="w-6 h-6" />
    },
    {
      metric: "10+",
      label: t('about:achievements.certifications', 'Professional Certifications'),
      description: t('about:achievements.certDescription', 'Spanning technical, professional, and language skills'),
      icon: <Award className="w-6 h-6" />
    }
  ];

  const coreStrengths = [
    {
      title: t('about:strengths.resilience.title', 'Exceptional Resilience'),
      description: t('about:strengths.resilience.description', 'Overcame significant health challenges while maintaining academic excellence and professional growth'),
      icon: <Zap className="w-8 h-8 text-yellow-500" />
    },
    {
      title: t('about:strengths.selfDirected.title', 'Self-Directed Learning'),
      description: t('about:strengths.selfDirected.description', 'Mastered complex technologies independently, demonstrating strong autodidactic abilities'),
      icon: <Lightbulb className="w-8 h-8 text-blue-500" />
    },
    {
      title: t('about:strengths.practical.title', 'Practical Problem-Solving'),
      description: t('about:strengths.practical.description', 'Combines hands-on experience from diverse industries with technical expertise'),
      icon: <Target className="w-8 h-8 text-green-500" />
    },
    {
      title: t('about:strengths.global.title', 'Global Perspective'),
      description: t('about:strengths.global.description', 'Multilingual abilities and cultural adaptability ideal for international teams'),
      icon: <Globe className="w-8 h-8 text-purple-500" />
    }
  ];

  const timeline = [
    {
      period: '2023-Present',
      title: t('about:timeline.currentPhase.title', 'Active Job Search & Skill Enhancement'),
      company: t('about:timeline.currentPhase.company', 'International Opportunities Focus'),
      achievements: [
        t('about:timeline.currentPhase.achievement1', 'Built 4 production-ready applications with full documentation'),
        t('about:timeline.currentPhase.achievement2', 'Developed multilingual portfolio supporting 6 languages'),
        t('about:timeline.currentPhase.achievement3', 'Actively pursuing opportunities with visa sponsorship'),
        t('about:timeline.currentPhase.achievement4', 'Maintained health through self-directed nutrition management')
      ],
      type: 'current'
    },
    {
      period: '2022-2023',
      title: t('about:timeline.alx.title', 'ALX Software Engineering Program'),
      company: t('about:timeline.alx.company', 'ALX Africa - Full-Stack Development'),
      achievements: [
        t('about:timeline.alx.achievement1', 'Achieved 106.76% overall score, ranking in top 5% of cohort'),
        t('about:timeline.alx.achievement2', 'Mastered C programming, Python, JavaScript, and system administration'),
        t('about:timeline.alx.achievement3', 'Completed advanced algorithms and data structures projects'),
        t('about:timeline.alx.achievement4', 'Built end-to-end applications with database design and API development')
      ],
      type: 'education'
    },
    {
      period: '2018-2022',
      title: t('about:timeline.transition.title', 'Career Transition & Self-Education'),
      company: t('about:timeline.transition.company', 'Independent Learning & Skill Development'),
      achievements: [
        t('about:timeline.transition.achievement1', 'Self-taught programming fundamentals through online resources'),
        t('about:timeline.transition.achievement2', 'Earned professional certifications in nutrition and wellness'),
        t('about:timeline.transition.achievement3', 'Developed disciplined learning habits with 6+ hours daily study'),
        t('about:timeline.transition.achievement4', 'Successfully managed health condition through dietary expertise')
      ],
      type: 'transition'
    },
    {
      period: '2010-2018',
      title: t('about:timeline.diverse.title', 'Diverse Professional Experience'),
      company: t('about:timeline.diverse.company', 'Multiple Industries - Service & Technical Roles'),
      achievements: [
        t('about:timeline.diverse.achievement1', 'Gained customer service and client relations expertise'),
        t('about:timeline.diverse.achievement2', 'Developed practical skills in logistics and operations'),
        t('about:timeline.diverse.achievement3', 'Earned professional hairstyling certification'),
        t('about:timeline.diverse.achievement4', 'Built strong work ethic despite health challenges')
      ],
      type: 'professional'
    }
  ];

  const skills = [
    { category: 'Backend', items: ['Python', 'FastAPI', 'Flask', 'Node.js', 'PostgreSQL', 'MongoDB'] },
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'] },
    { category: 'DevOps', items: ['Docker', 'CI/CD', 'Git', 'Linux', 'Cloud Deployment', 'API Design'] },
    { category: 'AI/ML', items: ['Machine Learning', 'Data Analysis', 'Natural Language Processing', 'TensorFlow'] }
  ];

  return (
    <Layout>
      <SEOHead
        title={t('about:seo.title', 'About Badr Ribzat | Resilient Full-Stack Engineer Seeking International Opportunities')}
        description={t('about:seo.description', 'Meet Badr Ribzat: a self-taught full-stack engineer who overcame significant challenges to achieve technical excellence. Available for international opportunities with visa sponsorship.')}
        keywords="about, software engineer, full-stack developer, self-taught, resilient, international opportunities, visa sponsorship, Morocco, ALX graduate"
      />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-4">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {t('about:hero.availability', 'Available for International Opportunities')}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-gray-900 dark:text-white">Badr </span>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Ribzat</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {t('about:hero.tagline', 'Self-Taught Full-Stack Engineer | Turning Adversity into Innovation')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                    className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="text-blue-600 dark:text-blue-400 mb-3 flex justify-center">
                      {achievement.icon}
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {achievement.metric}
                    </div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      {achievement.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {achievement.description}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a 
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all duration-300"
                >
                  <Users className="w-5 h-5" />
                  <span>{t('about:hero.buttons.contact', 'Discuss Opportunities')}</span>
                </motion.a>
                <motion.a 
                  href={`/resume/${locale}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-semibold py-4 px-8 rounded-lg border border-gray-300 dark:border-gray-600 shadow-lg transition-all duration-300"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>{t('about:hero.buttons.resume', 'View Resume')}</span>
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 blur-2xl"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl">
                  <div className="aspect-square overflow-hidden rounded-xl mb-6">
                    <img 
                      src="/images/me.jpeg" 
                      alt={t('common:seo.title', 'Badr Ribzat')}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                      <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span>{t('about:hero.location', 'Morocco • Open to Global Relocation')}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                      <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span>{t('about:hero.age', '34 Years Old • Ready to Contribute')}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                      <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span>{t('about:hero.status', 'Actively Seeking Visa Sponsorship')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Strengths Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('about:strengths.title', 'What Sets Me Apart')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('about:strengths.subtitle', 'A unique combination of resilience, technical expertise, and practical experience that drives exceptional results.')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreStrengths.map((strength, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-md">
                    {strength.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {strength.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {strength.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Journey Timeline */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('about:timeline.title', 'Professional Journey')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('about:timeline.subtitle', 'From overcoming personal challenges to achieving technical excellence - a story of determination and growth.')}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-start mb-12 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline line */}
                <div className="absolute left-1/2 top-8 w-px h-full bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2 hidden lg:block"></div>
                
                {/* Content */}
                <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                  <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                    item.type === 'current' ? 'ring-2 ring-green-500 ring-opacity-50' : ''
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        item.type === 'current' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                        item.type === 'education' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                        item.type === 'transition' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                        'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}>
                        {item.period}
                      </span>
                      {item.type === 'current' && (
                        <span className="flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 font-medium">
                      {item.company}
                    </p>
                    <ul className="space-y-2">
                      {item.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="hidden lg:flex absolute left-1/2 top-8 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900 transform -translate-x-1/2 z-10"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('about:skills.title', 'Technical Proficiency')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('about:skills.subtitle', 'Comprehensive full-stack expertise gained through intensive self-directed learning and practical application.')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  {skillGroup.category}
                </h3>
                <div className="space-y-2">
                  {skillGroup.items.map((skill, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('about:cta.title', 'Ready to Make an Impact Together?')}
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              {t('about:cta.description', 'I bring a unique perspective, unwavering determination, and proven technical skills to every challenge. Let\'s build something extraordinary.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                {t('about:cta.contact', 'Start the Conversation')}
              </motion.a>
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                {t('about:cta.projects', 'View My Work')}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <ProofPack locale={locale} />
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
