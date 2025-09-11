// components/ResumeGenerator.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font, Image } from '@react-pdf/renderer';
import { Download, FileText, Globe, Briefcase, GraduationCap, Award, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

// Register fonts for different languages
Font.register({
  family: 'NotoSans',
  fonts: [
    { src: '/fonts/NotoSans-Regular.ttf' },
    { src: '/fonts/NotoSans-Bold.ttf', fontWeight: 'bold' }
  ]
});

Font.register({
  family: 'NotoSansArabic',
  fonts: [
    { src: '/fonts/NotoSansArabic-Regular.ttf' },
    { src: '/fonts/NotoSansArabic-Bold.ttf', fontWeight: 'bold' }
  ]
});

Font.register({
  family: 'NotoSansJP',
  fonts: [
    { src: '/fonts/NotoSansJP-Regular.ttf' },
    { src: '/fonts/NotoSansJP-Bold.ttf', fontWeight: 'bold' }
  ]
});

interface ResumeData {
  personalInfo: {
    name: string;
    nameKana?: string; // For Japanese
    title: string;
    location: string;
    phone: string;
    email: string;
    github: string;
    linkedin?: string;
    portfolio: string;
    birthDate?: string; // For Japanese/German formats
    nationality?: string;
    visaStatus: string;
    photo?: string; // For German/Japanese formats
  };
  objective: string;
  summary: string;
  technicalSkills: {
    languages: string[];
    frontend: string[];
    backend: string[];
    databases: string[];
    tools: string[];
    cloud: string[];
  };
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
    achievements: string[];
    links: {
      live?: string;
      github?: string;
      docs?: string;
    };
  }>;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    period: string;
    achievements: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    period: string;
    score?: string;
    details?: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    credential?: string;
  }>;
  languages: Array<{
    language: string;
    level: string;
    certification?: string;
  }>;
  additionalSkills: string[];
  interests?: string[];
}

const ResumeGenerator: React.FC = () => {
  const router = useRouter();
  const { locale } = router.query as { locale: string };
  const { t } = useTranslation('resume');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    loadResumeData(locale || router.locale || 'en');
  }, [locale, router.locale]);

  const loadResumeData = async (currentLocale: string) => {
    setIsGenerating(true);
    
    // Resume data with all required information
    const data: ResumeData = {
      personalInfo: {
        name: "Badr Ribzat",
        nameKana: "バドル・リブザット", // For Japanese
        title: getLocalizedTitle(currentLocale),
        location: "Ksar El Kebir, Morocco",
        phone: "+212 627-764176",
        email: "badrribzat@gmail.com",
        github: "github.com/BadrRibzat",
        linkedin: "linkedin.com/in/badr-ribzat",
        portfolio: "badrribzat.vercel.app",
        birthDate: "14/12/1990",
        nationality: "Moroccan",
        visaStatus: "Seeking visa sponsorship for international opportunities",
        photo: "/images/me.jpg"
      },
      objective: getLocalizedObjective(currentLocale),
      summary: getLocalizedSummary(currentLocale),
      technicalSkills: {
        languages: ["Python", "JavaScript", "TypeScript", "SQL", "HTML/CSS", "C", "Bash"],
        frontend: ["React", "Next.js", "Tailwind CSS", "Material-UI", "Framer Motion"],
        backend: ["FastAPI", "Flask", "Node.js", "Express.js", "RESTful APIs"],
        databases: ["PostgreSQL", "MongoDB", "SQLite", "Vector Databases"],
        tools: ["Git", "Docker", "Linux", "Postman", "Swagger"],
        cloud: ["Vercel", "Fly.io", "AWS (Basic)", "CI/CD", "GitHub Actions"]
      },
      projects: [
        {
          name: "Biomedical Detection System",
          description: "AI-powered healthcare application with ML capabilities",
          technologies: "Python, FastAPI, TensorFlow, React, PostgreSQL, Docker",
          achievements: [
            "Implemented ML models for biomedical signal processing",
            "Built RESTful APIs with 100% documentation coverage",
            "Deployed scalable microservices architecture",
            "Achieved 85% accuracy in diagnostic predictions"
          ],
          links: {
            live: "https://biomedical-frontend.vercel.app",
            github: "github.com/BadrRibzat/biomedical-detection",
            docs: "https://biomedical-detection.fly.dev/docs"
          }
        },
        {
          name: "IT Learning Platform",
          description: "Educational technology platform with course management",
          technologies: "Node.js, Express, React, MongoDB, JWT, Socket.io",
          achievements: [
            "Reduced API response time by 30% through optimization",
            "Implemented real-time features using WebSockets",
            "Built comprehensive admin dashboard",
            "Integrated payment processing and analytics"
          ],
          links: {
            live: "https://it-learning-pi.vercel.app",
            github: "github.com/BadrRibzat/it-learning",
            docs: "https://it-learning-backend.fly.dev/api/docs"
          }
        },
        {
          name: "AI Chatbot Assistant",
          description: "Intelligent conversational AI with NLP capabilities",
          technologies: "Python, FastAPI, LangChain, Vector DB, React",
          achievements: [
            "Achieved 85% intent recognition accuracy",
            "Handles 50+ concurrent users with stateless architecture",
            "Implemented RAG system for contextual responses",
            "Built admin panel for conversation monitoring"
          ],
          links: {
            live: "https://chatbot-assistant-frontend.vercel.app",
            github: "github.com/BadrRibzat/chatbot-assistant",
            docs: "https://chatbot-backend-badr.fly.dev/docs"
          }
        }
      ],
      experience: [
        {
          title: "Full-Stack Software Engineer",
          company: "Self-Employed / Open Source Contributor",
          location: "Remote",
          period: "2023 - Present",
          achievements: [
            "Developed and deployed 3+ production-ready full-stack applications",
            "Contributed to open-source projects with 50+ GitHub stars",
            "Implemented CI/CD pipelines reducing deployment time by 40%",
            "Created comprehensive API documentation using OpenAPI/Swagger",
            "Mentored junior developers in online communities"
          ]
        },
        {
          title: "Multi-Skilled Professional",
          company: "Various Positions",
          location: "Morocco",
          period: "2010 - 2022",
          achievements: [
            "Professional hairstylist with state-approved certification",
            "Forklift operator (CACES R489 & R485 certified)",
            "Digital marketing consultant with Google certification",
            "Demonstrated adaptability across diverse industries"
          ]
        }
      ],
      education: [
        {
          degree: "ALX Software Engineering Program",
          institution: "ALX Africa",
          period: "2023 - 2024",
          score: "106.76% (Exceptional Performance)",
          details: "18-month intensive full-stack development program"
        },
        {
          degree: "Self-Directed Learning",
          institution: "Online Platforms (Coursera, SoloLearn, Alison)",
          period: "2020 - Present",
          details: "10+ certifications in programming, AI, and web development"
        }
      ],
      certifications: [
        {
          name: "ALX Software Engineering Certificate",
          issuer: "ALX Africa",
          date: "2024",
          credential: "Score: 106.76%"
        },
        {
          name: "IBM AI Fundamentals",
          issuer: "IBM SkillsBuild",
          date: "2025",
          credential: "Credential ID: 73d33834"
        },
        {
          name: "Python for Beginners",
          issuer: "SoloLearn",
          date: "2022",
          credential: "Certificate: CT-2UUMLNJN"
        },
        {
          name: "SQL Database Management",
          issuer: "SoloLearn",
          date: "2023",
          credential: "Certificate: CT-RRMGCEB1"
        }
      ],
      languages: [
        { language: "Arabic", level: "Native", certification: "" },
        { language: "French", level: "Professional (B2)", certification: "" },
        { language: "English", level: "Professional (B2)", certification: "Self-assessed" },
        { language: "German", level: "Basic (A1)", certification: "Currently learning" },
        { language: "Spanish", level: "Basic (A1)", certification: "Currently learning" }
      ],
      additionalSkills: [
        "Professional Driving License (All categories)",
        "Forklift Operation (CACES R489 & R485)",
        "Professional Hairstyling Certification",
        "Therapeutic Nutrition Specialist"
      ],
      interests: ["Open Source", "AI Research", "Language Learning", "Healthcare Innovation"]
    };

    setResumeData(data);
    setIsGenerating(false);
  };

  // Get localized content based on country requirements
  const getLocalizedTitle = (locale: string): string => {
    const titles: Record<string, string> = {
      en: "Full-Stack Software Engineer",
      fr: "Ingénieur Logiciel Full-Stack",
      ar: "مهندس برمجيات متكامل",
      de: "Full-Stack Softwareentwickler",
      es: "Ingeniero de Software Full-Stack",
      ja: "フルスタックソフトウェアエンジニア"
    };
    return titles[locale] || titles.en;
  };

  const getLocalizedObjective = (locale: string): string => {
    const objectives: Record<string, string> = {
      en: "Seeking entry-level position, internship, or apprenticeship with visa sponsorship in software development. Eager to contribute my self-taught expertise and diverse background to innovative international teams.",
      fr: "À la recherche d'un poste débutant, stage ou alternance avec parrainage de visa en développement logiciel. Désireux de contribuer mon expertise autodidacte aux équipes internationales innovantes.",
      de: "Suche Einstiegsposition, Praktikum oder Ausbildung mit Visumspatenschaft in der Softwareentwicklung. Möchte meine autodidaktische Expertise in innovative internationale Teams einbringen.",
      ja: "ビザスポンサーシップを伴うエントリーレベルのポジション、インターンシップ、または見習いを求めています。独学で身につけた専門知識を革新的な国際チームに貢献したいと考えています。",
      ar: "أبحث عن وظيفة مبتدئة أو تدريب أو تلمذة مهنية مع رعاية التأشيرة في تطوير البرمجيات. حريص على المساهمة بخبرتي المكتسبة ذاتياً في الفرق الدولية المبتكرة.",
      es: "Buscando posición de nivel inicial, pasantía o aprendizaje con patrocinio de visa en desarrollo de software. Ansioso por contribuir mi experiencia autodidacta a equipos internacionales innovadores."
    };
    return objectives[locale] || objectives.en;
  };

  const getLocalizedSummary = (locale: string): string => {
    const summaries: Record<string, string> = {
      en: "Self-taught Full-Stack Engineer with exceptional performance (106.76%) in ALX Software Engineering program. Proven ability to build production-ready applications with modern technologies. Strong problem-solving skills developed through overcoming personal challenges. Multilingual professional seeking international opportunities to contribute to innovative projects.",
      fr: "Ingénieur Full-Stack autodidacte avec performance exceptionnelle (106,76%) au programme ALX. Capacité prouvée à créer des applications prêtes pour la production. Compétences en résolution de problèmes développées en surmontant des défis personnels. Professionnel multilingue cherchant des opportunités internationales.",
      de: "Autodidaktischer Full-Stack-Ingenieur mit außergewöhnlicher Leistung (106,76%) im ALX-Programm. Nachgewiesene Fähigkeit, produktionsreife Anwendungen zu erstellen. Starke Problemlösungsfähigkeiten durch Überwindung persönlicher Herausforderungen. Mehrsprachiger Fachmann sucht internationale Möglichkeiten.",
      ja: "ALXソフトウェアエンジニアリングプログラムで優秀な成績（106.76%）を収めた独学のフルスタックエンジニア。本番環境対応のアプリケーション構築能力を実証。個人的な課題を克服して培った強力な問題解決能力。革新的なプロジェクトに貢献する国際的な機会を求める多言語専門家。",
      ar: "مهندس متكامل تعلم ذاتياً بأداء استثنائي (106.76%) في برنامج ALX. قدرة مثبتة على بناء تطبيقات جاهزة للإنتاج. مهارات قوية في حل المشاكل تم تطويرها من خلال التغلب على التحديات الشخصية. محترف متعدد اللغات يبحث عن فرص دولية.",
      es: "Ingeniero Full-Stack autodidacta con rendimiento excepcional (106.76%) en el programa ALX. Capacidad probada para construir aplicaciones listas para producción. Fuertes habilidades de resolución de problemas desarrolladas superando desafíos personales. Profesional multilingüe buscando oportunidades internacionales."
    };
    return summaries[locale] || summaries.en;
  };

  // Localized visa note
  const visaNote = {
    en: "Available for: Internships • Entry-Level Positions • Apprenticeships (Ausbildung) • Training Programs\nWilling to relocate internationally with appropriate visa sponsorship. Fast learner committed to long-term growth.",
    fr: "Disponible pour : Stages • Postes débutants • Alternance (Ausbildung) • Programmes de formation\nPrêt à déménager à l'international avec parrainage de visa approprié. Apprenant rapide, engagé dans une croissance à long terme.",
    de: "Verfügbar für: Praktika • Einstiegspositionen • Ausbildung • Trainingsprogramme\nBereit, international mit geeigneter Visumsponsoring zu ziehen. Schneller Lerner mit langfristigem Wachstumswillen.",
    ja: "対象：インターンシップ、エントリーレベル職、見習い（Ausbildung）、研修プログラム\n適切なビザスポンサーシップを伴って国際的な移動に応じます。素早い学習者で、長期的な成長にコミットしています。",
    ar: "متاح للتدريبات، الوظائف المبتدئة، التلمذة المهنية (Ausbildung)، وبرامج التدريب.\nمستعد للانتقال دوليًا مع رعاية تأشيرة مناسبة. متعلم سريع وملتزم بالنمو طويل الأمد.",
    es: "Disponible para: Pasantías, Puestos de nivel inicial, Aprendizajes (Ausbildung), Programas de capacitación.\nDispuesto a reubicarse internacionalmente con patrocinio de visa adecuado. Aprendiz rápido comprometido con el crecimiento a largo plazo."
  };

  // Helper to generate clean HTML for print
  const createResumeHTML = () => {
  if (!resumeData) return '';

  // Recompute locale flags here since we're outside createResumePDF()
  const isJapanese = locale === 'ja';
  const isGerman = locale === 'de';
  const isArabic = locale === 'ar';
  const isFrench = locale === 'fr'; // <-- THIS WAS MISSING!
  const isSpanish = locale === 'es';

  // Use the localized title from translation or fallback for consistency
  const getSectionTitle = (en: string, ja: string, fr: string, de: string, es: string, ar: string): string => {    
        if (isJapanese) return ja;
        if (isFrench) return fr;
        if (isGerman) return de;
        if (isSpanish) return es;
        if (isArabic) return ar;
        return en;
      };

      const html = `
        <h2 style="font-size: 24px; font-weight:  bold; color: #1e40af; margin-bottom: 5px;">${resumeData.personalInfo.name}</h2>
        ${isJapanese && resumeData.personalInfo.nameKana ? `<p style="font-size: 10px; color: #6b7280; margin-bottom: 5px;">${resumeData.personalInfo.nameKana}</p>` : ''}
        <p style="font-size: 14px; color: #4b5563; margin-bottom: 10px;">${resumeData.personalInfo.title}</p>
        <p style="font-size: 9px; color: #6b7280; margin-bottom: 5px;">${resumeData.personalInfo.location} • ${resumeData.personalInfo.phone} • ${resumeData.personalInfo.email}</p>
        <p style="font-size: 9px; color: #6b7280; margin-bottom: 5px;">${resumeData.personalInfo.github} • ${resumeData.personalInfo.portfolio} • ${resumeData.personalInfo.linkedin}</p>
        <p style="font-size: 10px; color: #059669; font-weight: bold; background-color: #d1fae5; padding: 5px; border-radius: 3px; margin-top: 5px;">${resumeData.personalInfo.visaStatus}</p>

        <div style="margin-bottom: 15px;">
          <h3 style="font-size: 14px; font-weight: bold; color: #1e40af; margin-bottom: 8px; border-bottom: 1px solid #e5e7eb; padding-bottom: 3px;">
            ${getSectionTitle('Objective', '志望動機', 'Objectif', 'Zielsetzung', 'Objetivo', 'الهدف')}
          </h3>
          <p style="font-size: 10px; color: #374151; line-height: 1.4;">${resumeData.objective}</p>
        </div>

        <div style="margin-bottom: 15px;">
          <h3 style="font-size: 14px; font-weight: bold; color: #1e40af; margin-bottom: 8px; border-bottom: 1px solid #e5e7eb; padding-bottom: 3px;">
            ${getSectionTitle('Professional Summary', '職務要約', 'Résumé Professionnel', 'Berufliche Zusammenfassung', 'Resumen Profesional', 'ملخص مهني')}
          </h3>
          <p style="font-size: 10px; color: #374151; line-height: 1.4;">${resumeData.summary}</p>
        </div>

        <div style="margin-bottom: 15px;">
          <h3 style="font-size: 14px; font-weight: bold; color: #1e40af; margin-bottom: 8px; border-bottom: 1px solid #e5e7eb; padding-bottom: 3px;">
            ${getSectionTitle('Technical Skills', '技術スキル', 'Compétences Techniques', 'Technische Fähigkeiten', 'Habilidades Técnicas', 'المهارات التقنية')}
          </h3>
      
          <div style="margin-bottom: 5px;">
            <strong>Programming Languages:</strong><br>
            ${resumeData.technicalSkills.languages.join(' ')}
          </div>
      
          <div style="margin-bottom: 5px;">
            <strong>Frontend:</strong><br>
            ${resumeData.technicalSkills.frontend.join(' ')}
          </div>
      
          <div style="margin-bottom: 5px;">
            <strong>Backend:</strong><br>
            ${resumeData.technicalSkills.backend.join(' ')}
          </div>
      
          <div style="margin-bottom: 5px;">
            <strong>Databases:</strong><br>
            ${resumeData.technicalSkills.databases.join(' ')}
          </div>
        </div>

        <div style="margin-bottom: 15px;">
          <h3 style="font-size: 14px; font-weight: bold; color: #1e40af; margin-bottom: 8px; border-bottom: 1px solid #e5e7eb; padding-bottom: 3px;">
            ${getSectionTitle('Key Projects', '主要プロジェクト', 'Projets Clés', 'Schlüsselprojekte', 'Proyectos Clave', 'المشاريع الرئيسية')}
          </h3>
          ${resumeData.projects.map(project => `
            <div style="margin-bottom: 10px;">
              <strong style="font-size: 11px; color: #111827;">${project.name}</strong><br>
              <small style="font-size: 9px; color: #6b7280;">${project.technologies}</small><br>
              <small style="font-size: 10px;">${project.description}</small><br>
              ${project.achievements.map(ach => `<div style="margin-left: 15px; margin-bottom: 3px; font-size: 10px;">• ${ach}</div>`).join('')}
              ${project.links.live || project.links.docs ? `
                <div style="margin-top: 3px; font-size: 9px;">
                  ${project.links.live ? `<a href="${project.links.live}" style="color: #2563eb; text-decoration: underline;">Live: ${project.links.live}</a>` : ''}
                  ${project.links.docs ? ` | <a href="${project.links.docs}" style="color: #2563eb; text-decoration: underline;">API Docs: ${project.links.docs}</a>` : ''}
                </div>` : ''}
            </div>
          `).join('')}
        </div>

        <div style="margin-bottom: 15px;">
          <h3 style="font-size: 14px; font-weight: bold; color: #1e40af; margin-bottom: 8px; border-bottom: 1px solid #e5e7eb; padding-bottom: 3px;">
            ${getSectionTitle('Languages', '語学力', 'Langues', 'Sprachen', 'Idiomas', 'اللغات')}
          </h3>
          <div style="display: flex; flex-wrap: wrap; gap: 15px; font-size: 10px;">
            ${resumeData.languages.map(lang => `<div><strong>${lang.language}:</strong> ${lang.level}</div>`).join('')}
          </div>
        </div>

        <div style="margin-top: 10px; padding: 5px; background-color: #fef3c7; border-radius: 3px; font-size: 9px;">
          <strong style="color: #92400e;">Available for: Internships • Entry-Level Positions • Apprenticeships (Ausbildung) • Training Programs</strong><br>
          <span style="color: #78350f; font-size: 8px;">Willing to relocate internationally with appropriate visa sponsorship. Fast learner committed to long-term growth.</span>
        </div>
      `;

      return html;
    };

  // Create PDF document based on locale
  const createResumePDF = () => {
    if (!resumeData) return null;

    const isJapanese = locale === 'ja';
    const isGerman = locale === 'de';
    const isArabic = locale === 'ar';
    const isFrench = locale === 'fr';

    const styles = StyleSheet.create({
      page: {
        padding: isJapanese ? 20 : 30,
        fontFamily: isArabic ? 'NotoSansArabic' : isJapanese ? 'NotoSansJP' : 'NotoSans',
        fontSize: isJapanese ? 10 : 11,
        direction: isArabic ? 'rtl' : 'ltr'
      },
      header: {
        marginBottom: 20,
        borderBottom: isJapanese ? 0 : 2,
        borderBottomColor: '#2563eb',
        paddingBottom: 10
      },
      name: {
        fontSize: isJapanese ? 16 : 24,
        fontWeight: 'bold',
        color: '#1e40af',
        marginBottom: 5
      },
      title: {
        fontSize: isJapanese ? 12 : 14,
        color: '#4b5563',
        marginBottom: 10
      },
      contactInfo: {
        flexDirection: isArabic ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        fontSize: 9,
        color: '#6b7280',
        marginBottom: 5
      },
      visaStatus: {
        fontSize: 10,
        color: '#059669',
        fontWeight: 'bold',
        marginTop: 5,
        padding: 5,
        backgroundColor: '#d1fae5',
        borderRadius: 3
      },
      section: {
        marginBottom: 15
      },
      sectionTitle: {
        fontSize: isJapanese ? 12 : 14,
        fontWeight: 'bold',
        color: '#1e40af',
        marginBottom: 8,
        borderBottom: 1,
        borderBottomColor: '#e5e7eb',
        paddingBottom: 3
      },
      bulletPoint: {
        flexDirection: isArabic ? 'row-reverse' : 'row',
        marginBottom: 4,
        paddingLeft: isArabic ? 0 : 10,
        paddingRight: isArabic ? 10 : 0
      },
      bulletText: {
        flex: 1,
        fontSize: isJapanese ? 9 : 10,
        color: '#374151',
        lineHeight: 1.4
      },
      projectName: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 3
      },
      link: {
        fontSize: 9,
        color: '#2563eb',
        textDecoration: 'underline'
      },
      skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5
      },
      skillBadge: {
        backgroundColor: '#eff6ff',
        padding: '3 6',
        borderRadius: 3,
        fontSize: 9,
        color: '#1e40af',
        marginRight: 5,
        marginBottom: 5
      },
      photoSection: {
        position: 'absolute',
        top: 30,
        right: 30,
        width: 80,
        height: 100,
        border: 1,
        borderColor: '#e5e7eb'
      }
    });

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header Section */}
          <View style={styles.header}>
            {(isGerman || isJapanese) && (
              <View style={styles.photoSection}>
                <Image
                  src="/images/me.jpg"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderWidth: 1,
                    borderColor: '#e5e7eb'
                  }}
                />
              </View>
            )}

            <Text style={[styles.name, isArabic && { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
              {resumeData.personalInfo.name}
            </Text>
            {isJapanese && resumeData.personalInfo.nameKana && (
              <Text style={{ fontSize: 10, color: '#6b7280', marginBottom: 5, fontFamily: 'NotoSansJP' }}>
                {resumeData.personalInfo.nameKana}
              </Text>
            )}
            <Text style={[styles.title, isArabic && { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
              {resumeData.personalInfo.title}
            </Text>

            <View style={styles.contactInfo}>
              <Text>{resumeData.personalInfo.location}</Text>
              <Text>{resumeData.personalInfo.phone}</Text>
              <Text>{resumeData.personalInfo.email}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text>{resumeData.personalInfo.github}</Text>
              <Text>{resumeData.personalInfo.portfolio}</Text>
              {resumeData.personalInfo.linkedin && (
                <Text>{resumeData.personalInfo.linkedin}</Text>
              )}
            </View>

            <Text style={styles.visaStatus}>
              {resumeData.personalInfo.visaStatus}
            </Text>
          </View>

          {/* Objective Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {isJapanese ? '志望動機' : isFrench ? 'Objectif' : isGerman ? 'Zielsetzung' : 'Objective'}
            </Text>
            <Text style={[styles.bulletText, isArabic && { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
              {resumeData.objective}
            </Text>
          </View>

          {/* Professional Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {isJapanese ? '職務要約' : isFrench ? 'Résumé Professionnel' : isGerman ? 'Berufliche Zusammenfassung' : 'Professional Summary'}
            </Text>
            <Text style={[styles.bulletText, isArabic && { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
              {resumeData.summary}
            </Text>
          </View>

          {/* Technical Skills */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {isJapanese ? '技術スキル' : isFrench ? 'Compétences Techniques' : isGerman ? 'Technische Fähigkeiten' : 'Technical Skills'}
            </Text>
            <View style={{ marginBottom: 5 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
                Programming Languages:
              </Text>
              <View style={styles.skillsGrid}>
                {resumeData.technicalSkills.languages.map((skill, index) => (
                  <Text key={index} style={styles.skillBadge}>{skill}</Text>
                ))}
              </View>
            </View>
            <View style={{ marginBottom: 5 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
                Frontend:
              </Text>
              <View style={styles.skillsGrid}>
                {resumeData.technicalSkills.frontend.map((skill, index) => (
                  <Text key={index} style={styles.skillBadge}>{skill}</Text>
                ))}
              </View>
            </View>
            <View style={{ marginBottom: 5 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
                Backend:
              </Text>
              <View style={styles.skillsGrid}>
                {resumeData.technicalSkills.backend.map((skill, index) => (
                  <Text key={index} style={styles.skillBadge}>{skill}</Text>
                ))}
              </View>
            </View>
            <View style={{ marginBottom: 5 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
                Databases:
              </Text>
              <View style={styles.skillsGrid}>
                {resumeData.technicalSkills.databases.map((skill, index) => (
                  <Text key={index} style={styles.skillBadge}>{skill}</Text>
                ))}
              </View>
            </View>
          </View>

          {/* Key Projects */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {isJapanese ? '主要プロジェクト' : isFrench ? 'Projets Clés' : isGerman ? 'Schlüsselprojekte' : 'Key Projects'}
            </Text>
            {resumeData.projects.map((project, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={{ fontSize: 9, color: '#6b7280', marginBottom: 2 }}>
                  {project.technologies}
                </Text>
                <Text style={{ fontSize: 10, marginBottom: 3 }}>{project.description}</Text>
                {project.achievements.map((achievement, idx) => (
                  <View key={idx} style={styles.bulletPoint}>
                    <Text style={{ marginRight: 5 }}>•</Text>
                    <Text style={styles.bulletText}>{achievement}</Text>
                  </View>
                ))}
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 3 }}>
                  {project.links.live && (
                    <Text style={styles.link}>Live: {project.links.live}</Text>
                  )}
                  {project.links.docs && (
                    <Text style={styles.link}>API Docs: {project.links.docs}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Languages */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {isJapanese ? '語学力' : isFrench ? 'Langues' : isGerman ? 'Sprachen' : 'Languages'}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {resumeData.languages.map((lang, index) => (
                <Text key={index} style={{ marginRight: 15, fontSize: 10, marginBottom: 3 }}>
                  <Text style={{ fontWeight: 'bold' }}>{lang.language}:</Text> {lang.level}
                </Text>
              ))}
            </View>
          </View>

          {/* Visa Note */}
          <View style={{ marginTop: 10, padding: 5, backgroundColor: '#fef3c7', borderRadius: 3 }}>
            <Text style={{ fontSize: 9, color: '#92400e', fontWeight: 'bold' }}>
              {visaNote[locale as keyof typeof visaNote] || visaNote.en}
            </Text>
          </View>
        </Page>
      </Document>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('title')} - {locale?.toUpperCase()}
        </h2>
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Country-Optimized Format
          </span>
        </div>
      </div>

      {/* Resume Preview Section */}
      <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Resume Preview
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ATS Optimized
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Visa Sponsorship Ready
              </span>
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Key Strengths
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• ALX Program: 106.76% Score</li>
              <li>• 3+ Production Applications</li>
              <li>• Full-Stack Development</li>
              <li>• API Documentation Expert</li>
              <li>• Multilingual (5 Languages)</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Seeking
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Entry-Level Positions</li>
              <li>• Internships</li>
              <li>• Apprenticeships (Ausbildung)</li>
              <li>• Training Programs</li>
              <li>• <span className="text-green-600 font-medium">With Visa Sponsorship</span></li>
            </ul>
          </div>
        </div>

        {/* Format Information */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
          <div className="flex items-start space-x-2">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-1">
                Format Specifications
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                {locale === 'ja' && "Japanese Rirekisho format with proper sections and photo placeholder"}
                {locale === 'de' && "German Lebenslauf format with Europass standards"}
                {locale === 'fr' && "French CV format following European standards"}
                {locale === 'ar' && "Arabic CV with RTL layout and bilingual sections"}
                {locale === 'es' && "Spanish CV following EU format guidelines"}
                {(!locale || locale === 'en') && "US/UK ATS-optimized format with keyword density"}
              </p>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="flex flex-col sm:flex-row gap-4">
          {resumeData ? (
            <PDFDownloadLink
              document={createResumePDF()}
              fileName={`Badr_Ribzat_Resume_${locale || 'en'}_${new Date().toISOString().split('T')[0]}.pdf`}
              className="flex-1"
            >
              {({ blob, url, loading, error }) => (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>{t('generating')}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>{t('download')} (PDF)</span>
                    </>
                  )}
                </motion.button>
              )}
            </PDFDownloadLink>
          ) : (
            <button disabled className="flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg bg-gray-300 cursor-not-allowed">
              <span className="text-gray-500">Loading...</span>
            </button>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const printWindow = window.open('', '_blank');
              if (printWindow) {
                const content = `
                  <html>
                    <head>
                      <title>Badr Ribzat - Resume</title>
                      <style>
                        body { font-family: 'NotoSans', sans-serif; margin: 40px; }
                        .resume-container { max-width: 800px; margin: auto; }
                        .section { margin-bottom: 20px; }
                        .section-title { font-weight: bold; color: #1e40af; margin-bottom: 8px; border-bottom: 1px solid #e5e7eb; padding-bottom: 3px; }
                        .bullet-point { margin-left: 15px; margin-bottom: 4px; }
                        .link { color: #2563eb; text-decoration: underline; }
                      </style>
                    </head>
                    <body>
                      <div class="resume-container">
                        ${createResumeHTML()}
                      </div>
                    </body>
                  </html>
                `;
                printWindow.document.write(content);
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
              }
            }}
            className="flex items-center justify-center space-x-2 py-3 px-6 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-all duration-300"
          >
            <FileText className="w-5 h-5" />
            <span>Print Resume</span>
          </motion.button>
        </div>

        {/* Important Note */}
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Heart className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5" />
            <p className="text-xs text-green-700 dark:text-green-300">
              This resume highlights my journey from self-taught to professional developer.
              I'm eager to bring my unique perspective and strong work ethic to your team.
              Available immediately for international opportunities with visa sponsorship.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeGenerator;
