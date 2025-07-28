import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function ContactUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('contactUs');
  const tCommon = await getTranslations('common');
  
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
      <p>{t('email')}</p>
      <p>{t('phone')}</p>
      
      <div style={{ marginTop: '30px' }}>
        <Link href={`/${locale}/`}>
          {tCommon('backToHome')}
        </Link>
      </div>
    </div>
  );
}