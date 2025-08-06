'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { DecorativeElements } from './components/DecorativeElements';
import { LoginForm } from './components/LoginForm';
import { useLoginForm } from './hooks/useLoginForm';

// Main container
const LoginContainer = styled(Box)(() => ({
  minHeight: '100vh',
  backgroundColor: '#ffffff',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

// Background decorative patterns
const BackgroundPattern = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `
    radial-gradient(circle at 20% 80%, rgba(240, 240, 240, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(240, 240, 240, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(240, 240, 240, 0.2) 0%, transparent 50%)
  `,
  pointerEvents: 'none',
}));

// Logo section
const LogoSection = styled(Box)(() => ({
  position: 'absolute',
  top: 40,
  left: 60,
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  zIndex: 10,
}));

// Main content area
const MainContent = styled(Container)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '600px',
  zIndex: 5,
  position: 'relative',
}));

// Title section
const TitleContainer = styled(Box)(() => ({
  textAlign: 'center',
  marginBottom: 48,
}));

const WelcomeTitle = styled(Box)(() => ({
  display: 'inline-block',
  backgroundColor: '#3f7cff',
  color: '#ffffff',
  padding: '4px 12px',
  borderRadius: 2,
  fontSize: 28,
  fontWeight: 700,
  fontFamily: 'Roboto, sans-serif',
  marginRight: 8,
  lineHeight: 1.2,
}));

const SubTitle = styled(Typography)(() => ({
  display: 'inline',
  fontSize: 28,
  fontWeight: 600,
  color: '#1a1a1a',
  fontFamily: 'Roboto, sans-serif',
}));

const LoginPage: FC = () => {
  const _t = useTranslations('login');
  const formHook = useLoginForm();

  return (
    <LoginContainer>
      <BackgroundPattern />

      {/* Logo */}
      <LogoSection>
        <Image src="/assets/images/sign-in/logo.png" alt="Omni Logo" width={96} height={32} />
      </LogoSection>

      {/* Decorative Elements */}
      <DecorativeElements />

      {/* Main Content */}
      <MainContent>
        <TitleContainer>
          <WelcomeTitle>Welcome to Omni !</WelcomeTitle>
          <SubTitle>Let&apos;s Sign in Your Profile</SubTitle>
        </TitleContainer>

        <LoginForm formHook={formHook} />
      </MainContent>
    </LoginContainer>
  );
};

export default LoginPage;
