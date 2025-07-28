import Link from 'next/link';
import Footer from './(main)/components/Footer/Footer';

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>Meetly Omni Landing Page</h1>
        <p>The page is under construction.</p>
        <p>Current locale: {locale}</p>

        <nav style={{ marginTop: '20px' }}>
          <Link href={`/${locale}/contact-us`} style={{ marginRight: '20px' }}>
            Contact Us
          </Link>
          <Link href={`/${locale}/login`} style={{ marginRight: '20px' }}>
            Login
          </Link>
          <Link href={`/${locale}/signup`}>
            Sign Up
          </Link>
        </nav>
      </div>
      <Footer />
    </>
  );
}
