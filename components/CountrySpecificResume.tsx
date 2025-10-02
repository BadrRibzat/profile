// components/CountrySpecificResume.tsx
import React, { useState, useEffect } from 'react';
import { Document, Page, View, Text, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { meImageBase64 } from '../data/resume/base64-image';
import { registerFonts } from '../utils/fontLoader';

// --- IMAGE HANDLING WITH FALLBACK ---
const ImageWithFallback: React.FC<{ 
  src: string; 
  style: any; 
  alt?: string 
}> = ({ src, style, alt = "Profile" }) => {
  // Validate the image data
  const isValidImage = src && 
    src.startsWith('data:image/') && 
    src.includes('base64,') && 
    src.split('base64,')[1]?.length > 100; // Should have substantial base64 data

  if (!isValidImage) {
    console.warn('Invalid image data, rendering placeholder');
    // Return a placeholder view instead of broken image
    return (
      <View style={[style, { 
        backgroundColor: '#f0f0f0', 
        border: '1px solid #ccc',
        justifyContent: 'center',
        alignItems: 'center'
      }]}>
        <Text style={{ fontSize: 8, color: '#666' }}>Photo</Text>
      </View>
    );
  }

  try {
    return <Image src={src} style={style} />;
  } catch (error) {
    console.error('Image rendering failed:', error);
    // Return placeholder on error
    return (
      <View style={[style, { 
        backgroundColor: '#f0f0f0', 
        border: '1px solid #ccc',
        justifyContent: 'center',
        alignItems: 'center'
      }]}>
        <Text style={{ fontSize: 8, color: '#666' }}>Image Error</Text>
      </View>
    );
  }
};

// --- SHARED STYLES ---
const commonStyles = StyleSheet.create({
  url: { color: '#007BFF', textDecoration: 'none' },
  visaStatus: { 
    marginTop: 8, 
    paddingVertical: 4, 
    paddingHorizontal: 6, 
    backgroundColor: '#e6ffed', 
    color: '#2f6f43', 
    fontSize: 9, 
    borderRadius: 4, 
    textAlign: 'center' 
  },
  bullet: { flexDirection: 'row', marginBottom: 3, paddingRight: 10 },
  bulletChar: { marginRight: 5, fontSize: 10, lineHeight: 1.4 },
  bulletText: { flex: 1, fontSize: 10, lineHeight: 1.4 },
});

// --- TYPES ---
interface PersonalInfo {
  name: string;
  nameKana?: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  portfolio: string;
  birthDate?: string;
  nationality?: string;
  visaStatus: string;
  photo?: string;
}

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  score: string | null;
  details?: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string;
  links: { live: string; github: string; docs?: string; redoc?: string; health?: string; };
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface Language {
  language: string;
  level: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  practicalLicenses: string[];
  languages: Language[];
  interests: string[];
}

interface Props {
  data: ResumeData;
  locale: string;
  translatedStrings: Record<string, string>;
  fontsLoaded?: boolean;
}

interface ResumeTemplateProps {
  data: ResumeData;
  translatedStrings: Record<string, string>;
}

// --- 1. US/ENGLISH TEMPLATE ---
const USResume: React.FC<ResumeTemplateProps> = ({ data, translatedStrings }) => {
  const s = StyleSheet.create({
    page: { 
      fontFamily: 'NotoSans', 
      fontSize: 10, 
      color: '#2d3748', 
      padding: '0.75in',
      fontWeight: 400
    },
    header: { textAlign: 'center', marginBottom: 20, borderBottom: '2px solid #2c5282', paddingBottom: 15 },
    name: { 
      fontFamily: 'NotoSans', 
      fontSize: 24, 
      fontWeight: 700, 
      color: '#1a202c', 
      marginBottom: 4 
    },
    title: { 
      fontFamily: 'NotoSans', 
      fontSize: 14, 
      color: '#2c5282', 
      marginBottom: 8,
      fontWeight: 400
    },
    contactInfo: { 
      flexDirection: 'row', 
      justifyContent: 'center', 
      flexWrap: 'wrap', 
      fontSize: 9, 
      color: '#4a5568' 
    },
    contactItem: { marginHorizontal: 8 },
    section: { marginBottom: 18 },
    sectionTitle: { 
      fontFamily: 'NotoSans', 
      fontSize: 12, 
      fontWeight: 700, 
      color: '#2c5282', 
      backgroundColor: '#edf2f7',
      padding: '4 8',
      marginBottom: 12,
      textTransform: 'uppercase'
    },
    subsectionTitle: { 
      fontFamily: 'NotoSans', 
      fontSize: 11, 
      fontWeight: 700, 
      color: '#2d3748', 
      marginBottom: 8 
    },
    entry: { marginBottom: 14 },
    entryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    entryTitle: { 
      fontFamily: 'NotoSans', 
      fontWeight: 700, 
      fontSize: 11, 
      color: '#1a202c' 
    },
    entryMeta: { fontSize: 9, color: '#718096' },
    projectEntry: { 
      marginBottom: 12, 
      padding: 8, 
      backgroundColor: '#f7fafc', 
      borderLeft: '3px solid #2c5282' 
    },
    certGrid: { flexDirection: 'row', flexWrap: 'wrap' },
    certItem: { 
      fontSize: 8, 
      backgroundColor: '#fed7d7', 
      color: '#9b2c2c', 
      padding: '2 4', 
      margin: 1, 
      borderRadius: 2 
    },
  });

  return (
    <Page size="A4" style={s.page}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.name}>{data.personalInfo.name}</Text>
        <Text style={s.title}>{data.personalInfo.title}</Text>
        <View style={s.contactInfo}>
          <Text style={s.contactItem}>{data.personalInfo.location}</Text>
          <Text style={s.contactItem}>•</Text>
          <Text style={s.contactItem}>{data.personalInfo.phone}</Text>
          <Text style={s.contactItem}>•</Text>
          <Text style={s.contactItem}>{data.personalInfo.email}</Text>
        </View>
        <View style={s.contactInfo}>
          <Text style={s.contactItem}>GitHub: {data.personalInfo.github}</Text>
          <Text style={s.contactItem}>•</Text>
          <Text style={s.contactItem}>Portfolio: {data.personalInfo.portfolio}</Text>
        </View>
        <Text style={[commonStyles.visaStatus, { marginTop: 8 }]}>{data.personalInfo.visaStatus}</Text>
      </View>

      {/* Professional Summary */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>{translatedStrings.summaryTitle}</Text>
        <Text style={{ lineHeight: 1.6, fontSize: 10 }}>{data.summary}</Text>
      </View>

      {/* Technical Skills */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>{translatedStrings.skillsTitle}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '50%', paddingRight: 10 }}>
            <Text style={s.subsectionTitle}>{translatedStrings.programming}</Text>
            <Text style={{ fontSize: 9, marginBottom: 6 }}>Python, JavaScript, TypeScript, SQL, C, Bash, HTML5/CSS3</Text>
            <Text style={s.subsectionTitle}>{translatedStrings.backend}</Text>
            <Text style={{ fontSize: 9, marginBottom: 6 }}>FastAPI, Flask, Node.js, Express.js, RESTful APIs, Microservices</Text>
          </View>
          <View style={{ width: '50%' }}>
            <Text style={s.subsectionTitle}>{translatedStrings.frontend}</Text>
            <Text style={{ fontSize: 9, marginBottom: 6 }}>React, Next.js, Tailwind CSS, Responsive Design, Progressive Web Apps</Text>
            <Text style={s.subsectionTitle}>{translatedStrings.database}</Text>
            <Text style={{ fontSize: 9, marginBottom: 6 }}>PostgreSQL, MongoDB, Docker, CI/CD, AWS, Git/GitHub</Text>
          </View>
        </View>
      </View>

      {/* Professional Experience */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>{translatedStrings.experienceTitle}</Text>
        {data.experience.map((exp, i) => (
          <View key={i} style={s.entry}>
            <View style={s.entryHeader}>
              <Text style={s.entryTitle}>{exp.title}</Text>
              <Text style={s.entryMeta}>{exp.period}</Text>
            </View>
            <Text style={{ fontSize: 10, fontWeight: 700, marginBottom: 3 }}>{exp.company}</Text>
            {exp.achievements.slice(0, 3).map((ach, j) => (
              <View key={j} style={commonStyles.bullet}>
                <Text style={commonStyles.bulletChar}>•</Text>
                <Text style={commonStyles.bulletText}>{ach}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Key Projects */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>{translatedStrings.projectsTitle}</Text>
        {data.projects.slice(0, 3).map((project, i) => (
          <View key={i} style={s.projectEntry}>
            <Text style={[s.entryTitle, { color: '#2c5282' }]}>{project.name}</Text>
            <Text style={{ fontSize: 9, marginBottom: 4 }}>{project.description}</Text>
            <Text style={{ fontSize: 8, color: '#4a5568' }}>{translatedStrings.tech}: {project.technologies}</Text>
            <Text style={{ fontSize: 8, color: '#2c5282' }}>{translatedStrings.liveDemo}: {project.links.live}</Text>
          </View>
        ))}
      </View>

      {/* Education & Certifications */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>{translatedStrings.educationTitle}</Text>
        {data.education.map((edu, i) => (
          <View key={i} style={s.entry}>
            <View style={s.entryHeader}>
              <Text style={s.entryTitle}>{edu.degree}</Text>
              <Text style={s.entryMeta}>{edu.period}</Text>
            </View>
            <Text style={{ fontSize: 10, marginBottom: 2 }}>{edu.institution}</Text>
            {edu.score && <Text style={{ fontSize: 9 }}>{translatedStrings.achievement}: {edu.score}</Text>}
          </View>
        ))}
        <View style={s.certGrid}>
          {data.certifications.slice(0, 8).map((cert, i) => (
            <Text key={i} style={s.certItem}>{cert.name}</Text>
          ))}
        </View>
      </View>

      {/* Languages */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>{translatedStrings.languagesTitle}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {data.languages.map((lang, i) => (
            <Text key={i} style={{ fontSize: 9, marginRight: 15, marginBottom: 3 }}>
              {lang.language}: {lang.level}
            </Text>
          ))}
        </View>
      </View>
    </Page>
  );
};

// --- 2. GERMAN TEMPLATE (Fixed image display) ---
const GermanResume: React.FC<ResumeTemplateProps> = ({ data, translatedStrings }) => {
  const s = StyleSheet.create({
    page: { fontFamily: 'NotoSans', fontSize: 10, color: '#333', fontWeight: 400 },
    container: { flexDirection: 'row', flex: 1 },
    leftColumn: { width: '35%', backgroundColor: '#f4f4f4', padding: 20 },
    rightColumn: { width: '65%', padding: '20 20 20 15' },
    photo: { 
      width: 100, 
      height: 120, 
      objectFit: 'cover', 
      alignSelf: 'center', 
      marginBottom: 15,
      border: '1px solid #ddd'
    },
    name: { 
      fontFamily: 'NotoSans', 
      fontSize: 18, 
      fontWeight: 700, 
      textAlign: 'center', 
      marginBottom: 5, 
      color: '#1a202c' 
    },
    title: { 
      fontFamily: 'NotoSans', 
      fontSize: 12, 
      textAlign: 'center', 
      color: '#555', 
      marginBottom: 20,
      fontWeight: 400
    },
    sectionTitle: { 
      fontFamily: 'NotoSans', 
      fontSize: 14, 
      fontWeight: 700, 
      borderBottom: '1.5px solid #333', 
      paddingBottom: 3, 
      marginBottom: 10 
    },
    sidebarTitle: { 
      fontFamily: 'NotoSans', 
      fontSize: 12, 
      fontWeight: 700, 
      color: '#1a202c', 
      marginBottom: 8 
    },
    contactItem: { fontSize: 9, marginBottom: 5 },
    skill: { fontSize: 9, marginBottom: 4 },
    entry: { marginBottom: 12 },
    entryTitle: { fontFamily: 'NotoSans', fontWeight: 700, fontSize: 11 },
    entryMeta: { fontSize: 9, color: '#666', marginBottom: 3 },
  });

  return (
    <Page size="A4" style={s.page}>
      <View style={s.container}>
        <View style={s.leftColumn}>
          {/* Fixed image display */}
          <ImageWithFallback src={meImageBase64} style={s.photo} />
          <Text style={s.name}>{data.personalInfo.name}</Text>
          <Text style={s.title}>{data.personalInfo.title}</Text>
          <Text style={s.sidebarTitle}>{translatedStrings.germanContact}</Text>
          <Text style={s.contactItem}>📍 {data.personalInfo.location}</Text>
          <Text style={s.contactItem}>📞 {data.personalInfo.phone}</Text>
          <Text style={s.contactItem}>✉️ {data.personalInfo.email}</Text>
          {data.personalInfo.birthDate && (
            <Text style={s.contactItem}>🎂 {translatedStrings.germanBirth}: {data.personalInfo.birthDate}</Text>
          )}
          {data.personalInfo.nationality && (
            <Text style={s.contactItem}>🌍 {translatedStrings.germanNationality}: {data.personalInfo.nationality}</Text>
          )}
          <View style={{ marginTop: 15 }}>
            <Text style={[commonStyles.visaStatus, { fontSize: 8, textAlign: 'center' }]}>
              {data.personalInfo.visaStatus}
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={s.sidebarTitle}>{translatedStrings.germanLanguages}</Text>
            {data.languages.map((l, i) => (
              <Text key={i} style={s.skill}>{l.language} ({l.level})</Text>
            ))}
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={s.sidebarTitle}>{translatedStrings.germanSkills}</Text>
            <Text style={s.skill}>• {translatedStrings.germanSkill1}</Text>
            <Text style={s.skill}>• {translatedStrings.germanSkill2}</Text>
            <Text style={s.skill}>• {translatedStrings.germanSkill3}</Text>
            <Text style={s.skill}>• {translatedStrings.germanSkill4}</Text>
            <Text style={s.skill}>• {translatedStrings.germanSkill5}</Text>
          </View>
        </View>
        <View style={s.rightColumn}>
          <Text style={s.sectionTitle}>{translatedStrings.germanSummary}</Text>
          <Text style={{ fontSize: 10, marginBottom: 15, lineHeight: 1.5 }}>{data.summary}</Text>
          <Text style={s.sectionTitle}>{translatedStrings.germanExperience}</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={s.entry}>
              <Text style={s.entryTitle}>{exp.title}</Text>
              <Text style={s.entryMeta}>{exp.company} | {exp.period}</Text>
              {exp.achievements.slice(0, 3).map((ach, j) => (
                <View key={j} style={commonStyles.bullet}>
                  <Text style={commonStyles.bulletChar}>•</Text>
                  <Text style={commonStyles.bulletText}>{ach}</Text>
                </View>
              ))}
            </View>
          ))}
          <Text style={s.sectionTitle}>{translatedStrings.germanEducation}</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={s.entry}>
              <Text style={s.entryTitle}>{edu.degree}</Text>
              <Text style={s.entryMeta}>{edu.institution} | {edu.period}</Text>
              {edu.score && <Text style={{ fontSize: 9 }}>{translatedStrings.germanScore}: {edu.score}</Text>}
            </View>
          ))}
          <Text style={s.sectionTitle}>{translatedStrings.germanProjects}</Text>
          {data.projects.slice(0, 2).map((project, i) => (
            <View key={i} style={s.entry}>
              <Text style={s.entryTitle}>{project.name}</Text>
              <Text style={{ fontSize: 9, marginBottom: 2 }}>{project.description}</Text>
              <Text style={{ fontSize: 8, color: '#666' }}>{translatedStrings.tech}: {project.technologies}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  );
};

// --- 3. JAPANESE TEMPLATE (Fixed image display) ---
const JapaneseResume: React.FC<ResumeTemplateProps> = ({ data, translatedStrings }) => {
  const s = StyleSheet.create({
    page: { 
      padding: 30, 
      fontFamily: 'NotoSansJP', 
      fontSize: 10, 
      lineHeight: 1.4,
      fontWeight: 400
    },
    header: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start', 
      borderBottom: '2px solid black', 
      paddingBottom: 10, 
      marginBottom: 15 
    },
    headerTitle: { fontFamily: 'NotoSansJP', fontSize: 24, fontWeight: 700 },
    headerDate: { fontSize: 10, paddingTop: 14 },
    personalInfoSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      border: '1px solid black',
      padding: 10
    },
    personalInfoTable: {
      flex: 1,
      marginRight: 20
    },
    photo: { 
      width: 85, 
      height: 110, 
      border: '1px solid black',
      objectFit: 'cover'
    },
    infoRow: {
      flexDirection: 'row',
      borderBottom: '1px solid #ccc',
      paddingVertical: 5,
      minHeight: 25
    },
    infoLabel: { 
      width: 80, 
      fontSize: 10,
      borderRight: '1px solid #ccc',
      paddingRight: 5,
      paddingLeft: 2
    },
    infoValue: { 
      flex: 1, 
      fontSize: 10,
      paddingLeft: 5,
      fontWeight: 400
    },
    section: { marginBottom: 20 },
    sectionTitle: { 
      fontFamily: 'NotoSansJP', 
      fontSize: 14, 
      fontWeight: 700, 
      borderBottom: '2px solid black', 
      paddingBottom: 3, 
      marginBottom: 12,
      textAlign: 'center'
    },
    timelineRow: { 
      flexDirection: 'row', 
      marginBottom: 8,
      borderBottom: '1px solid #eee',
      paddingVertical: 4
    },
    timelineDate: { 
      width: 100,
      fontSize: 10,
      textAlign: 'center'
    },
    timelineContent: { 
      flex: 1,
      fontSize: 10
    },
    prBox: {
      border: '1px solid black',
      padding: 10,
      minHeight: 100,
      marginBottom: 15
    },
    hopeBox: {
      border: '1px solid black',
      padding: 10,
      minHeight: 60
    }
  });

  const today = new Date();
  const formatJapaneseDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getFullYear()}年${date.getMonth() + 1}月`;
  };

  return (
    <Page size="A4" style={s.page}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.headerTitle}>{translatedStrings.japaneseTitle}</Text>
        <Text style={s.headerDate}>
          {`${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日 現在`}
        </Text>
      </View>

      {/* Personal Information Section */}
      <View style={s.personalInfoSection}>
        <View style={s.personalInfoTable}>
          <View style={s.infoRow}>
            <Text style={s.infoLabel}>{translatedStrings.japaneseKana}</Text>
            <Text style={s.infoValue}>{data.personalInfo.nameKana || 'ばどる りぶざっと'}</Text>
          </View>
          <View style={[s.infoRow, { minHeight: 35 }]}>
            <Text style={s.infoLabel}>{translatedStrings.japaneseName}</Text>
            <Text style={[s.infoValue, { fontSize: 16, fontWeight: 700 }]}>{data.personalInfo.name}</Text>
          </View>
          <View style={s.infoRow}>
            <Text style={s.infoLabel}>{translatedStrings.japaneseBirth}</Text>
            <Text style={s.infoValue}>{data.personalInfo.birthDate || '1990年12月14日'}</Text>
          </View>
          <View style={s.infoRow}>
            <Text style={s.infoLabel}>住所</Text>
            <Text style={s.infoValue}>{data.personalInfo.location}</Text>
          </View>
          <View style={s.infoRow}>
            <Text style={s.infoLabel}>{translatedStrings.japaneseContact}</Text>
            <Text style={s.infoValue}>{data.personalInfo.phone}</Text>
          </View>
          <View style={s.infoRow}>
            <Text style={s.infoLabel}>メール</Text>
            <Text style={s.infoValue}>{data.personalInfo.email}</Text>
          </View>
        </View>
        {/* Fixed image display */}
        <ImageWithFallback src={meImageBase64} style={s.photo} />
      </View>

      {/* Education and Work History */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>{translatedStrings.japaneseEducationWork}</Text>
        
        <Text style={{ fontWeight: 700, fontSize: 12, marginBottom: 8, textAlign: 'center' }}>
          {translatedStrings.japaneseEducation}
        </Text>
        {data.education.map((edu, i) => (
          <View key={i} style={s.timelineRow}>
            <Text style={s.timelineDate}>{formatJapaneseDate(edu.period)}</Text>
            <Text style={s.timelineContent}>{edu.institution} {edu.degree} 卒業</Text>
          </View>
        ))}

        <Text style={{ fontWeight: 700, fontSize: 12, marginVertical: 8, textAlign: 'center' }}>
          {translatedStrings.japaneseWork}
        </Text>
        {data.experience.map((exp, i) => (
          <View key={i} style={s.timelineRow}>
            <Text style={s.timelineDate}>{formatJapaneseDate(exp.period)}</Text>
            <Text style={s.timelineContent}>{exp.company} {exp.title} として従事</Text>
          </View>
        ))}
        
        <View style={s.timelineRow}>
          <Text style={s.timelineDate}></Text>
          <Text style={[s.timelineContent, { textAlign: 'center', fontWeight: 700 }]}>
            {translatedStrings.japaneseEnd}
          </Text>
        </View>
      </View>

      {/* Certifications */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>{translatedStrings.japaneseCertifications}</Text>
        {data.certifications.slice(0, 8).map((cert, i) => (
          <View key={i} style={s.timelineRow}>
            <Text style={s.timelineDate}>{cert.date}</Text>
            <Text style={s.timelineContent}>{cert.name} ({cert.issuer}) 取得</Text>
          </View>
        ))}
        {data.practicalLicenses.map((lic, i) => (
          <View key={i} style={s.timelineRow}>
            <Text style={s.timelineDate}></Text>
            <Text style={s.timelineContent}>{lic}</Text>
          </View>
        ))}
      </View>

      {/* Self PR */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>{translatedStrings.japanesePR}</Text>
        <View style={s.prBox}>
          <Text style={{ lineHeight: 1.6, fontSize: 10 }}>{data.summary}</Text>
        </View>
      </View>

      {/* Hopes */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>{translatedStrings.japaneseHopes}</Text>
        <View style={s.hopeBox}>
          <Text style={{ lineHeight: 1.6, fontSize: 10 }}>{data.personalInfo.visaStatus}</Text>
        </View>
      </View>
    </Page>
  );
};

// --- 4. MODERN TEMPLATE (Fixed image display for French/Spanish) ---
const ModernResume: React.FC<Props> = ({ data, locale, translatedStrings }) => {
  const s = StyleSheet.create({
    page: { fontFamily: 'NotoSans', fontSize: 10, color: '#333', fontWeight: 400 },
    container: { flexDirection: 'row', flex: 1 },
    leftColumn: { width: '35%', backgroundColor: '#2c3e50', color: 'white', padding: 20 },
    rightColumn: { width: '65%', padding: '20 20 20 15' },
    photo: { 
      width: 100, 
      height: 120, 
      objectFit: 'cover', 
      alignSelf: 'center', 
      marginBottom: 15, 
      borderRadius: 4,
      border: '2px solid white'
    },
    name: { 
      fontFamily: 'NotoSans', 
      fontSize: 20, 
      fontWeight: 700, 
      textAlign: 'center', 
      marginBottom: 5 
    },
    title: { 
      fontFamily: 'NotoSans', 
      fontSize: 12, 
      textAlign: 'center', 
      color: '#ecf0f1', 
      marginBottom: 20,
      fontWeight: 400
    },
    sectionTitle: { 
      fontFamily: 'NotoSans', 
      fontSize: 14, 
      fontWeight: 700, 
      color: '#2c3e50', 
      borderBottom: '1.5px solid #2c3e50', 
      paddingBottom: 3, 
      marginBottom: 10 
    },
    sidebarTitle: { 
      fontFamily: 'NotoSans', 
      fontSize: 12, 
      fontWeight: 700, 
      color: 'white', 
      marginBottom: 8, 
      borderBottom: '1px solid #7f8c8d', 
      paddingBottom: 2 
    },
    contactItem: { fontSize: 9, marginBottom: 5, color: '#ecf0f1' },
    skill: { fontSize: 9, marginBottom: 4, color: '#ecf0f1' },
    entry: { marginBottom: 12 },
    entryTitle: { fontFamily: 'NotoSans', fontWeight: 700, fontSize: 11 },
    entryMeta: { fontSize: 9, color: '#666', marginBottom: 3 },
  });

  return (
    <Page size="A4" style={s.page}>
      <View style={s.container}>
        <View style={s.leftColumn}>
          {/* Fixed image display */}
          <ImageWithFallback src={meImageBase64} style={s.photo} />
          <Text style={s.name}>{data.personalInfo.name}</Text>
          <Text style={s.title}>{data.personalInfo.title}</Text>
          <Text style={s.sidebarTitle}>{translatedStrings.modernContact}</Text>
          <Text style={s.contactItem}>📍 {data.personalInfo.location}</Text>
          <Text style={s.contactItem}>📞 {data.personalInfo.phone}</Text>
          <Text style={s.contactItem}>✉️ {data.personalInfo.email}</Text>
          <Text style={s.contactItem}>🌐 {translatedStrings.modernPortfolio}: {data.personalInfo.portfolio}</Text>
          <View style={{ marginTop: 15 }}>
            <Text style={[commonStyles.visaStatus, { fontSize: 8, backgroundColor: '#3498db', color: 'white' }]}>
              {data.personalInfo.visaStatus}
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={s.sidebarTitle}>{translatedStrings.modernLanguages}</Text>
            {data.languages.map((l, i) => (
              <Text key={i} style={s.skill}>{l.language} ({l.level})</Text>
            ))}
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={s.sidebarTitle}>{translatedStrings.modernSkills}</Text>
            <Text style={s.skill}>• {translatedStrings.modernSkill1}</Text>
            <Text style={s.skill}>• {translatedStrings.modernSkill2}</Text>
            <Text style={s.skill}>• {translatedStrings.modernSkill3}</Text>
            <Text style={s.skill}>• {translatedStrings.modernSkill4}</Text>
            <Text style={s.skill}>• {translatedStrings.modernSkill5}</Text>
          </View>
        </View>
        <View style={s.rightColumn}>
          <Text style={s.sectionTitle}>{translatedStrings.modernSummary}</Text>
          <Text style={{ fontSize: 10, marginBottom: 15, lineHeight: 1.5 }}>{data.summary}</Text>
          <Text style={s.sectionTitle}>{translatedStrings.modernExperience}</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={s.entry}>
              <Text style={s.entryTitle}>{exp.title}</Text>
              <Text style={s.entryMeta}>{exp.company} | {exp.period}</Text>
              {exp.achievements.slice(0, 3).map((ach, j) => (
                <View key={j} style={commonStyles.bullet}>
                  <Text style={commonStyles.bulletChar}>•</Text>
                  <Text style={commonStyles.bulletText}>{ach}</Text>
                </View>
              ))}
            </View>
          ))}
          <Text style={s.sectionTitle}>{translatedStrings.modernEducation}</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={s.entry}>
              <Text style={s.entryTitle}>{edu.degree}</Text>
              <Text style={s.entryMeta}>{edu.institution} | {edu.period}</Text>
              {edu.score && <Text style={{ fontSize: 9 }}>{translatedStrings.modernScore}: {edu.score}</Text>}
            </View>
          ))}
          <Text style={s.sectionTitle}>{translatedStrings.modernProjects}</Text>
          {data.projects.slice(0, 2).map((project, i) => (
            <View key={i} style={s.entry}>
              <Text style={s.entryTitle}>{project.name}</Text>
              <Text style={{ fontSize: 9, marginBottom: 2 }}>{project.description}</Text>
              <Text style={{ fontSize: 8, color: '#666' }}>{translatedStrings.modernTech}: {project.technologies}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  );
};

// --- 5. ARABIC TEMPLATE (Fixed image display) ---
const ArabicResume: React.FC<ResumeTemplateProps> = ({ data, translatedStrings }) => {
  const s = StyleSheet.create({
    page: { 
      fontFamily: 'NotoSansArabic', 
      fontSize: 11, 
      color: '#333', 
      padding: 30,
      fontWeight: 400
    },
    container: { flexDirection: 'row-reverse' },
    leftColumn: { width: '35%', backgroundColor: '#2c3e50', color: 'white', padding: 20 },
    rightColumn: { width: '65%', padding: '20 20 20 15' },
    photo: { 
      width: 90, 
      height: 110, 
      borderRadius: 4, 
      objectFit: 'cover',
      alignSelf: 'center',
      marginBottom: 15,
      border: '2px solid white'
    },
    name: { 
      fontFamily: 'NotoSansArabic', 
      fontSize: 18, 
      fontWeight: 700, 
      textAlign: 'center', 
      color: 'white',
      marginBottom: 5
    },
    title: { 
      fontFamily: 'NotoSansArabic', 
      fontSize: 12, 
      textAlign: 'center', 
      color: '#ecf0f1', 
      marginBottom: 20,
      fontWeight: 400
    },
    sectionTitle: { 
      fontFamily: 'NotoSansArabic', 
      fontSize: 14, 
      fontWeight: 700, 
      color: '#2c3e50', 
      borderBottom: '2px solid #2c3e50', 
      paddingBottom: 4, 
      marginBottom: 8,
      textAlign: 'right'
    },
    sidebarTitle: { 
      fontFamily: 'NotoSansArabic', 
      fontSize: 11, 
      fontWeight: 700, 
      color: 'white', 
      marginBottom: 8,
      textAlign: 'center',
      borderBottom: '1px solid #7f8c8d',
      paddingBottom: 2
    },
    contactItem: { fontSize: 9, marginBottom: 5, color: '#ecf0f1', textAlign: 'center' },
    entry: { marginBottom: 12, textAlign: 'right' },
    entryTitle: { fontFamily: 'NotoSansArabic', fontWeight: 700, fontSize: 11 },
    entryMeta: { fontSize: 9, color: '#6c757d', marginBottom: 3 },
  });

  return (
    <Page size="A4" style={s.page}>
      <View style={s.container}>
        <View style={s.leftColumn}>
          {/* Fixed image display */}
          <ImageWithFallback src={meImageBase64} style={s.photo} />
          <Text style={s.name}>{data.personalInfo.name}</Text>
          <Text style={s.title}>{data.personalInfo.title}</Text>
          <Text style={s.sidebarTitle}>{translatedStrings.arabicContact}</Text>
          <Text style={s.contactItem}>📍 {data.personalInfo.location}</Text>
          <Text style={s.contactItem}>📞 {data.personalInfo.phone}</Text>
          <Text style={s.contactItem}>✉️ {data.personalInfo.email}</Text>
          <View style={{ marginTop: 15 }}>
            <Text style={[commonStyles.visaStatus, { fontSize: 8, backgroundColor: '#3498db', color: 'white' }]}>
              {data.personalInfo.visaStatus}
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={s.sidebarTitle}>{translatedStrings.arabicLanguages}</Text>
            {data.languages.map((l, i) => (
              <Text key={i} style={s.contactItem}>{l.language} ({l.level})</Text>
            ))}
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={s.sidebarTitle}>{translatedStrings.arabicSkills}</Text>
            <Text style={s.contactItem}>• {translatedStrings.arabicSkill1}</Text>
            <Text style={s.contactItem}>• {translatedStrings.arabicSkill2}</Text>
            <Text style={s.contactItem}>• {translatedStrings.arabicSkill3}</Text>
            <Text style={s.contactItem}>• {translatedStrings.arabicSkill4}</Text>
          </View>
        </View>
        <View style={s.rightColumn}>
          <Text style={s.sectionTitle}>{translatedStrings.arabicSummary}</Text>
          <Text style={{ lineHeight: 1.6, marginBottom: 15, textAlign: 'right' }}>{data.summary}</Text>
          <Text style={s.sectionTitle}>{translatedStrings.arabicExperience}</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={s.entry}>
              <Text style={s.entryTitle}>{exp.title} لدى {exp.company}</Text>
              <Text style={s.entryMeta}>{exp.period}</Text>
              {exp.achievements.slice(0, 3).map((ach, j) => (
                <View key={j} style={[commonStyles.bullet, { flexDirection: 'row-reverse' }]}>
                  <Text style={commonStyles.bulletChar}>•</Text>
                  <Text style={[commonStyles.bulletText, { textAlign: 'right' }]}>{ach}</Text>
                </View>
              ))}
            </View>
          ))}
          <Text style={s.sectionTitle}>{translatedStrings.arabicEducation}</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={s.entry}>
              <Text style={s.entryTitle}>{edu.degree} من {edu.institution}</Text>
              <Text style={s.entryMeta}>{edu.period}</Text>
              {edu.score && <Text style={{ fontSize: 10 }}>{translatedStrings.arabicScore}: {edu.score}</Text>}
            </View>
          ))}
          <Text style={s.sectionTitle}>{translatedStrings.arabicProjects}</Text>
          {data.projects.slice(0, 2).map((project, i) => (
            <View key={i} style={s.entry}>
              <Text style={s.entryTitle}>{project.name}</Text>
              <Text style={{ fontSize: 10, marginBottom: 2, textAlign: 'right' }}>{project.description}</Text>
              <Text style={{ fontSize: 9, color: '#666', textAlign: 'right' }}>{translatedStrings.arabicTech}: {project.technologies}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  );
};

// --- MAIN EXPORT COMPONENT WITH PROPER FONT LOADING ---
const CountrySpecificResume: React.FC<Props> = ({ data, locale, translatedStrings, fontsLoaded = false }) => {
  const [internalFontsLoaded, setInternalFontsLoaded] = useState(fontsLoaded);
  const [fontLoadError, setFontLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!internalFontsLoaded && !fontsLoaded) {
      const loadFonts = async () => {
        try {
          await registerFonts();
          setInternalFontsLoaded(true);
          setFontLoadError(null);
        } catch (error) {
          console.error('Font loading failed in PDF component:', error);
          setFontLoadError('Font loading failed, using fallback fonts');
          // Still set to true to render with fallback fonts
          setInternalFontsLoaded(true);
        }
      };
      loadFonts();
    }
  }, [internalFontsLoaded, fontsLoaded]);

  const shouldRenderContent = fontsLoaded || internalFontsLoaded;

  if (!shouldRenderContent) {
    return (
      <Document>
        <Page size="A4" style={{ padding: 50, fontFamily: 'Helvetica' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, marginBottom: 20 }}>Loading fonts...</Text>
            <Text style={{ fontSize: 12, color: '#666' }}>Please wait while we prepare your resume</Text>
          </View>
        </Page>
      </Document>
    );
  }

  const resumeDocument = () => {
    switch (locale) {
      case 'de':
        return <GermanResume data={data} translatedStrings={translatedStrings} />;
      case 'ja':
        return <JapaneseResume data={data} translatedStrings={translatedStrings} />;
      case 'ar':
        return <ArabicResume data={data} translatedStrings={translatedStrings} />;
      case 'en':
        return <USResume data={data} translatedStrings={translatedStrings} />;
      case 'fr':
      case 'es':
      default:
        return <ModernResume data={data} locale={locale} translatedStrings={translatedStrings} />;
    }
  };

  return (
    <Document 
      author="Badr Ribzat" 
      title={`Resume - Badr Ribzat (${locale.toUpperCase()})`}
      subject="Professional Resume"
      keywords="Full-Stack Software Engineer, Visa Sponsorship, International Opportunities"
    >
      {resumeDocument()}
    </Document>
  );
};

export default CountrySpecificResume;
