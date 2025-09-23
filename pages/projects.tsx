// pages/projects.tsx - FIXED VERSION
import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import SEOHead from '../components/SEOHead';
import { 
  Code2, 
  Database, 
  Globe, 
  Zap, 
  Users, 
  Heart, 
  MapPin, 
  Calendar,
  TrendingUp,
  CheckCircle,
  ExternalLink,
  Github,
  Award,
  Target
} from 'lucide-react';

const ProjectsPage: React.FC = () => {
  const { t } = useTranslation(['common', 'projects']);
  const [filter, setFilter] = useState<string>('all');

  // Safe translation function with fallbacks
  const safeTranslate = (key: string, fallback: string) => {
    try {
      return t(key, fallback);
    } catch (error) {
      console.warn(`Translation key "${key}" not found, using fallback`);
      return fallback;
    }
  };

  const projects = [
    {
      title: safeTranslate('projects:projects.biomedical.title', 'AI Biomedical Detection System'),
      description: safeTranslate('projects:projects.biomedical.description', 'Advanced AI-powered healthcare platform combining machine learning with medical diagnostics.'),
      image: '/images/biomedical-project.jpg',
      technologies: ['Python', 'FastAPI', 'TensorFlow', 'React', 'PostgreSQL', 'Docker', 'Machine Learning', 'AI'],
      liveUrl: 'https://biomedical-frontend.vercel.app/',
      githubUrl: 'https://github.com/BadrRibzat/biomedical-detection',
      category: 'healthcare' as const,
      featured: true,
      impact: safeTranslate('projects:projects.biomedical.impact', 'Addresses critical healthcare challenges through AI-driven diagnostic assistance'),
      apiLinks: [
        { name: 'FastAPI Documentation', url: 'https://biomedical-detection.fly.dev/docs', icon: 'docs' },
        { name: 'API Redoc', url: 'https://biomedical-detection.fly.dev/redoc', icon: 'docs' },
        { name: 'Backend Health Check', url: 'https://biomedical-detection.fly.dev/', icon: 'health' }
      ]
    },
    {
      title: safeTranslate('projects:projects.education.title', 'Comprehensive IT Learning Platform'),
      description: safeTranslate('projects:projects.education.description', 'Full-stack educational technology solution with advanced course management and real-time analytics.'),
      image: '/images/education-project.jpg',
      technologies: ['Node.js', 'Express', 'React', 'MongoDB', 'JWT', 'REST API', 'Socket.io', 'Analytics'],
      liveUrl: 'https://it-learning-pi.vercel.app/',
      githubUrl: 'https://github.com/BadrRibzat/it-learning',
      category: 'education' as const,
      featured: true,
      impact: safeTranslate('projects:projects.education.impact', 'Democratizes access to quality technical education'),
      apiLinks: [
        { name: 'API Documentation', url: 'https://it-learning-backend.fly.dev/api/docs/', icon: 'docs' },
        { name: 'Health Status', url: 'https://it-learning-backend.fly.dev/api/health', icon: 'health' },
        { name: 'Backend API Base', url: 'https://it-learning-backend.fly.dev/', icon: 'api' }
      ]
    },
    {
      title: safeTranslate('projects:projects.chatbot.title', 'Intelligent AI Chatbot Assistant'),
      description: safeTranslate('projects:projects.chatbot.description', 'Sophisticated conversational AI platform with natural language processing and context awareness.'),
      image: '/images/chatbot-project.jpg',
      technologies: ['Python', 'FastAPI', 'NLP', 'LangChain', 'Vector DB', 'React', 'WebSockets', 'AI'],
      liveUrl: 'https://chatbot-assistant-frontend.vercel.app/',
      githubUrl: 'https://github.com/BadrRibzat/chatbot-assistant',
      category: 'ai' as const,
      featured: true,
      impact: safeTranslate('projects:projects.chatbot.impact', 'Enhances user interaction through intelligent conversation'),
      apiLinks: [
        { name: 'Swagger Documentation', url: 'https://chatbot-backend-badr.fly.dev/docs', icon: 'docs' },
        { name: 'ReDoc Documentation', url: 'https://chatbot-backend-badr.fly.dev/redoc/', icon: 'docs' },
        { name: 'Health Check', url: 'https://chatbot-backend-badr.fly.dev/chat/health/', icon: 'health' },
        { name: 'Admin Panel', url: 'https://chatbot-backend-badr.fly.dev/admin/', icon: 'admin' },
        { name: 'OpenAPI Schema', url: 'https://chatbot-backend-badr.fly.dev/?format=openapi', icon: 'api' }
      ]
    },
    {
      title: safeTranslate('projects:projects.portfolio.title', 'International Multilingual Portfolio'),
      description: safeTranslate('projects:projects.portfolio.description', 'Comprehensive professional portfolio with ATS-optimized resume generation in 6 languages.'),
      image: '/images/portfolio-project.jpg',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'i18n', 'Framer Motion', 'SEO', 'PDF Generation'],
      liveUrl: 'https://badrribzat.vercel.app',
      githubUrl: 'https://github.com/BadrRibzat/profile',
      category: 'web' as const,
      featured: false,
      impact: safeTranslate('projects:projects.portfolio.impact', 'Bridges language barriers for international job opportunities'),
      apiLinks: []
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const featuredProjects = projects.filter(project => project.featured);

  const filters = [
    { label: safeTranslate('projects:filters.all', 'All Projects'), value: 'all', icon: <Globe className="w-4 h-4" /> },
    { label: safeTranslate('projects:filters.web', 'Web Applications'), value: 'web', icon: <Code2 className="w-4 h-4" /> },
    { label: safeTranslate('projects:filters.healthcare', 'Healthcare'), value: 'healthcare', icon: <Heart className="w-4 h-4" /> },
    { label: safeTranslate('projects:filters.ai', 'AI/ML'), value: 'ai', icon: <Zap className="w-4 h-4" /> },
    { label: safeTranslate('projects:filters.education', 'Education'), value: 'education', icon: <Users className="w-4 h-4" /> }
  ];

  const achievements = [
    {
      metric: "100%",
      label: safeTranslate('projects:achievements.coverage', 'API Documentation Coverage'),
      description: safeTranslate('projects:achievements.coverageDesc', 'Complete OpenAPI documentation for all endpoints')
    },
    {
      metric: "CI/CD",
      label: safeTranslate('projects:achievements.deployment', 'Automated Deployment'),
      description: safeTranslate('projects:achievements.deploymentDesc', 'Continuous integration and deployment pipelines')
    },
    {
      metric: "Docker",
      label: safeTranslate('projects:achievements.containerization', 'Containerized Applications'),
      description: safeTranslate('projects:achievements.containerizationDesc', 'Production-ready container orchestration')
    },
    {
      metric: "99.9%",
      label: safeTranslate('projects:achievements.uptime', 'Service Uptime'),
      description: safeTranslate('projects:achievements.uptimeDesc', 'Reliable, scalable infrastructure on cloud platforms')
    }
  ];

  // Safe translation for SEO - use direct strings to avoid errors
  const seoTitle = safeTranslate('projects:seo.title', 'Projects - Badr Ribzat | Full-Stack Developer');
  const seoDescription = safeTranslate('projects:seo.description', 'Portfolio of production-ready applications in AI, healthcare, and education technologies.');

  return (
    <Layout>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords="projects, portfolio, full-stack applications, AI, healthcare technology, educational platforms"
      />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center space-x-2 mb-6 flex-wrap gap-2">
                <span className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {safeTranslate('projects:hero.status', 'Available for Employment')}
                </span>
                <span className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  <MapPin className="w-4 h-4 mr-2" />
                  {safeTranslate('projects:hero.location', 'Open to Relocation')}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-gray-900 dark:text-white">
                  {safeTranslate('projects:hero.title1', 'Production-Ready')}
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {safeTranslate('projects:hero.title2', 'Software Solutions')}
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto mb-8">
                {safeTranslate('projects:hero.subtitle', 'Portfolio showcasing enterprise-grade applications built with modern technologies and scalable architecture.')}
              </p>

              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400 mb-8 flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{safeTranslate('projects:hero.age', '34 Years Old')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span>{safeTranslate('projects:hero.seeking', 'Seeking Opportunities')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>{safeTranslate('projects:hero.experience', 'Self-Taught Developer')}</span>
                </div>
              </div>
            </motion.div>

            {/* Achievement Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {achievement.metric}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {achievement.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {achievement.description}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
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
              {safeTranslate('projects:featured.title', 'Featured Applications')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {safeTranslate('projects:featured.subtitle', 'Flagship projects demonstrating technical capabilities across healthcare, education, and AI domains.')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -top-3 -right-3 z-10">
                  <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                    <Award className="w-3 h-3 mr-1" />
                    {safeTranslate('projects:featured.badge', 'FEATURED')}
                  </span>
                </div>
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-4">
              {safeTranslate('projects:featured.cta.title', 'Ready to Contribute')}
            </h3>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              {safeTranslate('projects:featured.cta.description', 'Production-ready solutions that solve real-world problems.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                {safeTranslate('projects:featured.cta.contact', 'Discuss Opportunities')}
              </motion.a>
              <motion.a
                href="/resume/en"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                {safeTranslate('projects:featured.cta.resume', 'View Resume')}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Projects with Filters */}
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
              {safeTranslate('projects:all.title', 'Complete Portfolio')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {safeTranslate('projects:all.subtitle', 'Explore applications across different domains, built with scalability and user experience in mind.')}
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {filters.map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setFilter(item.value)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === item.value
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                <span className="text-xs opacity-75">
                  ({projects.filter(p => item.value === 'all' || p.category === item.value).length})
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`${filter}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {safeTranslate('projects:noResults.title', 'No Projects Found')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {safeTranslate('projects:noResults.description', 'Try adjusting your filter selection.')}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Technical Excellence Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {safeTranslate('projects:excellence.title', 'Technical Standards')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {safeTranslate('projects:excellence.subtitle', 'Every project adheres to industry best practices.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg">
                    <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {safeTranslate('projects:excellence.architecture.title', 'Scalable Architecture')}
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{safeTranslate('projects:excellence.architecture.item1', 'Microservices design patterns')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{safeTranslate('projects:excellence.architecture.item2', 'RESTful API architecture')}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-purple-100 dark:bg-purple-900/40 p-2 rounded-lg">
                    <Code2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {safeTranslate('projects:excellence.quality.title', 'Code Quality')}
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{safeTranslate('projects:excellence.quality.item1', 'Comprehensive API documentation')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{safeTranslate('projects:excellence.quality.item2', 'Type safety with TypeScript')}</span>
                  </li>
                </ul>
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
      ...(await serverSideTranslations(locale || 'en', ['common', 'projects'])),
    },
  };
};

export default ProjectsPage;
