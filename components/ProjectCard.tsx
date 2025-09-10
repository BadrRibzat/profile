// components/ProjectCard.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Code2, 
  Database, 
  Cpu, 
  Globe,
  Zap,
  Shield,
  BarChart,
  Play,
  FileText, 
  Activity, 
  Settings
} from 'lucide-react';

interface ApiLink {
  name: string;
  url: string;
  icon: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  category: 'healthcare' | 'education' | 'ai' | 'other';
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  technologies,
  liveUrl,
  githubUrl,
  category
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // ⚠️ You're using `apiLinks` below but it's not defined!
  // Let's define a mock or remove it for now.
  const apiLinks: ApiLink[] = []; // <-- Add this line or pass it as prop

  const getApiIcon = (iconType: string) => {
    switch (iconType) {
      case 'docs':
        return <FileText className="w-4 h-4" />;
      case 'health':
        return <Activity className="w-4 h-4" />;
      case 'admin':
        return <Settings className="w-4 h-4" />;
      case 'api':
        return <ExternalLink className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'healthcare': return <Shield className="w-5 h-5 text-red-500" />;
      case 'education': return <BarChart className="w-5 h-5 text-green-500" />;
      case 'ai': return <Cpu className="w-5 h-5 text-purple-500" />;
      default: return <Code2 className="w-5 h-5 text-blue-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'healthcare': return 'from-red-500 to-pink-500';
      case 'education': return 'from-green-500 to-emerald-500';
      case 'ai': return 'from-purple-500 to-violet-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-20">
        <div className={`flex items-center space-x-1 bg-gradient-to-r ${getCategoryColor(category)} text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg`}>
          {getCategoryIcon(category)}
          <span className="capitalize">{category}</span>
        </div>
      </div>

      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(category)} opacity-10`}></div>
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
        <img
          src={image}
          alt={title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        {/* Overlay on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 bg-gradient-to-t ${getCategoryColor(category)} opacity-80 flex items-center justify-center`}
            >
              <div className="flex space-x-4">
                <motion.a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <Play className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* API Documentation Links */}
        {apiLinks.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-1" />
              API Resources
            </h4>
            <div className="flex flex-wrap gap-2">
              {apiLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full flex items-center hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  {getApiIcon(link.icon)}
                  <span className="ml-1">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live Demo</span>
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
          >
            <Github className="w-4 h-4" />
            <span>Code</span>
          </a>
        </div>

        {/* Performance Indicators */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Zap className="w-3 h-3 text-yellow-500" />
            <span>Production Ready</span>
          </div>
          <div className="flex items-center space-x-1">
            <Database className="w-3 h-3 text-green-500" />
            <span>Scalable</span>
          </div>
          <div className="flex items-center space-x-1">
            <Globe className="w-3 h-3 text-blue-500" />
            <span>Deployed</span>
          </div>
        </div>
      </div> {/* ✅ This closes the <div className="p-6"> */}

      {/* Glow Effect on Hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className={`absolute -inset-0.5 bg-gradient-to-r ${getCategoryColor(category)} rounded-2xl blur opacity-30 -z-10`}
      />
    </motion.div>
  );
};

export default ProjectCard;
