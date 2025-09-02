'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { AuthResultPageProps } from '@/components/Auth/types';
import { PageBackground } from '@/components/Auth/PageBackground';  



export const AuthResultIconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(10),
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
  marginTop: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    border: `1px solid ${theme.palette.divider}`,
  },
}));

export const AuthResultPageComponent: React.FC<AuthResultPageProps> = ({
  iconSrc,
  iconAlt,
  title,
  description,
  buttonText = 'Back to Login',
  buttonHref = '/login',
}) => {
  return (
    <PageBackground>
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

      <Link href={buttonHref} passHref>
        <AuthResultBackButton>{buttonText}</AuthResultBackButton>
      </Link>
    </PageBackground>
  );

};
