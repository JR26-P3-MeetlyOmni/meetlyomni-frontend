import { getTranslations } from 'next-intl/server';

import FaqAccordion from './(main)/components/FaqAccordion';

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('home');
  const tLanding = await getTranslations('LandingPage');

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>{t('title')}</h1>
        <p>{t('underConstruction')}</p>
        <p>{t('currentLocale', { locale })}</p>
        <p>FAQ Title: {tLanding('faq.title')}</p>
      </div>
      <FaqAccordion />
    </>
  );
}
