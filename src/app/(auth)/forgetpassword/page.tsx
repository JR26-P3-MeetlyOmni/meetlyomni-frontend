import EmailRequestForm from './components/EmailRequestForm';
import { PageBackground } from '@/components/Auth';

const ResetPasswordPage: React.FC = () => {
  return (
    <PageBackground>
      <EmailRequestForm />
    </PageBackground>
  );
};

export default ResetPasswordPage;
