'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import type { AuthResultPageProps } from './types';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 'clamp(320px, 45vw, 520px)',
  padding: 'clamp(16px, 3vw, 24px)',
  backgroundColor: theme.palette.background.paper,
  borderRadius: Number(theme.shape.borderRadius) * 2.5,
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(16px, 2.5vw, 28px)',
  position: 'relative',
  zIndex: 15,
  margin: '0 auto',
  transform: 'translateY(15vh)',
}));

export const FormTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(22px, 34px, 45px)',
  fontWeight: 700,
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.primary,
  textAlign: 'center',
  marginBottom: 'clamp(12px, 2.5vw, 24px)',
  lineHeight: 1.2,
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    fontSize: 'clamp(14px, 1.8vw, 18px)',
    minHeight: 'clamp(12px, 2vw, 28px)',
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.divider,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.divider,
    },
  },
  '& .MuiInputBase-input': {
    fontSize: 'clamp(14px, 1.8vw, 18px)',
    padding: 'clamp(8px, 2vw, 12px) clamp(10px, 2.4vw, 16px)',
  },
  '& input::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 1,
    fontSize: 'clamp(13px, 1.7vw, 16px)',
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgb(20,24,59)',
  color: '#FFFFFF',
  minHeight: 'clamp(40px, 6vw, 56px)',
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontSize: 'clamp(14px, 1.8vw, 18px)',
  fontWeight: theme.typography.button.fontWeight,
  padding: 'clamp(8px, 2vw, 12px) clamp(16px, 4vw, 28px)',
  '&:hover': {
    backgroundColor: 'rgb(16,20,47)',
  },
  '&:disabled': {
    backgroundColor: theme.palette.grey[300],
  },
}));

export const SectionLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.primary,
  fontSize: 'clamp(13px, 2.2vw, 15px)',
  [theme.breakpoints.up('sm')]: {
    fontSize: '14px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '15px',
  },
}));

export const StyledSectionLabel = styled(SectionLabel)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const StyledSubmitButton = styled(SubmitButton)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

// Shared result page components
export const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: theme.breakpoints.values.sm,
  textAlign: 'center',
  gap: theme.spacing(2.5),
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  zIndex: theme.zIndex.appBar,
}));

export const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(1),
}));

export const TitleText = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.h5.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  lineHeight: theme.typography.h4.lineHeight,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

export const DescriptionText = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: theme.typography.body2.lineHeight,
  color: theme.palette.text.secondary,
  textAlign: 'center',
  maxWidth: theme.breakpoints.values.sm,
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const BackButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: `${theme.spacing(1.5)} ${theme.spacing(2.5)}`,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: theme.typography.body2.lineHeight,
  fontFamily: theme.typography.fontFamily,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    border: `1px solid ${theme.palette.divider}`,
  },
}));

// Auth result page configurations
export const AUTH_RESULTS = {
  PASSWORD_RESET_SENT: {
    iconSrc: '/assets/images/WelcomeToSignin/pwreset-icon.png',
    iconAlt: 'Success Checkmark',
    title: 'Password reset link has been sent',
    description: 'An email with password reset link has been sent to your email address. If you do not see it in the inbox, check your spam folder',
  },
  INVALID_RESET_LINK: {
    iconSrc: '/assets/images/WelcomeToSignin/invalid_icon.png',
    iconAlt: 'Invalid Checkmark',
    title: 'Invalid reset link',
    description: 'This password reset link is invalid or has expired. Please back to Login page and request a new password reset.',
  },
  RESET_PASSWORD_SUCCESS: {
    iconSrc: '/assets/images/WelcomeToSignin/pwreset-icon.png',
    iconAlt: 'Success Checkmark',
    title: 'Password Reset Succeeded',
    description: 'Your password has been reset. You’ll be redirected to log in shortly…',
  },
} as const;

// AuthResultPage component
export const AuthResultPage: React.FC<AuthResultPageProps> = ({
  iconSrc,
  iconAlt,
  title,
  description,
  buttonText = 'Back to Login',
  buttonHref = '/login',
}) => {
  return (
    <ContentContainer>
      <IconContainer>
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={44}
          height={44}
        />
      </IconContainer>

      <TitleText>{title}</TitleText>

      <DescriptionText>{description}</DescriptionText>

      <ButtonContainer>
        <Link href={buttonHref} passHref>
          <BackButton>{buttonText}</BackButton>
        </Link>
      </ButtonContainer>
    </ContentContainer>
  );
};

// ============================================================================
// TODO: Move to AuthResultStyles.tsx - Result page styled components
// ============================================================================

export const AuthResultContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: theme.breakpoints.values.sm,
  textAlign: 'center',
  gap: theme.spacing(2.5),
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  zIndex: theme.zIndex.appBar,
}));

export const AuthResultIconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(1),
}));

export const AuthResultTitleText = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.h5.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  lineHeight: theme.typography.h4.lineHeight,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

export const AuthResultDescriptionText = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: theme.typography.body2.lineHeight,
  color: theme.palette.text.secondary,
  textAlign: 'center',
  maxWidth: theme.breakpoints.values.sm,
}));

export const AuthResultButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const AuthResultBackButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: `${theme.spacing(1.5)} ${theme.spacing(2.5)}`,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: theme.typography.body2.lineHeight,
  fontFamily: theme.typography.fontFamily,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    border: `1px solid ${theme.palette.divider}`,
  },
}));

// ============================================================================
// TODO: Move to AuthResultPage.tsx - Result page component and configurations
// ============================================================================

export const AUTH_RESULT_CONFIGS = {
  PASSWORD_RESET_SENT: {
    iconSrc: '/assets/images/WelcomeToSignin/pwreset-icon.png',
    iconAlt: 'Success Checkmark',
    title: 'Password reset link has been sent',
    description: 'An email with password reset link has been sent to your email address. If you do not see it in the inbox, check your spam folder',
  },
  INVALID_RESET_LINK: {
    iconSrc: '/assets/images/WelcomeToSignin/invalid_icon.png',
    iconAlt: 'Invalid Checkmark',
    title: 'Invalid reset link',
    description: 'This password reset link is invalid or has expired. Please back to Login page and request a new password reset.',
  },
  RESET_PASSWORD_SUCCESS: {
    iconSrc: '/assets/images/WelcomeToSignin/pwreset-icon.png',
    iconAlt: 'Success Checkmark',
    title: 'Password Reset Succeeded',
    description: 'Your password has been reset. You will be redirected to log in shortly...',
  },
} as const;

export const AuthResultPageComponent: React.FC<AuthResultPageProps> = ({
  iconSrc,
  iconAlt,
  title,
  description,
  buttonText = 'Back to Login',
  buttonHref = '/login',
}) => {
  return (
    <AuthResultContentContainer>
      <AuthResultIconContainer>
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={44}
          height={44}
        />
      </AuthResultIconContainer>

      <AuthResultTitleText>{title}</AuthResultTitleText>

      <AuthResultDescriptionText>{description}</AuthResultDescriptionText>

      <AuthResultButtonContainer>
        <Link href={buttonHref} passHref>
          <AuthResultBackButton>{buttonText}</AuthResultBackButton>
        </Link>
      </AuthResultButtonContainer>
    </AuthResultContentContainer>
  );
};
