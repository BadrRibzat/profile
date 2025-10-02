// pages/_app.tsx
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import '../styles/globals.css';

import nextI18NextConfig from '../next-i18next.config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
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
