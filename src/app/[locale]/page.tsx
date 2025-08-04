import { getTranslations } from 'next-intl/server';

import Footer from './(main)/components/footer/Footer';

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('home');

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>{t('title')}</h1>
        <p>{t('underConstruction')}</p>
        <p>{t('currentLocale', { locale })}</p>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
