import { SignupForm } from './components/SignupForm';
import EmailStep from './pages/EmailStep';

export default function SignupPage() {
  return (
    <div>
      <EmailStep />
      <SignupForm />
    </div>
  );
}
