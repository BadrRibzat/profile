// components/CountrySpecificResume.tsx
import React from 'react';
import { Document, Page, View, Text, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Register fonts for different languages
Font.register({
  family: 'NotoSansArabic',
  src: '/fonts/NotoSansArabic-Regular.ttf'
});

Font.register({
  family: 'NotoSansJP',
  src: '/fonts/NotoSansJP-Regular.ttf'
});

Font.register({
  family: 'NotoSans',
  src: '/fonts/NotoSans-Regular.ttf'
});

interface ResumeData {
  personalInfo: {
    name: string;
    nameKana?: string;
    title: string;
    location: string;
    phone: string;
    email: string;
    github: string;
    linkedin?: string;
    portfolio: string;
    visaStatus: string;
    photo?: string;
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
    period: string;
    location: string;
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

interface CountrySpecificResumeProps {
  data: ResumeData | null; // ← Now nullable
  locale: string;
}

const CountrySpecificResume: React.FC<CountrySpecificResumeProps> = ({ data, locale }) => {
  // ✅ SAFETY CHECK: If no data, show loading message
  if (!data) {
    return (
      <Document>
        <Page size="A4" style={{ padding: 30, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: '#6b7280' }}>Loading resume data...</Text>
        </Page>
      </Document>
    );
  }

  const countryCode = locale as 'de' | 'ja' | 'ar' | 'fr' | 'es' | 'en';

  const getCountryStyles = () => {
    const baseStyles = {
      page: {
        padding: 30,
        fontFamily: 'NotoSans',
        direction: countryCode === 'ar' ? 'rtl' : 'ltr'
      },
      section: {
        marginBottom: 15
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e40af',
        marginBottom: 5
      },
      title: {
        fontSize: 14,
        color: '#4b5563',
        marginBottom: 10
      },
      contactInfo: {
        flexDirection: countryCode === 'ar' ? 'row-reverse' : 'row',
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
      sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1e40af',
        marginBottom: 8,
        borderBottom: 1,
        borderBottomColor: '#e5e7eb',
        paddingBottom: 3
      },
      bulletText: {
        fontSize: 10,
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
    };

    if (countryCode === 'ja') {
      return {
        ...baseStyles,
        page: {
          ...baseStyles.page,
          padding: 20,
          fontFamily: 'NotoSansJP'
        },
        header: {
          ...baseStyles.header,
          fontSize: 16
        },
        title: {
          ...baseStyles.title,
          fontSize: 12
        },
        sectionTitle: {
          ...baseStyles.sectionTitle,
          fontSize: 12
        },
        bulletText: {
          ...baseStyles.bulletText,
          fontSize: 9
        },
        link: {
          ...baseStyles.link,
          fontSize: 8
        }
      };
    }

    if (countryCode === 'de') {
      return {
        ...baseStyles,
        page: {
          ...baseStyles.page,
          padding: 35
        }
      };
    }

    if (countryCode === 'ar') {
      return {
        ...baseStyles,
        page: {
          ...baseStyles.page,
          fontFamily: 'NotoSansArabic'
        }
      };
    }

    return baseStyles;
  };

  const styles = StyleSheet.create(getCountryStyles());

  const t = (en: string, ja: string, de: string, fr: string, es: string, ar: string) => {
    switch (locale) {
      case 'ja': return ja;
      case 'de': return de;
      case 'fr': return fr;
      case 'es': return es;
      case 'ar': return ar;
      default: return en;
    }
  };

  // Render German Lebenslauf
  const renderGermanResume = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src="/images/me.jpg" style={{ width: 80, height: 100, border: 1, borderColor: '#e5e7eb' }} />
          <Text style={styles.header}>{data.personalInfo.name}</Text>
          <Text style={styles.title}>{data.personalInfo.title}</Text>
          <View style={styles.contactInfo}>
            <Text>{data.personalInfo.location}</Text>
            <Text>{data.personalInfo.phone}</Text>
            <Text>{data.personalInfo.email}</Text>
          </View>
          <View style={styles.contactInfo}>
            <Text>{data.personalInfo.github}</Text>
            <Text>{data.personalInfo.portfolio}</Text>
            {data.personalInfo.linkedin && <Text>{data.personalInfo.linkedin}</Text>}
          </View>
          <Text style={styles.visaStatus}>{data.personalInfo.visaStatus}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Zielsetzung</Text>
          <Text style={styles.bulletText}>{data.objective}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Berufliche Zusammenfassung</Text>
          <Text style={styles.bulletText}>{data.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bildung</Text>
          {data.education.map((edu, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
              <Text style={styles.bulletText}>
                <Text style={{ fontWeight: 'bold' }}>{edu.degree}</Text> – {edu.institution}<br/>
                {edu.period} {edu.score && `| ${edu.score}`}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Erfahrung</Text>
          {data.experience.map((exp, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
              <Text style={styles.bulletText}>
                <Text style={{ fontWeight: 'bold' }}>{exp.title}</Text> – {exp.company}<br/>
                {exp.period} | {exp.location}
              </Text>
              {exp.achievements.map((ach, i) => (
                <Text key={i} style={{ ...styles.bulletText, marginLeft: 10 }}>• {ach}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sprachen</Text>
          {data.languages.map((lang, idx) => (
            <Text key={idx} style={styles.bulletText}>
              <Text style={{ fontWeight: 'bold' }}>{lang.language}:</Text> {lang.level}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fähigkeiten</Text>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
              Programmiersprachen:
            </Text>
            <View style={styles.skillsGrid}>
              {data.technicalSkills.languages.map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
              Frontend:
            </Text>
            <View style={styles.skillsGrid}>
              {data.technicalSkills.frontend.map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
              Backend:
            </Text>
            <View style={styles.skillsGrid}>
              {data.technicalSkills.backend.map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
              Datenbanken:
            </Text>
            <View style={styles.skillsGrid}>
              {data.technicalSkills.databases.map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Schlüsselprojekte</Text>
          {data.projects.map((project, idx) => (
            <View key={idx} style={{ marginBottom: 10 }}>
              <Text style={styles.projectName}>{project.name}</Text>
              <Text style={{ fontSize: 9, color: '#6b7280', marginBottom: 2 }}>
                {project.technologies}
              </Text>
              <Text style={{ fontSize: 10, marginBottom: 3 }}>{project.description}</Text>
              {project.achievements.map((ach, i) => (
                <Text key={i} style={{ ...styles.bulletText, marginLeft: 10 }}>• {ach}</Text>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Zertifikate</Text>
          {data.certifications.map((cert, idx) => (
            <Text key={idx} style={styles.bulletText}>
              <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text> – {cert.issuer} ({cert.date})
              {cert.credential && ` | ${cert.credential}`}
            </Text>
          ))}
        </View>

        <View style={{ marginTop: 10, padding: 5, backgroundColor: '#fef3c7', borderRadius: 3 }}>
          <Text style={{ fontSize: 9, color: '#92400e', fontWeight: 'bold' }}>
            Available for: Internships • Entry-Level Positions • Apprenticeships (Ausbildung) • Training Programs
          </Text>
          <Text style={{ fontSize: 8, color: '#78350f', marginTop: 2 }}>
            Willing to relocate internationally with appropriate visa sponsorship. Fast learner committed to long-term growth.
          </Text>
        </View>
      </Page>
    </Document>
  );

  // Render Japanese Rirekisho
  const renderJapaneseResume = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src="/images/me.jpg" style={{ width: 80, height: 100, border: 1, borderColor: '#e5e7eb' }} />
          <Text style={styles.header}>{data.personalInfo.name}</Text>
          {data.personalInfo.nameKana && (
            <Text style={{ fontSize: 10, color: '#6b7280', marginBottom: 5, fontFamily: 'NotoSansJP' }}>
              {data.personalInfo.nameKana}
            </Text>
          )}
          <Text style={styles.title}>{data.personalInfo.title}</Text>
          <View style={styles.contactInfo}>
            <Text>{data.personalInfo.location}</Text>
            <Text>{data.personalInfo.phone}</Text>
            <Text>{data.personalInfo.email}</Text>
          </View>
          <View style={styles.contactInfo}>
            <Text>{data.personalInfo.github}</Text>
            <Text>{data.personalInfo.portfolio}</Text>
            {data.personalInfo.linkedin && <Text>{data.personalInfo.linkedin}</Text>}
          </View>
          <Text style={styles.visaStatus}>{data.personalInfo.visaStatus}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>志望動機</Text>
          <Text style={styles.bulletText}>{data.objective}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>職務要約</Text>
          <Text style={styles.bulletText}>{data.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>学歴</Text>
          {data.education.map((edu, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
              <Text style={styles.bulletText}>
                <Text style={{ fontWeight: 'bold' }}>{edu.degree}</Text> – {edu.institution}<br/>
                {edu.period} {edu.score && `| ${edu.score}`}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>職務経験</Text>
          {data.experience.map((exp, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
              <Text style={styles.bulletText}>
                <Text style={{ fontWeight: 'bold' }}>{exp.title}</Text> – {exp.company}<br/>
                {exp.period} | {exp.location}
              </Text>
              {exp.achievements.map((ach, i) => (
                <Text key={i} style={{ ...styles.bulletText, marginLeft: 10 }}>• {ach}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>スキル</Text>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
              プログラミング言語:
            </Text>
            <View style={styles.skillsGrid}>
              {data.technicalSkills.languages.map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
              フロントエンド:
            </Text>
            <View style={styles.skillsGrid}>
              {data.technicalSkills.frontend.map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
              バックエンド:
            </Text>
            <View style={styles.skillsGrid}>
              {data.technicalSkills.backend.map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
              データベース:
            </Text>
            <View style={styles.skillsGrid}>
              {data.technicalSkills.databases.map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>主要プロジェクト</Text>
          {data.projects.map((project, idx) => (
            <View key={idx} style={{ marginBottom: 10 }}>
              <Text style={styles.projectName}>{project.name}</Text>
              <Text style={{ fontSize: 9, color: '#6b7280', marginBottom: 2 }}>
                {project.technologies}
              </Text>
              <Text style={{ fontSize: 10, marginBottom: 3 }}>{project.description}</Text>
              {project.achievements.map((ach, i) => (
                <Text key={i} style={{ ...styles.bulletText, marginLeft: 10 }}>• {ach}</Text>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>語学力</Text>
          {data.languages.map((lang, idx) => (
            <Text key={idx} style={styles.bulletText}>
              <Text style={{ fontWeight: 'bold' }}>{lang.language}:</Text> {lang.level}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>資格</Text>
          {data.certifications.map((cert, idx) => (
            <Text key={idx} style={styles.bulletText}>
              <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text> – {cert.issuer} ({cert.date})
              {cert.credential && ` | ${cert.credential}`}
            </Text>
          ))}
        </View>

        <View style={{ marginTop: 10, padding: 5, backgroundColor: '#fef3c7', borderRadius: 3 }}>
          <Text style={{ fontSize: 9, color: '#92400e', fontWeight: 'bold' }}>
            対象：インターンシップ、エントリーレベル職、見習い（Ausbildung）、研修プログラム
          </Text>
          <Text style={{ fontSize: 8, color: '#78350f', marginTop: 2 }}>
            適切なビザスポンサーシップを伴って国際的な移動に応じます。素早い学習者で、長期的な成長にコミットしています。
          </Text>
        </View>
      </Page>
    </Document>
  );

  // Render Arabic RTL CV
  const renderArabicResume = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src="/images/me.jpg" style={{ width: 80, height: 100, border: 1, borderColor: '#e5e7eb' }} />
          <Text style={[styles.header, { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
            {data.personalInfo.name}
          </Text>
          <Text style={[styles.title, { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
            {data.personalInfo.title}
          </Text>
          <View style={styles.contactInfo}>
            <Text>{data.personalInfo.location}</Text>
            <Text>{data.personalInfo.phone}</Text>
            <Text>{data.personalInfo.email}</Text>
          </View>
          <View style={styles.contactInfo}>
            <Text>{data.personalInfo.github}</Text>
            <Text>{data.personalInfo.portfolio}</Text>
            {data.personalInfo.linkedin && <Text>{data.personalInfo.linkedin}</Text>}
          </View>
          <Text style={styles.visaStatus}>{data.personalInfo.visaStatus}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
            الهدف
          </Text>
          <Text style={[styles.bulletText, { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
            {data.objective}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
            الملخص المهني
          </Text>
          <Text style={[styles.bulletText, { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
            {data.summary}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
            التعليم
          </Text>
          {data.education.map((edu, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
              <Text style={[styles.bulletText, { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
                <Text style={{ fontWeight: 'bold' }}>{edu.degree}</Text> – {edu.institution}<br/>
                {edu.period} {edu.score && `| ${edu.score}`}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
            الخبرة المهنية
          </Text>
          {data.experience.map((exp, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
              <Text style={[styles.bulletText, { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
                <Text style={{ fontWeight: 'bold' }}>{exp.title}</Text> – {exp.company}<br/>
                {exp.period} | {exp.location}
              </Text>
              {exp.achievements.map((ach, i) => (
                <Text key={i} style={{ ...styles.bulletText, marginLeft: 10, fontFamily: 'NotoSansArabic', direction: 'rtl' }}>• {ach}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
            اللغات
          </Text>
          {data.languages.map((lang, idx) => (
            <Text key={idx} style={[styles.bulletText, { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
              <Text style={{ fontWeight: 'bold' }}>{lang.language}:</Text> {lang.level}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
            المهارات التقنية
          </Text>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
              لغات البرمجة:
            </Text>
            <View style={styles.skillsGrid}>
              {data.technicalSkills.languages.map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
              واجهة المستخدم:
            </Text>
            <View style={styles.skillsGrid}>
              {data.technicalSkills.frontend.map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
              الخادم والقواعد البيانات:
            </Text>
            <View style={styles.skillsGrid}>
              {[...data.technicalSkills.backend, ...data.technicalSkills.databases].map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
            المشاريع الرئيسية
          </Text>
          {data.projects.map((project, idx) => (
            <View key={idx} style={{ marginBottom: 10 }}>
              <Text style={styles.projectName}>{project.name}</Text>
              <Text style={{ fontSize: 9, color: '#6b7280', marginBottom: 2 }}>
                {project.technologies}
              </Text>
              <Text style={{ fontSize: 10, marginBottom: 3 }}>{project.description}</Text>
              {project.achievements.map((ach, i) => (
                <Text key={i} style={{ ...styles.bulletText, marginLeft: 10, fontFamily: 'NotoSansArabic', direction: 'rtl' }}>• {ach}</Text>
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

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
            الشهادات
          </Text>
          {data.certifications.map((cert, idx) => (
            <Text key={idx} style={[styles.bulletText, { fontFamily: 'NotoSansArabic', direction: 'rtl' }]}>
              <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text> – {cert.issuer} ({cert.date})
              {cert.credential && ` | ${cert.credential}`}
            </Text>
          ))}
        </View>

        <View style={{ marginTop: 10, padding: 5, backgroundColor: '#fef3c7', borderRadius: 3 }}>
          <Text style={{ fontSize: 9, color: '#92400e', fontWeight: 'bold' }}>
            متاح للتدريبات، الوظائف المبتدئة، التلمذة المهنية (Ausbildung)، وبرامج التدريب.
          </Text>
          <Text style={{ fontSize: 8, color: '#78350f', marginTop: 2 }}>
            مستعد للانتقال دوليًا مع رعاية تأشيرة مناسبة. متعلم سريع وملتزم بالنمو طويل الأمد.
          </Text>
        </View>
      </Page>
    </Document>
  );

  // Render French Europass-style
  const renderFrenchResume = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src="/images/me.jpg" style={{ width: 80, height: 100, border: 1, borderColor: '#e5e7eb' }} />
          <Text style={styles.header}>{data.personalInfo.name}</Text>
          <Text style={styles.title}>{data.personalInfo.title}</Text>
          <View style={styles.contactInfo}>
            <Text>{data.personalInfo.location}</Text>
            <Text>{data.personalInfo.phone}</Text>
            <Text>{data.personalInfo.email}</Text>
          </View>
          <View style={styles.contactInfo}>
            <Text>{data.personalInfo.github}</Text>
            <Text>{data.personalInfo.portfolio}</Text>
            {data.personalInfo.linkedin && <Text>{data.personalInfo.linkedin}</Text>}
          </View>
          <Text style={styles.visaStatus}>{data.personalInfo.visaStatus}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Objectif</Text>
          <Text style={styles.bulletText}>{data.objective}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Résumé Professionnel</Text>
          <Text style={styles.bulletText}>{data.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formation</Text>
          {data.education.map((edu, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
              <Text style={styles.bulletText}>
                <Text style={{ fontWeight: 'bold' }}>{edu.degree}</Text> – {edu.institution}<br/>
                {edu.period} {edu.score && `| ${edu.score}`}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expérience professionnelle</Text>
          {data.experience.map((exp, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
              <Text style={styles.bulletText}>
                <Text style={{ fontWeight: 'bold' }}>{exp.title}</Text> – {exp.company}<br/>
                {exp.period} | {exp.location}
              </Text>
              {exp.achievements.map((ach, i) => (
                <Text key={i} style={{ ...styles.bulletText, marginLeft: 10 }}>• {ach}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Langues</Text>
          {data.languages.map((lang, idx) => (
            <Text key={idx} style={styles.bulletText}>
              <Text style={{ fontWeight: 'bold' }}>{lang.language}:</Text> {lang.level}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compétences Techniques</Text>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
              Langages de programmation:
            </Text>
            <View style={styles.skillsGrid}>
              {data.technicalSkills.languages.map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
              Frontend:
            </Text>
            <View style={styles.skillsGrid}>
              {data.technicalSkills.frontend.map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
              Backend & Bases de données:
            </Text>
            <View style={styles.skillsGrid}>
              {[...data.technicalSkills.backend, ...data.technicalSkills.databases].map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projets Clés</Text>
          {data.projects.map((project, idx) => (
            <View key={idx} style={{ marginBottom: 10 }}>
              <Text style={styles.projectName}>{project.name}</Text>
              <Text style={{ fontSize: 9, color: '#6b7280', marginBottom: 2 }}>
                {project.technologies}
              </Text>
              <Text style={{ fontSize: 10, marginBottom: 3 }}>{project.description}</Text>
              {project.achievements.map((ach, i) => (
                <Text key={i} style={{ ...styles.bulletText, marginLeft: 10 }}>• {ach}</Text>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {data.certifications.map((cert, idx) => (
            <Text key={idx} style={styles.bulletText}>
              <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text> – {cert.issuer} ({cert.date})
              {cert.credential && ` | ${cert.credential}`}
            </Text>
          ))}
        </View>

        <View style={{ marginTop: 10, padding: 5, backgroundColor: '#fef3c7', borderRadius: 3 }}>
          <Text style={{ fontSize: 9, color: '#92400e', fontWeight: 'bold' }}>
            Disponible pour : Stages • Postes débutants • Alternance (Ausbildung) • Programmes de formation
          </Text>
          <Text style={{ fontSize: 8, color: '#78350f', marginTop: 2 }}>
            Prêt à déménager à l'international avec parrainage de visa approprié. Apprenant rapide, engagé dans une croissance à long terme.
          </Text>
        </View>
      </Page>
    </Document>
  );

  // Render standard international resume (English)
  const renderStandardResume = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src="/images/me.jpg" style={{ width: 80, height: 100, border: 1, borderColor: '#e5e7eb' }} />
          <Text style={styles.header}>{data.personalInfo.name}</Text>
          <Text style={styles.title}>{data.personalInfo.title}</Text>
          <View style={styles.contactInfo}>
            <Text>{data.personalInfo.location}</Text>
            <Text>{data.personalInfo.phone}</Text>
            <Text>{data.personalInfo.email}</Text>
          </View>
          <View style={styles.contactInfo}>
            <Text>{data.personalInfo.github}</Text>
            <Text>{data.personalInfo.portfolio}</Text>
            {data.personalInfo.linkedin && <Text>{data.personalInfo.linkedin}</Text>}
          </View>
          <Text style={styles.visaStatus}>{data.personalInfo.visaStatus}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Objective</Text>
          <Text style={styles.bulletText}>{data.objective}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.bulletText}>{data.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
              <Text style={styles.bulletText}>
                <Text style={{ fontWeight: 'bold' }}>{edu.degree}</Text> – {edu.institution}<br/>
                {edu.period} {edu.score && `| ${edu.score}`}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
              <Text style={styles.bulletText}>
                <Text style={{ fontWeight: 'bold' }}>{exp.title}</Text> – {exp.company}<br/>
                {exp.period} | {exp.location}
              </Text>
              {exp.achievements.map((ach, i) => (
                <Text key={i} style={{ ...styles.bulletText, marginLeft: 10 }}>• {ach}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          {data.languages.map((lang, idx) => (
            <Text key={idx} style={styles.bulletText}>
              <Text style={{ fontWeight: 'bold' }}>{lang.language}:</Text> {lang.level}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
              Programming Languages:
            </Text>
            <View style={styles.skillsGrid}>
              {data.technicalSkills.languages.map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
              Frontend:
            </Text>
            <View style={styles.skillsGrid}>
              {data.technicalSkills.frontend.map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
              Backend:
            </Text>
            <View style={styles.skillsGrid}>
              {data.technicalSkills.backend.map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>
              Databases:
            </Text>
            <View style={styles.skillsGrid}>
              {data.technicalSkills.databases.map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Projects</Text>
          {data.projects.map((project, idx) => (
            <View key={idx} style={{ marginBottom: 10 }}>
              <Text style={styles.projectName}>{project.name}</Text>
              <Text style={{ fontSize: 9, color: '#6b7280', marginBottom: 2 }}>
                {project.technologies}
              </Text>
              <Text style={{ fontSize: 10, marginBottom: 3 }}>{project.description}</Text>
              {project.achievements.map((ach, i) => (
                <Text key={i} style={{ ...styles.bulletText, marginLeft: 10 }}>• {ach}</Text>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {data.certifications.map((cert, idx) => (
            <Text key={idx} style={styles.bulletText}>
              <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text> – {cert.issuer} ({cert.date})
              {cert.credential && ` | ${cert.credential}`}
            </Text>
          ))}
        </View>

        <View style={{ marginTop: 10, padding: 5, backgroundColor: '#fef3c7', borderRadius: 3 }}>
          <Text style={{ fontSize: 9, color: '#92400e', fontWeight: 'bold' }}>
            Available for: Internships • Entry-Level Positions • Apprenticeships (Ausbildung) • Training Programs
          </Text>
          <Text style={{ fontSize: 8, color: '#78350f', marginTop: 2 }}>
            Willing to relocate internationally with appropriate visa sponsorship. Fast learner committed to long-term growth.
          </Text>
        </View>
      </Page>
    </Document>
  );

  if (locale === 'de') return renderGermanResume();
  if (locale === 'ja') return renderJapaneseResume();
  if (locale === 'ar') return renderArabicResume();
  if (locale === 'fr') return renderFrenchResume();

  return renderStandardResume();
};

export default CountrySpecificResume;
