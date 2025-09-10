// components/ResumeGenerator.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import { Download, FileText, Globe, Star } from 'lucide-react';

// Register fonts for different languages
Font.register({
  family: 'NotoSansArabic',
  src: '/fonts/NotoSansArabic-Regular.ttf'
});

Font.register({
  family: 'NotoSansJP',
  src: '/fonts/NotoSansJP-Regular.ttf'
});

interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    location: string;
    phone: string;
    email: string;
    github: string;
    linkedin?: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    period: string;
    location: string;
    achievements: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    tech: string;
    links: string[];
    highlights: string[];
  }>;
  skills: Record<string, string[]>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    score?: string;
    credential?: string;
    details?: string;
  }>;
  languages: Array<{
    language: string;
    level: string;
  }>;
  additionalSkills: string[];
}

const ResumeGenerator: React.FC = () => {
  const { locale } = useRouter();
  const { t } = useTranslation('resume');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  useEffect(() => {
    // Load resume data based on locale
    loadResumeData(locale!);
  }, [locale]);

  const loadResumeData = async (currentLocale: string) => {
    // This would typically fetch from an API or load from static files
    const data: ResumeData = {
      personalInfo: {
        name: "Badr Ribzat",
        title: t('personalInfo.title'),
        location: "Ksar El Kebir, Morocco",
        phone: "+212 627-764176",
        email: "badrribzat@gmail.com",
        github: "github.com/BadrRibzat"
      },
      summary: t('summary'),
      experience: [
        {
          title: t('experience.0.title'),
          company: t('experience.0.company'),
          period: "2023 - Present",
          location: "Remote",
          achievements: [
            t('experience.0.achievements.0'),
            t('experience.0.achievements.1'),
            t('experience.0.achievements.2'),
            t('experience.0.achievements.3'),
            t('experience.0.achievements.4'),
          ]
        },
        {
          title: t('experience.1.title'),
          company: t('experience.1.company'),
          period: "2020 - 2022",
          location: "Morocco",
          achievements: [
            t('experience.1.achievements.0'),
            t('experience.1.achievements.1'),
            t('experience.1.achievements.2'),
            t('experience.1.achievements.3'),
          ]
        }
      ],
      projects: [
        {
          name: "Biomedical Detection System",
          description: t('projects.biomedical.description'),
          tech: "Python, FastAPI, React, PostgreSQL, ML",
          links: ["https://biomedical-frontend.vercel.app/", "https://github.com/BadrRibzat/biomedical-detection"],
          highlights: [
            t('projects.biomedical.highlights.0'),
            t('projects.biomedical.highlights.1'),
            t('projects.biomedical.highlights.2')
          ]
        },
        {
          name: "IT Learning Platform",
          description: t('projects.education.description'),
          tech: "Node.js, React, MongoDB, JWT",
          links: ["https://it-learning-pi.vercel.app/", "https://github.com/BadrRibzat/it-learning"],
          highlights: [
            t('projects.education.highlights.0'),
            t('projects.education.highlights.1'),
            t('projects.education.highlights.2')
          ]
        },
        {
          name: "AI Chatbot Assistant",
          description: t('projects.ai.description'),
          tech: "Python, FastAPI, NLP",
          links: ["https://chatbot-assistant-frontend.vercel.app/", "https://github.com/BadrRibzat/chatbot-assistant"],
          highlights: [
            t('projects.ai.highlights.0'),
            t('projects.ai.highlights.1'),
            t('projects.ai.highlights.2')
          ]
        }
      ],
      skills: {
        "Technical Skills": ["Python", "JavaScript", "React", "FastAPI", "Node.js", "SQL"],
        "Soft Skills": ["Adaptability", "Self-learning", "Team collaboration", "Problem-solving"]
      },
      certifications: [
        {
          name: "ALX Software Engineering Program",
          issuer: "ALX Africa",
          date: "2024",
          score: "106.76%",
          details: t('certifications.alx.details')
        },
        // Additional certifications here...
      ],
      languages: [
        { language: "English", level: "Upper Intermediate" },
        { language: "Arabic", level: "Native" },
        { language: "French", level: "Professional" },
        // More languages...
      ],
      additionalSkills: [
        t('additionalSkills.0'),
        t('additionalSkills.1')
      ]
    };

    setResumeData(data);
  };

  const handleDownload = () => {
    // Logic for downloading the resume as PDF
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {resumeData && (
        <>
          <h1 className="text-2xl font-bold mb-4">{resumeData.personalInfo.name}</h1>
          <p className="text-lg mb-2">{resumeData.personalInfo.title}</p>
          <p>{resumeData.personalInfo.location}</p>
          <p>{resumeData.personalInfo.phone} | {resumeData.personalInfo.email}</p>
          <a href={`https://${resumeData.personalInfo.github}`} className="text-blue-500">{resumeData.personalInfo.github}</a>

          <h2 className="text-xl font-semibold mt-4">Professional Summary</h2>
          <p>{resumeData.summary}</p>

          <h2 className="text-xl font-semibold mt-4">Experience</h2>
          {resumeData.experience.map((job, index) => (
            <div key={index} className="mb-4 border-b pb-4">
              <h3 className="font-bold">{job.title} at {job.company}, {job.period}</h3>
              <ul>
                {job.achievements.map((achv, idx) => (
                  <li key={idx}>• {achv}</li>
                ))}
              </ul>
            </div>
          ))}

          <h2 className="text-xl font-semibold mt-4">Projects</h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-4 border-b pb-4">
              <h3 className="font-bold">{project.name}</h3>
              <p className="italic">{project.description}</p>
              <p>Technologies: {project.tech}</p>
              <p>Highlights:</p>
              <ul>
                {project.highlights.map((highlight, idx) => (
                  <li key={idx}>• {highlight}</li>
                ))}
              </ul>
              <p>Links: 
                {project.links.map((link, idx) => (
                  <a key={idx} href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500">{link}</a>
                ))}
              </p>
            </div>
          ))}

          <h2 className="text-xl font-semibold mt-4">Technical Skills</h2>
          {Object.keys(resumeData.skills).map((category, index) => (
            <div key={index} className="mb-4 border-b pb-4">
              <h3 className="font-bold">{category}</h3>
              <p>{resumeData.skills[category].join(', ')}</p>
            </div>
          ))}

          <h2 className="text-xl font-semibold mt-4">Certifications</h2>
          {resumeData.certifications.map((cert, index) => (
            <div key={index} className="mb-4 border-b pb-4">
              <h3 className="font-bold">{cert.name}</h3>
              <p>{cert.issuer}, {cert.date}</p>
              <p>{cert.score}</p>
              <p>{cert.details}</p>
            </div>
          ))}

          <h2 className="text-xl font-semibold mt-4">Languages</h2>
          <ul>
            {resumeData.languages.map((lang, index) => (
              <li key={index}>• {lang.language}: {lang.level}</li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mt-4">Additional Skills</h2>
          <ul>
            {resumeData.additionalSkills.map((skill, index) => (
              <li key={index}>• {skill}</li>
            ))}
          </ul>

          <div className="mt-6">
            <PDFDownloadLink
              document={
                <Document>
                  <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                      <Text style={styles.title}>{resumeData.personalInfo.name}</Text>
                      <Text style={styles.subtitle}>{resumeData.personalInfo.title}</Text>
                      <Text style={styles.text}>{resumeData.summary}</Text>

                      <Text style={styles.sectionTitle}>Experience</Text>
                      {resumeData.experience.map((job, index) => (
                        <View key={index} style={styles.jobSection}>
                          <Text style={styles.jobTitle}>
                            {job.title} at {job.company}, {job.period}
                          </Text>
                          {job.achievements.map((achv, idx) => (
                            <Text key={idx} style={styles.text}>• {achv}</Text>
                          ))}
                        </View>
                      ))}

                      <Text style={styles.sectionTitle}>Projects</Text>
                      {resumeData.projects.map((project, index) => (
                        <View key={index} style={styles.projectSection}>
                          <Text style={styles.projectTitle}>{project.name}</Text>
                          <Text style={styles.text}>
                            {project.description} - Technologies: {project.tech}
                          </Text>
                        </View>
                      ))}

                      <Text style={styles.sectionTitle}>Skills</Text>
                      {Object.keys(resumeData.skills).map((category, index) => (
                        <Text key={index} style={styles.text}>
                          {category}: {resumeData.skills[category].join(', ')}
                        </Text>
                      ))}

                      <Text style={styles.sectionTitle}>Certifications</Text>
                      {resumeData.certifications.map((cert, index) => (
                        <View key={index} style={styles.certSection}>
                          <Text style={styles.certTitle}>{cert.name}</Text>
                          <Text style={styles.text}>{cert.issuer}, {cert.date} - {cert.score}</Text>
                          <Text style={styles.text}>{cert.details}</Text>
                        </View>
                      ))}

                      <Text style={styles.sectionTitle}>Languages</Text>
                      {resumeData.languages.map((lang, index) => (
                        <Text key={index} style={styles.text}>• {lang.language}: {lang.level}</Text>
                      ))}
                    </View>
                  </Page>
                </Document>
              }
              fileName={`Badr_Ribzat_Resume_${locale}.pdf`}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {({ loading }) => (loading ? 'Loading document...' : 'Download Resume PDF')}
            </PDFDownloadLink>
          </div>
        </>
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  jobSection: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  projectSection: {
    marginBottom: 5,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  certSection: {
    marginBottom: 5,
  },
  certTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ResumeGenerator;
