// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone,
  Heart,
  Code2,
  ExternalLink,
  Globe,
  Star
} from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/BadrRibzat',
      icon: <Github className="w-5 h-5" />,
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/badr-ribzat',
      icon: <Linkedin className="w-5 h-5" />,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Email',
      href: 'mailto:badrribzat@gmail.com',
      icon: <Mail className="w-5 h-5" />,
      color: 'hover:text-red-500'
    }
  ];

  const quickLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.skills'), href: '/skills' },
    { name: t('nav.contact'), href: '/contact' }
  ];

  const projectLinks = [
    {
      name: 'Biomedical Detection',
      href: 'https://biomedical-frontend.vercel.app/',
    },
    {
      name: 'IT Learning Platform',
      href: 'https://it-learning-pi.vercel.app/',
    },
    {
      name: 'AI Chatbot Assistant',
      href: 'https://chatbot-assistant-frontend.vercel.app/',
    }
  ];

  const achievements = [
    { label: 'ALX Score', value: '106.76%' },
    { label: 'Projects', value: '3+' },
    { label: 'Certifications', value: '10+' },
    { label: 'Languages', value: '6' }
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                  <Code2 className="w-4 h-4" />
                </div>
                <span className="font-bold text-gray-900 dark:text-white">
                  Badr Ribzat
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {t('seo.description')}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Ksar El Kebir, Morocco</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+212 627-764176</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>badrribzat@gmail.com</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {t('footer.quickLinks')}
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href}>
                      <span className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-300 cursor-pointer">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Featured Projects */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {t('footer.featuredProjects')}
              </h3>
              <ul className="space-y-2">
                {projectLinks.map((project, index) => (
                  <li key={index}>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-300 group"
                    >
                      <span>{project.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Achievements */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {t('footer.keyAchievements')}
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.label}
                    </span>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {achievement.value}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Status Indicator */}
              <div className="mt-4 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  {t('footer.availableStatus')}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-8"
        >
          <div className="flex items-center justify-center space-x-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300 hover:shadow-lg`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 dark:border-gray-800 pt-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span>© {currentYear} Badr Ribzat. {t('footer.rights')}.</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span>{t('footer.builtWith')}</span>
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 dark:text-blue-400 font-medium">Next.js</span>
                <span>•</span>
                <span className="text-purple-600 dark:text-purple-400 font-medium">TypeScript</span>
                <span>•</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-medium">Tailwind</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600 dark:text-gray-400">{t('footer.madeIn')}</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
