import { SigninButton } from './components/SigninButton';
import { SmileyCard } from './components/SmileyCard';
import { TopLeftLogo } from './components/TopLeftLogo';

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TopLeftLogo imgSrc="/assets/images/Signup/top-left-logo.png" imgAlt="logo" />
      <SmileyCard imgSrc="/assets/images/Signup/smiley-face.png" imgAlt="smiley face card" />
      <SigninButton />
      {children}
    </div>
  );
}
