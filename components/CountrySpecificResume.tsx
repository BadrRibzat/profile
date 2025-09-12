// components/CountrySpecificResume.tsx
import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  Image,
  Link,
} from '@react-pdf/renderer';

/* --------------  FONT LOADING  -------------- */
Font.register({
  family: 'NotoSans',
  fonts: [
    { src: '/fonts/NotoSans-Regular.ttf' },
    { src: '/fonts/NotoSans-Bold.ttf', fontWeight: 'bold' },
  ],
});

Font.register({
  family: 'NotoSansArabic',
  fonts: [
    { src: '/fonts/NotoSansArabic-Regular.ttf' },
    { src: '/fonts/NotoSansArabic-Bold.ttf', fontWeight: 'bold' },
  ],
});

Font.register({
  family: 'NotoSansJP',
  fonts: [
    { src: '/fonts/NotoSansJP-Regular.ttf' },
    { src: '/fonts/NotoSansJP-Bold.ttf', fontWeight: 'bold' },
  ],
});

/* --------------  TYPES  -------------- */
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
    birthDate?: string;
    nationality?: string;
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
    links: { live?: string; github?: string; docs?: string };
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

interface Props {
  data: ResumeData;
  locale: string;
}

/* --------------  HELPERS  -------------- */
const t = (en: string, ja: string, de: string, fr: string, es: string, ar: string, locale: string) => {
  if (locale === 'ja') return ja;
  if (locale === 'de') return de;
  if (locale === 'fr') return fr;
  if (locale === 'es') return es;
  if (locale === 'ar') return ar;
  return en;
};

/* --------------  GERMAN Lebenslauf  -------------- */
const GermanResume = ({ data }: { data: ResumeData }) => {
  const s = StyleSheet.create({
    page: { padding: 35, fontFamily: 'NotoSans', fontSize: 11 },
    header: { flexDirection: 'row', marginBottom: 20 },
    photo: { width: 80, height: 100, border: '1 solid #000', marginRight: 20 },
    name: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    title: { fontSize: 14, color: '#666', marginBottom: 10 },
    contact: { fontSize: 10, marginBottom: 3 },
    section: { marginBottom: 15 },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, borderBottom: '1 solid #333', paddingBottom: 3 },
    timelineEntry: { marginBottom: 8 },
    timelineHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
    timelineDate: { width: 120, fontWeight: 'bold' },
    timelineTitle: { fontWeight: 'bold', flex: 1 },
    timelineSubtitle: { fontStyle: 'italic', marginBottom: 3 },
    bullet: { marginLeft: 10, marginBottom: 2 },
    skillBadge: { backgroundColor: '#f0f0f0', padding: '3 6', borderRadius: 3, fontSize: 9, margin: 2 },
    visaBox: { marginTop: 15, padding: 10, backgroundColor: '#fef3c7', borderRadius: 5 },
  });

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Image src="/images/me.jpg" style={s.photo} />
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{data.personalInfo.name}</Text>
            <Text style={s.title}>{data.personalInfo.title}</Text>
            <Text style={s.contact}>{data.personalInfo.location}</Text>
            <Text style={s.contact}>{data.personalInfo.phone}</Text>
            <Text style={s.contact}>{data.personalInfo.email}</Text>
            <Text style={s.contact}>{data.personalInfo.github}</Text>
            <Text style={s.contact}>{data.personalInfo.linkedin}</Text>
            <Text style={[s.contact, { color: '#059669', fontWeight: 'bold' }]}>{data.personalInfo.visaStatus}</Text>
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Berufliche Zusammenfassung</Text>
          <Text>{data.summary}</Text>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Berufserfahrung</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={s.timelineEntry}>
              <View style={s.timelineHeader}>
                <Text style={s.timelineDate}>{exp.period}</Text>
                <Text style={s.timelineTitle}>{exp.title}</Text>
              </View>
              <Text style={s.timelineSubtitle}>{exp.company} | {exp.location}</Text>
              {exp.achievements.map((a, j) => (
                <Text key={j} style={s.bullet}>• {a}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Ausbildung</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={s.timelineEntry}>
              <View style={s.timelineHeader}>
                <Text style={s.timelineDate}>{edu.period}</Text>
                <Text style={s.timelineTitle}>{edu.degree}</Text>
              </View>
              <Text style={s.timelineSubtitle}>{edu.institution}</Text>
              {edu.score && <Text>Note: {edu.score}</Text>}
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Technische Fähigkeiten</Text>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Programmiersprachen:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.technicalSkills.languages.map((l) => (
              <Text style={s.skillBadge} key={l}>{l}</Text>
            ))}
          </View>
          <Text style={{ fontWeight: 'bold', marginTop: 8, marginBottom: 5 }}>Frontend:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.technicalSkills.frontend.map((l) => (
              <Text style={s.skillBadge} key={l}>{l}</Text>
            ))}
          </View>
          <Text style={{ fontWeight: 'bold', marginTop: 8, marginBottom: 5 }}>Backend:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.technicalSkills.backend.map((l) => (
              <Text style={s.skillBadge} key={l}>{l}</Text>
            ))}
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Sprachen</Text>
          {data.languages.map((l) => (
            <Text key={l.language}>
              <Text style={{ fontWeight: 'bold' }}>{l.language}:</Text> {l.level}
            </Text>
          ))}
        </View>

        <View style={s.visaBox}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#92400e' }}>
            Verfügbar für: Praktika • Einstiegspositionen • Ausbildung • Trainingsprogramme
          </Text>
          <Text style={{ fontSize: 9, color: '#78350f', marginTop: 3 }}>
            Bereit, international mit geeigneter Visumsponsoring zu ziehen. Schneller Lerner mit langfristigem Wachstumswillen.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

/* --------------  JAPANESE RIREKISHO  -------------- */
const JapaneseResume = ({ data }: { data: ResumeData }) => {
  const s = StyleSheet.create({
    page: { padding: 20, fontFamily: 'NotoSansJP', fontSize: 10 },
    header: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    section: { marginBottom: 8 },
    sectionTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 5, borderBottom: '1 solid #000', paddingBottom: 2 },
    row: { flexDirection: 'row', marginBottom: 4 },
    label: { width: 80, fontWeight: 'bold' },
    value: { flex: 1 },
    date: { width: 60, textAlign: 'right', marginRight: 10 },
    content: { flex: 1 },
    photo: { position: 'absolute', top: 20, right: 20, width: 40, height: 50, border: '1 solid #000' },
  });

  const now = new Date();
  const today = `${now.getFullYear()}年 ${now.getMonth() + 1}月 ${now.getDate()}日現在`;

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <Image src="/images/me.jpg" style={s.photo} />
        <Text style={s.header}>履 歴 書</Text>
        <Text style={{ textAlign: 'right', marginBottom: 15 }}>{today}</Text>

        <View style={s.section}>
          <View style={s.row}>
            <Text style={s.label}>ふりがな</Text>
            <Text style={s.value}>{data.personalInfo.nameKana || data.personalInfo.name}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.label}>氏名</Text>
            <Text style={s.value}>{data.personalInfo.name}</Text>
          </View>
        </View>

        <View style={s.section}>
          <View style={s.row}>
            <Text style={s.label}>生年月日</Text>
            <Text style={s.value}>{data.personalInfo.birthDate || '1990年12月14日生'}（満{now.getFullYear() - 1990}歳）</Text>
          </View>
          <View style={s.row}>
            <Text style={s.label}>国籍</Text>
            <Text style={s.value}>{data.personalInfo.nationality || 'Moroccan'}</Text>
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>学歴・職歴</Text>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>学歴</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={s.row}>
              <Text style={s.date}>{edu.period}</Text>
              <Text style={s.content}>{edu.institution} {edu.degree}</Text>
            </View>
          ))}
          <Text style={{ fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>職歴</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={s.row}>
              <Text style={s.date}>{exp.period}</Text>
              <Text style={s.content}>{exp.company} {exp.title}</Text>
            </View>
          ))}
          <View style={s.row}>
            <Text style={s.date} />
            <Text style={s.content}>以上</Text>
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>免許・資格</Text>
          {data.certifications.map((c, i) => (
            <View key={i} style={s.row}>
              <Text style={s.date}>{c.date}</Text>
              <Text style={s.content}>{c.name} – {c.issuer}</Text>
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>特技・自己PR</Text>
          <Text>{data.summary}</Text>
          <Text>プログラミング言語: {data.technicalSkills.languages.join(', ')}</Text>
          <Text>フロントエンド: {data.technicalSkills.frontend.join(', ')}</Text>
          <Text>バックエンド: {data.technicalSkills.backend.join(', ')}</Text>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>本人希望記入欄</Text>
          <Text>貴社の規定に従います。ビザスポンサーシップをお願いします。</Text>
        </View>
      </Page>
    </Document>
  );
};

/* --------------  FRENCH CV  -------------- */
const FrenchResume = ({ data }: { data: ResumeData }) => {
  const s = StyleSheet.create({
    page: { padding: 30, fontFamily: 'NotoSans', fontSize: 11 },
    header: { flexDirection: 'row', marginBottom: 20 },
    photo: { width: 80, height: 100, border: '1 solid #000', marginRight: 20 },
    name: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
    title: { fontSize: 14, color: '#666', marginBottom: 10 },
    contact: { fontSize: 10, marginBottom: 3 },
    section: { marginBottom: 15 },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, borderBottom: '1 solid #333', paddingBottom: 3, color: '#1e40af' },
    timelineEntry: { marginBottom: 10 },
    timelineHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
    timelineDate: { width: 120, fontWeight: 'bold', color: '#666' },
    timelineTitle: { fontWeight: 'bold', flex: 1 },
    timelineSubtitle: { fontStyle: 'italic', marginBottom: 5, color: '#444' },
    bullet: { marginLeft: 10, marginBottom: 2 },
    skillBadge: { backgroundColor: '#eff6ff', padding: '3 6', borderRadius: 3, fontSize: 9, color: '#1e40af', margin: 2 },
    visaBox: { marginTop: 15, padding: 10, backgroundColor: '#fef3c7', borderRadius: 5 },
  });

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Image src="/images/me.jpg" style={s.photo} />
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{data.personalInfo.name}</Text>
            <Text style={s.title}>{data.personalInfo.title}</Text>
            <Text style={s.contact}>{data.personalInfo.location}</Text>
            <Text style={s.contact}>{data.personalInfo.phone}</Text>
            <Text style={s.contact}>{data.personalInfo.email}</Text>
            <Text style={s.contact}>{data.personalInfo.github}</Text>
            <Text style={s.contact}>{data.personalInfo.linkedin}</Text>
            <Text style={[s.contact, { color: '#059669', fontWeight: 'bold' }]}>{data.personalInfo.visaStatus}</Text>
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Objectif Professionnel</Text>
          <Text>{data.objective}</Text>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Expérience Professionnelle</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={s.timelineEntry}>
              <View style={s.timelineHeader}>
                <Text style={s.timelineDate}>{exp.period}</Text>
                <Text style={s.timelineTitle}>{exp.title}</Text>
              </View>
              <Text style={s.timelineSubtitle}>{exp.company} | {exp.location}</Text>
              {exp.achievements.map((a, j) => (
                <Text key={j} style={s.bullet}>• {a}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Formation</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={s.timelineEntry}>
              <View style={s.timelineHeader}>
                <Text style={s.timelineDate}>{edu.period}</Text>
                <Text style={s.timelineTitle}>{edu.degree}</Text>
              </View>
              <Text style={s.timelineSubtitle}>{edu.institution}</Text>
              {edu.score && <Text>Note: {edu.score}</Text>}
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Compétences Techniques</Text>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Langages de programmation:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.technicalSkills.languages.map((l) => (
              <Text style={s.skillBadge} key={l}>{l}</Text>
            ))}
          </View>
          <Text style={{ fontWeight: 'bold', marginTop: 8, marginBottom: 5 }}>Frontend:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.technicalSkills.frontend.map((l) => (
              <Text style={s.skillBadge} key={l}>{l}</Text>
            ))}
          </View>
          <Text style={{ fontWeight: 'bold', marginTop: 8, marginBottom: 5 }}>Backend:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.technicalSkills.backend.map((l) => (
              <Text style={s.skillBadge} key={l}>{l}</Text>
            ))}
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Langues</Text>
          {data.languages.map((l) => (
            <Text key={l.language}>
              <Text style={{ fontWeight: 'bold' }}>{l.language}:</Text> {l.level}
            </Text>
          ))}
        </View>

        <View style={s.visaBox}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#92400e' }}>
            Disponible pour : Stages • Postes débutants • Alternance (Ausbildung) • Programmes de formation
          </Text>
          <Text style={{ fontSize: 9, color: '#78350f', marginTop: 3 }}>
            Prêt à déménager à l'international avec parrainage de visa approprié. Apprenant rapide, engagé dans une croissance à long terme.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

/* --------------  ARABIC RTL  -------------- */
const ArabicResume = ({ data }: { data: ResumeData }) => {
  const s = StyleSheet.create({
    page: { padding: 30, fontFamily: 'NotoSansArabic', fontSize: 11, direction: 'rtl' },
    header: { flexDirection: 'row', marginBottom: 20, justifyContent: 'flex-end' },
    photo: { width: 80, height: 100, border: '1 solid #000', marginLeft: 20 },
    name: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
    title: { fontSize: 14, color: '#666', marginBottom: 10 },
    contact: { fontSize: 10, marginBottom: 3, textAlign: 'right' },
    section: { marginBottom: 15 },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, borderBottom: '1 solid #333', paddingBottom: 3, color: '#1e40af', textAlign: 'right' },
    timelineEntry: { marginBottom: 10 },
    timelineHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
    timelineDate: { width: 120, fontWeight: 'bold', color: '#666' },
    timelineTitle: { fontWeight: 'bold', flex: 1, textAlign: 'right' },
    timelineSubtitle: { fontStyle: 'italic', marginBottom: 5, color: '#444', textAlign: 'right' },
    bullet: { marginRight: 10, marginBottom: 2, textAlign: 'right' },
    skillBadge: { backgroundColor: '#eff6ff', padding: '3 6', borderRadius: 3, fontSize: 9, color: '#1e40af', margin: 2 },
    visaBox: { marginTop: 15, padding: 10, backgroundColor: '#fef3c7', borderRadius: 5 },
  });

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={s.name}>{data.personalInfo.name}</Text>
            <Text style={s.title}>{data.personalInfo.title}</Text>
            <Text style={s.contact}>{data.personalInfo.location}</Text>
            <Text style={s.contact}>{data.personalInfo.phone}</Text>
            <Text style={s.contact}>{data.personalInfo.email}</Text>
            <Text style={s.contact}>{data.personalInfo.github}</Text>
            <Text style={s.contact}>{data.personalInfo.linkedin}</Text>
            <Text style={[s.contact, { color: '#059669', fontWeight: 'bold' }]}>{data.personalInfo.visaStatus}</Text>
          </View>
          <Image src="/images/me.jpg" style={s.photo} />
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>الهدف المهني</Text>
          <Text style={{ textAlign: 'right' }}>{data.objective}</Text>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>الخبرة المهنية</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={s.timelineEntry}>
              <View style={s.timelineHeader}>
                <Text style={s.timelineDate}>{exp.period}</Text>
                <Text style={s.timelineTitle}>{exp.title}</Text>
              </View>
              <Text style={s.timelineSubtitle}>{exp.company} | {exp.location}</Text>
              {exp.achievements.map((a, j) => (
                <Text key={j} style={s.bullet}>• {a}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>التعليم</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={s.timelineEntry}>
              <View style={s.timelineHeader}>
                <Text style={s.timelineDate}>{edu.period}</Text>
                <Text style={s.timelineTitle}>{edu.degree}</Text>
              </View>
              <Text style={s.timelineSubtitle}>{edu.institution}</Text>
              {edu.score && <Text style={{ textAlign: 'right' }}>النسبة: {edu.score}</Text>}
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>المهارات التقنية</Text>
          <Text style={{ fontWeight: 'bold', marginBottom: 5, textAlign: 'right' }}>لغات البرمجة:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {data.technicalSkills.languages.map((l) => (
              <Text style={s.skillBadge} key={l}>{l}</Text>
            ))}
          </View>
          <Text style={{ fontWeight: 'bold', marginTop: 8, marginBottom: 5, textAlign: 'right' }}>واجهة المستخدم:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {data.technicalSkills.frontend.map((l) => (
              <Text style={s.skillBadge} key={l}>{l}</Text>
            ))}
          </View>
          <Text style={{ fontWeight: 'bold', marginTop: 8, marginBottom: 5, textAlign: 'right' }}>الخادم:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {data.technicalSkills.backend.map((l) => (
              <Text style={s.skillBadge} key={l}>{l}</Text>
            ))}
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>اللغات</Text>
          {data.languages.map((l) => (
            <Text key={l.language} style={{ textAlign: 'right' }}>
              <Text style={{ fontWeight: 'bold' }}>{l.language}:</Text> {l.level}
            </Text>
          ))}
        </View>

        <View style={s.visaBox}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#92400e', textAlign: 'right' }}>
            متاح للتدريبات، الوظائف المبتدئة، التلمذة المهنية (Ausbildung)، وبرامج التدريب.
          </Text>
          <Text style={{ fontSize: 9, color: '#78350f', marginTop: 3, textAlign: 'right' }}>
            مستعد للانتقال دوليًا مع رعاية تأشيرة مناسبة. متعلم سريع وملتزم بالنمو طويل الأمد.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

/* --------------  SPANISH CV  -------------- */
const SpanishResume = ({ data }: { data: ResumeData }) => {
  const s = StyleSheet.create({
    page: { padding: 30, fontFamily: 'NotoSans', fontSize: 11 },
    header: { flexDirection: 'row', marginBottom: 20 },
    photo: { width: 80, height: 100, border: '1 solid #000', marginRight: 20 },
    name: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
    title: { fontSize: 14, color: '#666', marginBottom: 10 },
    contact: { fontSize: 10, marginBottom: 3 },
    section: { marginBottom: 15 },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, borderBottom: '1 solid #333', paddingBottom: 3, color: '#1e40af' },
    timelineEntry: { marginBottom: 10 },
    timelineHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
    timelineDate: { width: 120, fontWeight: 'bold', color: '#666' },
    timelineTitle: { fontWeight: 'bold', flex: 1 },
    timelineSubtitle: { fontStyle: 'italic', marginBottom: 5, color: '#444' },
    bullet: { marginLeft: 10, marginBottom: 2 },
    skillBadge: { backgroundColor: '#eff6ff', padding: '3 6', borderRadius: 3, fontSize: 9, color: '#1e40af', margin: 2 },
    visaBox: { marginTop: 15, padding: 10, backgroundColor: '#fef3c7', borderRadius: 5 },
  });

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Image src="/images/me.jpg" style={s.photo} />
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{data.personalInfo.name}</Text>
            <Text style={s.title}>{data.personalInfo.title}</Text>
            <Text style={s.contact}>{data.personalInfo.location}</Text>
            <Text style={s.contact}>{data.personalInfo.phone}</Text>
            <Text style={s.contact}>{data.personalInfo.email}</Text>
            <Text style={s.contact}>{data.personalInfo.github}</Text>
            <Text style={s.contact}>{data.personalInfo.linkedin}</Text>
            <Text style={[s.contact, { color: '#059669', fontWeight: 'bold' }]}>{data.personalInfo.visaStatus}</Text>
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Objetivo Profesional</Text>
          <Text>{data.objective}</Text>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Resumen Profesional</Text>
          <Text>{data.summary}</Text>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Experiencia Laboral</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={s.timelineEntry}>
              <View style={s.timelineHeader}>
                <Text style={s.timelineDate}>{exp.period}</Text>
                <Text style={s.timelineTitle}>{exp.title}</Text>
              </View>
              <Text style={s.timelineSubtitle}>{exp.company} | {exp.location}</Text>
              {exp.achievements.map((a, j) => (
                <Text key={j} style={s.bullet}>• {a}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Educación</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={s.timelineEntry}>
              <View style={s.timelineHeader}>
                <Text style={s.timelineDate}>{edu.period}</Text>
                <Text style={s.timelineTitle}>{edu.degree}</Text>
              </View>
              <Text style={s.timelineSubtitle}>{edu.institution}</Text>
              {edu.score && <Text>Nota: {edu.score}</Text>}
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Habilidades Técnicas</Text>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Lenguajes de programación:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.technicalSkills.languages.map((l) => (
              <Text style={s.skillBadge} key={l}>{l}</Text>
            ))}
          </View>
          <Text style={{ fontWeight: 'bold', marginTop: 8, marginBottom: 5 }}>Frontend:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.technicalSkills.frontend.map((l) => (
              <Text style={s.skillBadge} key={l}>{l}</Text>
            ))}
          </View>
          <Text style={{ fontWeight: 'bold', marginTop: 8, marginBottom: 5 }}>Backend:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.technicalSkills.backend.map((l) => (
              <Text style={s.skillBadge} key={l}>{l}</Text>
            ))}
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Idiomas</Text>
          {data.languages.map((l) => (
            <Text key={l.language}>
              <Text style={{ fontWeight: 'bold' }}>{l.language}:</Text> {l.level}
            </Text>
          ))}
        </View>

        <View style={s.visaBox}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#92400e' }}>
            Disponible para: Pasantías • Puestos de nivel inicial • Aprendizajes (Ausbildung) • Programas de capacitación
          </Text>
          <Text style={{ fontSize: 9, color: '#78350f', marginTop: 3 }}>
            Dispuesto a reubicarse internacionalmente con patrocinio de visa adecuado. Aprendiz rápido comprometido con el crecimiento a largo plazo.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

/* --------------  STANDARD / EN  -------------- */
const StandardResume = ({ data }: { data: ResumeData }) => {
  const s = StyleSheet.create({
    page: { padding: 30, fontFamily: 'NotoSans', fontSize: 11 },
    header: { flexDirection: 'row', marginBottom: 20 },
    photo: { width: 80, height: 100, border: '1 solid #000', marginRight: 20 },
    name: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
    title: { fontSize: 14, color: '#666', marginBottom: 10 },
    contact: { fontSize: 10, marginBottom: 3 },
    section: { marginBottom: 15 },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, borderBottom: '1 solid #333', paddingBottom: 3, color: '#1e40af' },
    timelineEntry: { marginBottom: 10 },
    timelineHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
    timelineDate: { width: 120, fontWeight: 'bold', color: '#666' },
    timelineTitle: { fontWeight: 'bold', flex: 1 },
    timelineSubtitle: { fontStyle: 'italic', marginBottom: 5, color: '#444' },
    bullet: { marginLeft: 10, marginBottom: 2 },
    skillBadge: { backgroundColor: '#eff6ff', padding: '3 6', borderRadius: 3, fontSize: 9, color: '#1e40af', margin: 2 },
    visaBox: { marginTop: 15, padding: 10, backgroundColor: '#fef3c7', borderRadius: 5 },
  });

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Image src="/images/me.jpg" style={s.photo} />
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{data.personalInfo.name}</Text>
            <Text style={s.title}>{data.personalInfo.title}</Text>
            <Text style={s.contact}>{data.personalInfo.location}</Text>
            <Text style={s.contact}>{data.personalInfo.phone}</Text>
            <Text style={s.contact}>{data.personalInfo.email}</Text>
            <Text style={s.contact}>{data.personalInfo.github}</Text>
            <Text style={s.contact}>{data.personalInfo.linkedin}</Text>
            <Text style={[s.contact, { color: '#059669', fontWeight: 'bold' }]}>{data.personalInfo.visaStatus}</Text>
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Objective</Text>
          <Text>{data.objective}</Text>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Professional Summary</Text>
          <Text>{data.summary}</Text>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={s.timelineEntry}>
              <View style={s.timelineHeader}>
                <Text style={s.timelineDate}>{exp.period}</Text>
                <Text style={s.timelineTitle}>{exp.title}</Text>
              </View>
              <Text style={s.timelineSubtitle}>{exp.company} | {exp.location}</Text>
              {exp.achievements.map((a, j) => (
                <Text key={j} style={s.bullet}>• {a}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Education</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={s.timelineEntry}>
              <View style={s.timelineHeader}>
                <Text style={s.timelineDate}>{edu.period}</Text>
                <Text style={s.timelineTitle}>{edu.degree}</Text>
              </View>
              <Text style={s.timelineSubtitle}>{edu.institution}</Text>
              {edu.score && <Text>Score: {edu.score}</Text>}
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Technical Skills</Text>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Programming Languages:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.technicalSkills.languages.map((l) => (
              <Text style={s.skillBadge} key={l}>{l}</Text>
            ))}
          </View>
          <Text style={{ fontWeight: 'bold', marginTop: 8, marginBottom: 5 }}>Frontend:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.technicalSkills.frontend.map((l) => (
              <Text style={s.skillBadge} key={l}>{l}</Text>
            ))}
          </View>
          <Text style={{ fontWeight: 'bold', marginTop: 8, marginBottom: 5 }}>Backend:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.technicalSkills.backend.map((l) => (
              <Text style={s.skillBadge} key={l}>{l}</Text>
            ))}
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Languages</Text>
          {data.languages.map((l) => (
            <Text key={l.language}>
              <Text style={{ fontWeight: 'bold' }}>{l.language}:</Text> {l.level}
            </Text>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Certifications</Text>
          {data.certifications.map((c) => (
            <Text key={c.name}>
              <Text style={{ fontWeight: 'bold' }}>{c.name}</Text> – {c.issuer} ({c.date})
            </Text>
          ))}
        </View>

        <View style={s.visaBox}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#92400e' }}>
            Available for: Internships • Entry-Level Positions • Apprenticeships (Ausbildung) • Training Programs
          </Text>
          <Text style={{ fontSize: 9, color: '#78350f', marginTop: 3 }}>
            Willing to relocate internationally with appropriate visa sponsorship. Fast learner committed to long-term growth.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

/* --------------  MAIN EXPORT  -------------- */
const CountrySpecificResume: React.FC<Props> = ({ data, locale }) => {
  switch (locale) {
    case 'de':
      return <GermanResume data={data} />;
    case 'ja':
      return <JapaneseResume data={data} />;
    case 'fr':
      return <FrenchResume data={data} />;
    case 'ar':
      return <ArabicResume data={data} />;
    case 'es':
      return <SpanishResume data={data} />;
    default:
      return <StandardResume data={data} />;
  }
};

export default CountrySpecificResume;
