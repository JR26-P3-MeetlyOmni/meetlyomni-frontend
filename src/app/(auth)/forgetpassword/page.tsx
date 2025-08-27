import EmailRequestForm from './components/EmailRequestForm';
import { PageBackground } from './components/PageBackground';

const ResetPasswordPage: React.FC = () => {
  return (
    <PageBackground>
      <EmailRequestForm />
    </PageBackground>
  );
};

export default ResetPasswordPage;
