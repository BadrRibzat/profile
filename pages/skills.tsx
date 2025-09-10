// pages/skills.tsx
import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../components/Layout';
import SkillsSection from '../components/SkillsSection';

const SkillsPage: React.FC = () => {
  const { t } = useTranslation('skills');

  return (
    <Layout title={t('seo.title')} description={t('seo.description')}>
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
