<<<<<<< HEAD
import { ScenariosSection } from './(main)/components/applicable-scenarios';

export default function HomePage() {
  return (
    <div>
      <ScenariosSection />
    </div>
=======
import { getTranslations } from 'next-intl/server';

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('home');
  const _tCommon = await getTranslations('common');

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>{t('title')}</h1>
        <p>{t('underConstruction')}</p>
        <p>{t('currentLocale', { locale })}</p>
      </div>
    </>
>>>>>>> a17400f (re-structure to app router structure & config i18n (#17))
  );
}
