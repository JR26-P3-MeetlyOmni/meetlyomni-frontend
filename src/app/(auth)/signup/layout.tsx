import { TopLeftLogo } from '@/components/Logo';
import { SigninButton } from '@/components/SigninButton';

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TopLeftLogo />
      <SigninButton />
      {children}
    </div>
  );
}
