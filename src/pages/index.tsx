import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import About from '../components/About';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import PDFGenerator from '../components/PDFGenerator';

export default function Home() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale } = router;

  return (
    <>
      <Head>
        <title>{t('common.title')}</title>
        <meta name="description" content={t('about.description')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`min-h-screen bg-gray-50 ${locale === 'ar' ? 'rtl-text' : ''}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-12">
            <About />
            <Experience />
            <Education />
            <Skills />
            <Contact />
            <PDFGenerator />
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});