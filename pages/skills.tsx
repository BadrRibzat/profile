// pages/skills.tsx
import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../components/Layout';
import SkillsSection from '../components/SkillsSection';
import SEOHead from '../components/SEOHead';

const SkillsPage: React.FC = () => {
  const { t } = useTranslation(['skills', 'common']);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t('skills:seo.title', 'Skills & Expertise - Badr Ribzat'),
    "description": t('skills:seo.description', 'Technical skills, programming languages, professional certifications, and language proficiencies of Full-Stack Software Engineer Badr Ribzat.'),
    "url": "https://badrribzat.dev/skills",
    "mainEntity": {
      "@type": "Person",
      "name": "Badr Ribzat",
      "jobTitle": "Full-Stack Software Engineer",
      "knowsAbout": [
        "JavaScript", "TypeScript", "Python", "React", "Node.js", 
        "PostgreSQL", "MongoDB", "Docker", "AWS", "Machine Learning"
      ],
      "knowsLanguage": [
        {"@type": "Language", "name": "Arabic", "sameAs": "https://en.wikipedia.org/wiki/Arabic"},
        {"@type": "Language", "name": "English", "sameAs": "https://en.wikipedia.org/wiki/English_language"},
        {"@type": "Language", "name": "French", "sameAs": "https://en.wikipedia.org/wiki/French_language"}
      ]
    }
  };

  return (
    <Layout>
      <SEOHead
        title={t('skills:seo.title', 'Skills & Expertise | Badr Ribzat')}
        description={t('skills:seo.description', 'Comprehensive overview of my technical skills, programming expertise, professional certifications, and multilingual capabilities as a Full-Stack Software Engineer.')}
        keywords="software engineer skills, full-stack developer, programming languages, technical expertise, professional certifications, multilingual"
        image="/images/skills-og.jpg"
        structuredData={structuredData}
      />
      
      <SkillsSection />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'skills'])),
    },
  };
};

export default SkillsPage;
