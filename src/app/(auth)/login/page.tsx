//This LoginForm is used for testing login workflow. should be replace by ticket #36
import { LoginForm } from './components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div>
      <LoginForm />
      <Link href="/forgetpassword">Forget Password</Link>
    </div>
  );
}
