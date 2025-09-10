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
      technologies: ['Python', 'FastAPI', 'Machine Learning', 'React', 'PostgreSQL'],
      liveUrl: 'https://biomedical-frontend.vercel.app/',
      githubUrl: 'https://github.com/BadrRibzat/biomedical-detection',
      category: 'healthcare'
    },
    {
      title: 'IT Learning Platform',
      description: t('projects:projects.education.description'),
      image: '/images/education-project.jpg',
      technologies: ['Node.js', 'React', 'MongoDB', 'Express'],
      liveUrl: 'https://it-learning-pi.vercel.app/',
      githubUrl: 'https://github.com/BadrRibzat/it-learning',
      category: 'education'
    },
    {
      title: 'AI Chatbot Assistant',
      description: t('projects:projects.chatbot.description'),
      image: '/images/chatbot-project.jpg',
      technologies: ['Python', 'NLP', 'Vector Databases', 'React'],
      liveUrl: 'https://chatbot-assistant-frontend.vercel.app/',
      githubUrl: 'https://github.com/BadrRibzat/chatbot-assistant',
      category: 'ai'
    },
    {
      title: 'Personal Portfolio',
      description: t('projects:projects.portfolio.description'),
      image: '/images/portfolio-project.jpg', 
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'i18n'],
      liveUrl: 'https://badrribzat.dev',
      githubUrl: 'https://github.com/BadrRibzat/profile',
      category: 'web'
    },
    {
      title: 'E-Commerce Dashboard',
      description: t('projects:projects.ecommerce.description'),
      image: '/images/ecommerce-project.jpg',
      technologies: ['React', 'Redux', 'Node.js', 'Chart.js'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'web'
    },
    {
      title: 'Medical Image Analysis Tool',
      description: t('projects:projects.medical.description'),
      image: '/images/medical-project.jpg',
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'Flask'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'healthcare'
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              {t('projects:title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('projects:subtitle')}
            </p>
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
                <ProjectCard 
                  {...project}
                  apiLinks={getApiLinks(project.title)}
                />
              </motion.div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {t('projects:noResults')}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

// Helper function to get API documentation links based on project title
function getApiLinks(projectTitle: string) {
  switch (projectTitle) {
    case 'Biomedical Detection System':
      return [
        { name: 'API Documentation', url: 'https://biomedical-detection.fly.dev/docs', icon: 'docs' },
        { name: 'Backend API', url: 'https://biomedical-detection.fly.dev/', icon: 'api' },
      ];
    case 'IT Learning Platform':
      return [
        { name: 'API Documentation', url: 'https://it-learning-backend.fly.dev/api/docs/', icon: 'docs' },
        { name: 'Health Status', url: 'https://it-learning-backend.fly.dev/api/health', icon: 'health' },
        { name: 'Backend API', url: 'https://it-learning-backend.fly.dev/', icon: 'api' },
      ];
    case 'AI Chatbot Assistant':
      return [
        { name: 'API Documentation', url: 'https://chatbot-backend-badr.fly.dev/redoc/', icon: 'docs' },
        { name: 'Health Status', url: 'http://chatbot-backend-badr.fly.dev/chat/health/', icon: 'health' },
        { name: 'Admin Panel', url: 'https://chatbot-backend-badr.fly.dev/admin/login/?next=/admin/', icon: 'admin' },
        { name: 'Backend API', url: 'https://chatbot-backend-badr.fly.dev/', icon: 'api' },
      ];
    default:
      return [];
  }
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'projects'])),
    },
  };
};

export default ProjectsPage;
