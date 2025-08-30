import { SigninButton } from './components/SignupComponents/SigninButton';
import { TopLeftLogo } from './components/SignupComponents/TopLeftLogo';

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TopLeftLogo />
      <SigninButton />
      {children}
    </div>
  );
}
