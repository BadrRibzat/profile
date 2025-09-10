// components/SkillBadge.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface SkillBadgeProps {
  skill: string;
  level?: number;
  color?: string;
  delay?: number;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ 
  skill, 
  level = 0, 
  color = 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  delay = 0
}) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color} transition-all duration-300 hover:shadow-md`}
    >
      {skill}
      {level > 0 && (
        <span className="ml-2 text-xs opacity-75">
          {level}%
        </span>
      )}
    </motion.span>
  );
};

export default SkillBadge;
