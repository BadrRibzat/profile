// components/SkillsSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import {
  Code2,
  Database,
  Server,
  Palette,
  Brain,
  Settings,
  Award,
  Forklift,
  Car,
  Scissors,
  ChefHat,
  Languages,
} from "lucide-react";

const SkillsSection: React.FC = () => {
  const { t } = useTranslation("skills");

  const technicalSkills = [
    {
      category: t("categories.programming"),
      icon: <Code2 className="w-6 h-6" />,
      skills: ["Python", "JavaScript", "TypeScript", "SQL", "HTML/CSS", "Bash", "C"],
      color: "from-blue-500 to-cyan-500",
      proficiency: 90,
    },
    {
      category: t("categories.backend"),
      icon: <Server className="w-6 h-6" />,
      skills: ["FastAPI", "Flask", "Node.js", "Express.js", "RESTful APIs", "Microservices"],
      color: "from-green-500 to-emerald-500",
      proficiency: 88,
    },
    {
      category: t("categories.frontend"),
      icon: <Palette className="w-6 h-6" />,
      skills: ["React", "Next.js", "Tailwind CSS", "Responsive Design", "Material-UI"],
      color: "from-purple-500 to-pink-500",
      proficiency: 85,
    },
    {
      category: t("categories.database"),
      icon: <Database className="w-6 h-6" />,
      skills: ["PostgreSQL", "MongoDB", "SQLite", "Database Design", "Query Optimization"],
      color: "from-orange-500 to-red-500",
      proficiency: 82,
    },
    {
      category: t("categories.aiml"),
      icon: <Brain className="w-6 h-6" />,
      skills: ["NLP", "RAG Systems", "Vector Databases", "Model Integration", "Computer Vision"],
      color: "from-indigo-500 to-purple-500",
      proficiency: 78,
    },
    {
      category: t("categories.devops"),
      icon: <Settings className="w-6 h-6" />,
      skills: ["Docker", "CI/CD", "Linux", "Git", "GitHub Actions", "AWS"],
      color: "from-gray-500 to-slate-500",
      proficiency: 75,
    },
  ];

  const practicalSkills = [
    {
      category: t("practical.forklift"),
      icon: <Forklift className="w-6 h-6" />,
      certification: "CACES R489 & R485",
      description: t("practical.forkliftDesc"),
      color: "from-yellow-500 to-orange-500",
    },
    {
      category: t("practical.driving"),
      icon: <Car className="w-6 h-6" />,
      certification: t("practical.drivingCert"),
      description: t("practical.drivingDesc"),
      color: "from-blue-500 to-teal-500",
    },
    {
      category: t("practical.hairstyling"),
      icon: <Scissors className="w-6 h-6" />,
      certification: t("practical.hairstylingCert"),
      description: t("practical.hairstylingDesc"),
      color: "from-pink-500 to-rose-500",
    },
    {
      category: t("practical.culinary"),
      icon: <ChefHat className="w-6 h-6" />,
      certification: t("practical.culinaryCert"),
      description: t("practical.culinaryDesc"),
      color: "from-green-500 to-lime-500",
    },
  ];

  const languages = [
    { name: t("languages.arabic"), level: t("levels.native"), proficiency: 100, flag: "🇲🇦" },
    { name: t("languages.french"), level: t("levels.professional"), proficiency: 85, flag: "🇫🇷" },
    { name: t("languages.english"), level: t("levels.upperIntermediate"), proficiency: 80, flag: "🇺🇸" },
    { name: t("languages.german"), level: t("levels.basic"), proficiency: 40, flag: "🇩🇪" },
    { name: t("languages.spanish"), level: t("levels.basic"), proficiency: 35, flag: "🇪🇸" },
    { name: t("languages.japanese"), level: t("levels.basic"), proficiency: 30, flag: "🇯🇵" },
  ];

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t("title")}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        {/* Technical Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">{t("technical.title")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalSkills.map((skillCategory, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${skillCategory.color} text-white`}>
                    {skillCategory.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{skillCategory.category}</h4>
                </div>

                {/* Proficiency */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t("proficiency")}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{skillCategory.proficiency}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skillCategory.proficiency}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`h-2 rounded-full bg-gradient-to-r ${skillCategory.color}`}
                    />
                  </div>
                </div>

                {/* Skills list */}
                <div className="flex flex-wrap gap-2">
                  {skillCategory.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Practical Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">{t("practical.title")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {practicalSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center text-white`}>
                  {skill.icon}
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{skill.category}</h4>
                <div className="flex items-center justify-center space-x-1 mb-3">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">{skill.certification}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">{t("languages.title")}</h3>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {languages.map((language, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{language.flag}</span>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{language.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{language.level}</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${language.proficiency}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{language.proficiency}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call‑to‑Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">{t("cta.title")}</h3>
            <p className="text-lg mb-6 opacity-90">{t("cta.description")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                {t("cta.contact")}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsSection;
