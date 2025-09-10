// pages/index.tsx
import React from 'react';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Brain, 
  Heart, 
  Globe, 
  Download, 
  ExternalLink,
  ChevronDown,
  Star,
  Award,
  Target
} from 'lucide-react';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import SkillBadge from '../components/SkillBadge';
import AnimatedCounter from '../components/AnimatedCounter';

const HomePage: React.FC = () => {
  const { t } = useTranslation('home');

  const projects = [
    {
      title: 'Biomedical Detection System',
      description: t('projects.biomedical.description'),
      image: '/images/biomedical-project.jpg',
      technologies: ['Python', 'FastAPI', 'Machine Learning', 'React', 'PostgreSQL'],
      liveUrl: 'https://biomedical-frontend.vercel.app/',
      githubUrl: 'https://github.com/BadrRibzat/biomedical-detection',
      category: 'healthcare'
    },
    {
      title: 'IT Learning Platform',
      description: t('projects.education.description'),
      image: '/images/education-project.jpg',
      technologies: ['Node.js', 'React', 'MongoDB', 'Express'],
      liveUrl: 'https://it-learning-pi.vercel.app/',
      githubUrl: 'https://github.com/BadrRibzat/it-learning',
      category: 'education'
    },
    {
      title: 'AI Chatbot Assistant',
      description: t('projects.chatbot.description'),
      image: '/images/chatbot-project.jpg',
      technologies: ['Python', 'NLP', 'Vector Databases', 'React'],
      liveUrl: 'https://chatbot-assistant-frontend.vercel.app/',
      githubUrl: 'https://github.com/BadrRibzat/chatbot-assistant',
      category: 'ai'
    }
  ];

  const stats = [
    { number: 106.76, suffix: '%', label: t('stats.alxScore') },
    { number: 3, suffix: '+', label: t('stats.projects') },
    { number: 6, suffix: '', label: t('stats.languages') },
    { number: 50, suffix: '+', label: t('stats.technologies') }
  ];

  return (
    <Layout 
      title={t('seo.title')} 
      description={t('seo.description')}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-pattern">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 dark:from-blue-800/30 dark:to-purple-800/30"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Profile Image */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.25, 0, 1],
                delay: 0.2 
              }}
              className="mb-8"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 animate-pulse-slow">
                  <img
                    src="/images/badr-profile.jpg"
                    alt="Badr Ribzat"
                    className="w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white animate-bounce-slow flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4"
            >
              Badr Ribzat
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-6"
            >
              <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t('hero.subtitle')}
              </h2>
              <div className="flex items-center justify-center space-x-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
                <Globe className="w-4 h-4" />
                <span>{t('hero.location')}</span>
                <span>•</span>
                <span>{t('hero.availability')}</span>
              </div>
            </motion.div>

            {/* Key Highlights */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-gray-700/20">
                <Code2 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('hero.highlights.selfTaught')}</div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-gray-700/20">
                <Brain className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('hero.highlights.aiExpert')}</div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-gray-700/20">
                <Heart className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('hero.highlights.resilient')}</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <a
                href="/resume/en"
                target="_blank"
                className="group flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                <span>{t('hero.cta.viewResume')}</span>
              </a>
              <a
                href="#projects"
                className="group flex items-center space-x-2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold py-3 px-8 rounded-full border border-gray-200 dark:border-gray-700 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                <span>{t('hero.cta.viewProjects')}</span>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('projects.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('projects.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'home'])),
    },
  };
};

export default HomePage;
