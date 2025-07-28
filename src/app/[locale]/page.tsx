import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import Footer from './(main)/components/Footer/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');
  
  return (
    <>
      <LanguageSwitcher />
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>{t('title')}</h1>
        <p>{t('underConstruction')}</p>
        <p>{t('currentLocale', { locale })}</p>

        <nav style={{ marginTop: '20px' }}>
          <Link href={`/${locale}/contact-us`} style={{ marginRight: '20px' }}>
            {tCommon('contactUs')}
          </Link>
          <Link href={`/${locale}/login`} style={{ marginRight: '20px' }}>
            {tCommon('login')}
          </Link>
          <Link href={`/${locale}/signup`}>
            {tCommon('signUp')}
          </Link>
        </nav>
      </div>
      <Footer />
    </>
  );
}
