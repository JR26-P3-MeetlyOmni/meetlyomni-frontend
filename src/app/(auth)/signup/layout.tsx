import { TopLeftLogo } from './components/TopLeftLogo';

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TopLeftLogo imgSrc="/assets/images/Signup/top-left-logo.png" imgAlt="logo" />
      {children}
    </div>
  );
}
