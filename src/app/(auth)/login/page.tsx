'use client';

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
const LoginContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

// Background decorative patterns
const BackgroundPattern = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `
    radial-gradient(circle at 20% 80%, ${theme.palette.action.hover} 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, ${theme.palette.action.hover} 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, ${theme.palette.action.selected} 0%, transparent 50%)
  `,
  pointerEvents: 'none',
}));

// Logo section
const LogoSection = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(5),
  left: theme.spacing(7.5),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
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
const TitleContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
}));

const WelcomeTitle = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(0.5, 1.5),
  borderRadius: theme.shape.borderRadius,
  ...theme.typography.h4,
  fontWeight: theme.typography.fontWeightBold,
  marginRight: theme.spacing(1),
  lineHeight: 1.2,
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  display: 'inline',
  ...theme.typography.h4,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.primary,
}));

const LoginPage: FC = () => {
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
