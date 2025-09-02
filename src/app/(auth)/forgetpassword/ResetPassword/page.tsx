import NewPasswordForm from '../components/NewPasswordForm';
import { PageBackground } from '@/components/Auth';
import { AuthResultPageComponent } from '../components/passwordReset/ResultPage';
import { INVALID_RESET_LINK } from '@/constants/AuthResultData';

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    return (
      <PageBackground>
        <AuthResultPageComponent
          iconSrc={INVALID_RESET_LINK.iconSrc}
          iconAlt={INVALID_RESET_LINK.iconAlt}
          title={INVALID_RESET_LINK.title}
          description={INVALID_RESET_LINK.description}
        />
      </PageBackground>
    );
  }

  return (
    <PageBackground>
      <NewPasswordForm token={token} />
    </PageBackground>
  );
}
