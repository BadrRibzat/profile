// pages/_app.tsx
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import nextI18NextConfig from '../next-i18next.config.js';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        titleTemplate="%s | Badr Ribzat"
        defaultTitle="Badr Ribzat | Full-Stack Software Engineer"
        description="Self-taught Full-Stack Software Engineer specializing in AI, biomedical applications, and educational technology."
        canonical="https://badrribzat.dev"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://badrribzat.dev',
          siteName: 'Badr Ribzat Portfolio',
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
