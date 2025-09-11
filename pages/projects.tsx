// pages/projects.tsx
import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';

const ProjectsPage: React.FC = () => {
  const { t } = useTranslation(['common', 'projects']);
  const [filter, setFilter] = useState<string>('all');

  const projects = [
    {
      title: 'Biomedical Detection System',
      description: t('projects:projects.biomedical.description'),
      image: '/images/biomedical-project.jpg',
      technologies: ['Python', 'FastAPI', 'TensorFlow', 'React', 'PostgreSQL', 'Docker', 'Machine Learning'],
      liveUrl: 'https://biomedical-frontend.vercel.app/',
      githubUrl: 'https://github.com/BadrRibzat/biomedical-detection',
      category: 'healthcare' as const,
      apiLinks: [
        { name: 'FastAPI Documentation', url: 'https://biomedical-detection.fly.dev/docs', icon: 'docs' },
        { name: 'API Redoc', url: 'https://biomedical-detection.fly.dev/redoc', icon: 'docs' },
        { name: 'Backend Health Check', url: 'https://biomedical-detection.fly.dev/', icon: 'health' }
      ]
    },
    {
      title: 'IT Learning Platform',
      description: t('projects:projects.education.description'),
      image: '/images/education-project.jpg',
      technologies: ['Node.js', 'Express', 'React', 'MongoDB', 'JWT', 'REST API', 'Socket.io'],
      liveUrl: 'https://it-learning-pi.vercel.app/',
      githubUrl: 'https://github.com/BadrRibzat/it-learning',
      category: 'education' as const,
      apiLinks: [
        { name: 'API Documentation', url: 'https://it-learning-backend.fly.dev/api/docs/', icon: 'docs' },
        { name: 'Health Status', url: 'https://it-learning-backend.fly.dev/api/health', icon: 'health' },
        { name: 'Backend API Base', url: 'https://it-learning-backend.fly.dev/', icon: 'api' }
      ]
    },
    {
      title: 'AI Chatbot Assistant',
      description: t('projects:projects.chatbot.description'),
      image: '/images/chatbot-project.jpg',
      technologies: ['Python', 'FastAPI', 'NLP', 'LangChain', 'Vector DB', 'React', 'WebSockets'],
      liveUrl: 'https://chatbot-assistant-frontend.vercel.app/',
      githubUrl: 'https://github.com/BadrRibzat/chatbot-assistant',
      category: 'ai' as const,
      apiLinks: [
        { name: 'Swagger Documentation', url: 'https://chatbot-backend-badr.fly.dev/docs', icon: 'docs' },
        { name: 'ReDoc Documentation', url: 'https://chatbot-backend-badr.fly.dev/redoc/', icon: 'docs' },
        { name: 'Health Check', url: 'https://chatbot-backend-badr.fly.dev/chat/health/', icon: 'health' },
        { name: 'Admin Panel', url: 'https://chatbot-backend-badr.fly.dev/admin/', icon: 'admin' },
        { name: 'OpenAPI Schema', url: 'https://chatbot-backend-badr.fly.dev/?format=openapi', icon: 'api' }
      ]
    },
    {
      title: 'International Portfolio',
      description: t('projects:projects.portfolio.description'),
      image: '/images/portfolio-project.jpg',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'i18n', 'Framer Motion', 'SEO'],
      liveUrl: 'https://badrribzat.vercel.app',
      githubUrl: 'https://github.com/BadrRibzat/profile',
      category: 'web' as const,
      apiLinks: []
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const filters = [
    { label: t('projects:filters.all'), value: 'all' },
    { label: t('projects:filters.web'), value: 'web' },
    { label: t('projects:filters.healthcare'), value: 'healthcare' },
    { label: t('projects:filters.ai'), value: 'ai' },
    { label: t('projects:filters.education'), value: 'education' }
  ];

  return (
    <Layout
      title={t('projects:seo.title')}
      description={t('projects:seo.description')}
    >
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <div className="container mx-auto px-4">
          {/* Header with Availability Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              {t('projects:title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-4">
              {t('projects:subtitle')}
            </p>
            
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Available for Internships, Entry-Level Positions & Apprenticeships with Visa Sponsorship</span>
            </motion.div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {filters.map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + (index * 0.05) }}
                onClick={() => setFilter(item.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === item.value
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>

          {/* Technical Competencies Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-20 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Production-Ready Technical Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">API Documentation Coverage</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">CI/CD</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Automated Deployments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">Docker</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Containerized Apps</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">Scalable</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Cloud Architecture</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'projects'])),
    },
  };
};

export default ProjectsPage;
