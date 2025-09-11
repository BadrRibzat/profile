// components/CountrySpecificResume.tsx
import React from 'react';
import { useTranslation } from 'next-i18next';
import { Document, Page, View, Text, StyleSheet, Font } from '@react-pdf/renderer';

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
  education: Array<{
    degree: string;
    institution: string;
    period: string;
    location: string;
    score?: string;
  }>;
  skills: Record<string, string[]>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    score?: string;
  }>;
  languages: Array<{
    language: string;
    level: string;
    proficiency: number;
  }>;
}

interface CountrySpecificResumeProps {
  data: ResumeData;
  country: string;
  locale: string;
}

const CountrySpecificResume: React.FC<CountrySpecificResumeProps> = ({ data, country, locale }) => {
  const { t } = useTranslation('resume');
  
  // Define country-specific styles
  const getCountryStyles = (countryCode: string) => {
    const baseStyles = {
      page: {
        padding: 30,
        fontFamily: 'NotoSans'
      },
      section: {
        marginBottom: 10
      },
      header: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: 'bold'
      },
      subheader: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold'
      },
      text: {
        fontSize: 12,
        marginBottom: 3
      },
      bold: {
        fontWeight: 'bold'
      }
    };

    switch (countryCode) {
      case 'US':
        return {
          ...baseStyles,
          page: { ...baseStyles.page, padding: 25 },
          header: { ...baseStyles.header, fontSize: 18 },
          // US-specific styling
        };
      case 'DE':
        return {
          ...baseStyles,
          page: { ...baseStyles.page, padding: 35 },
          header: { ...baseStyles.header, fontSize: 16 },
          // German-specific styling (Lebenslauf)
        };
      case 'JP':
        return {
          ...baseStyles,
          page: { ...baseStyles.page, padding: 40, fontFamily: 'NotoSansJP' },
          header: { ...baseStyles.header, fontSize: 14 },
          // Japanese-specific styling (履歴書)
        };
      case 'ES':
        return {
          ...baseStyles,
          page: { ...baseStyles.page, padding: 30 },
          header: { ...baseStyles.header, fontSize: 17 },
          // Spanish-specific styling (CV)
        };
      case 'FR':
        return {
          ...baseStyles,
          page: { ...baseStyles.page, padding: 32 },
          header: { ...baseStyles.header, fontSize: 16 },
          // French-specific styling (CV)
        };
      default:
        return baseStyles;
    }
  };

  const styles = StyleSheet.create(getCountryStyles(country));

  const renderJapaneseResume = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Japanese-specific resume format (履歴書) */}
        <View style={styles.section}>
          <Text style={styles.header}>履歴書</Text>
          <Text style={styles.text}>氏名: {data.personalInfo.name}</Text>
          <Text style={styles.text}>連絡先: {data.personalInfo.email} | {data.personalInfo.phone}</Text>
          <Text style={styles.text}>GitHub: {data.personalInfo.github}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>職務要約</Text>
          <Text style={styles.text}>{data.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>職務経験</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={{ marginBottom: 8 }}>
              <Text style={styles.text}>
                <Text style={styles.bold}>{exp.title}</Text> - {exp.company}
              </Text>
              <Text style={styles.text}>{exp.period} | {exp.location}</Text>
              {exp.achievements.map((achv, idx) => (
                <Text key={idx} style={{ ...styles.text, marginLeft: 10 }}>• {achv}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>学歴</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 5 }}>
              <Text style={styles.text}>
                <Text style={styles.bold}>{edu.degree}</Text> - {edu.institution}
              </Text>
              <Text style={styles.text}>{edu.period} | {edu.location} {edu.score && `| Score: ${edu.score}`}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>スキル</Text>
          {Object.entries(data.skills).map(([category, skills], index) => (
            <View key={index} style={{ marginBottom: 5 }}>
              <Text style={{ ...styles.text, ...styles.bold }}>{category}:</Text>
              <Text style={styles.text}>{skills.join(', ')}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>言語能力</Text>
          {data.languages.map((lang, index) => (
            <Text key={index} style={styles.text}>
              {lang.language}: {lang.level} ({lang.proficiency}%)
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );

  const renderGermanResume = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* German-specific resume format (Lebenslauf) */}
        <View style={styles.section}>
          <Text style={styles.header}>Lebenslauf</Text>
          <Text style={styles.text}>Name: {data.personalInfo.name}</Text>
          <Text style={styles.text}>Position: {data.personalInfo.title}</Text>
          <Text style={styles.text}>Kontakt: {data.personalInfo.email} | {data.personalInfo.phone}</Text>
          <Text style={styles.text}>GitHub: {data.personalInfo.github}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Berufliche Zusammenfassung</Text>
          <Text style={styles.text}>{data.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Berufserfahrung</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={{ marginBottom: 8 }}>
              <Text style={styles.text}>
                <Text style={styles.bold}>{exp.title}</Text> - {exp.company}
              </Text>
              <Text style={styles.text}>{exp.period} | {exp.location}</Text>
              {exp.achievements.map((achv, idx) => (
                <Text key={idx} style={{ ...styles.text, marginLeft: 10 }}>• {achv}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Ausbildung</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 5 }}>
              <Text style={styles.text}>
                <Text style={styles.bold}>{edu.degree}</Text> - {edu.institution}
              </Text>
              <Text style={styles.text}>{edu.period} | {edu.location} {edu.score && `| Note: ${edu.score}`}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Fähigkeiten</Text>
          {Object.entries(data.skills).map(([category, skills], index) => (
            <View key={index} style={{ marginBottom: 5 }}>
              <Text style={{ ...styles.text, ...styles.bold }}>{category}:</Text>
              <Text style={styles.text}>{skills.join(', ')}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Sprachkenntnisse</Text>
          {data.languages.map((lang, index) => (
            <Text key={index} style={styles.text}>
              {lang.language}: {lang.level} ({lang.proficiency}%)
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );

  const renderStandardResume = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Standard international resume format */}
        <View style={styles.section}>
          <Text style={styles.header}>{data.personalInfo.name}</Text>
          <Text style={styles.text}>{data.personalInfo.title}</Text>
          <Text style={styles.text}>{data.personalInfo.location}</Text>
          <Text style={styles.text}>{data.personalInfo.phone} | {data.personalInfo.email}</Text>
          <Text style={styles.text}>GitHub: {data.personalInfo.github}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Professional Summary</Text>
          <Text style={styles.text}>{data.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Experience</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={{ marginBottom: 8 }}>
              <Text style={styles.text}>
                <Text style={styles.bold}>{exp.title}</Text> - {exp.company}
              </Text>
              <Text style={styles.text}>{exp.period} | {exp.location}</Text>
              {exp.achievements.map((achv, idx) => (
                <Text key={idx} style={{ ...styles.text, marginLeft: 10 }}>• {achv}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 5 }}>
              <Text style={styles.text}>
                <Text style={styles.bold}>{edu.degree}</Text> - {edu.institution}
              </Text>
              <Text style={styles.text}>{edu.period} | {edu.location} {edu.score && `| Score: ${edu.score}`}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Skills</Text>
          {Object.entries(data.skills).map(([category, skills], index) => (
            <View key={index} style={{ marginBottom: 5 }}>
              <Text style={{ ...styles.text, ...styles.bold }}>{category}:</Text>
              <Text style={styles.text}>{skills.join(', ')}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Languages</Text>
          {data.languages.map((lang, index) => (
            <Text key={index} style={styles.text}>
              {lang.language}: {lang.level} ({lang.proficiency}%)
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );

  // Return appropriate resume format based on country
  switch (country) {
    case 'JP':
      return renderJapaneseResume();
    case 'DE':
      return renderGermanResume();
    default:
      return renderStandardResume();
  }
};

export default CountrySpecificResume;
