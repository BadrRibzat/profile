'use client';

import { useTranslation } from 'react-i18next';

export default function Projects() {
  const { t } = useTranslation();

  const projects = [
    {
      title: "International Portfolio Platform",
      description: "Multi-language portfolio system with document generation capabilities",
      technologies: ["React", "Next.js", "i18next", "PDF.js"],
      demo: "#",
      github: "#"
    },
    {
      title: "Global Resume Builder",
      description: "Template-based resume generator for different countries and cultures",
      technologies: ["TypeScript", "Tailwind CSS", "jsPDF", "HTML2Canvas"],
      demo: "#",
      github: "#"
    },
    {
      title: "Multi-format Document Converter",
      description: "Convert documents between different formats and languages",
      technologies: ["Node.js", "PDF Generation", "DOCX", "HTML"],
      demo: "#",
      github: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('projects.title')}
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a href={project.demo} className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  🔗 Live Demo
                </a>
                <a href={project.github} className="text-gray-600 hover:text-gray-700 font-medium text-sm">
                  📱 GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}