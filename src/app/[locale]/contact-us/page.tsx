import Link from 'next/link';

export default async function ContactUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Contact Us</h1>
      <p>Get in touch with our team</p>
      <p>Email: contact@meetlyomni.com</p>
      <p>Phone: +1 (555) 123-4567</p>
      
      <div style={{ marginTop: '30px' }}>
        <Link href={`/${locale}/`}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}