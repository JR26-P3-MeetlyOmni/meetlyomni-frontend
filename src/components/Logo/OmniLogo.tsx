'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { styled } from '@mui/material/styles';

import type { TopLeftLogoProps } from './types';

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(10),
  paddingLeft: theme.spacing(20),
}));

const Logo = styled('img')(({ theme }) => ({
  width: 32,
  cursor: 'pointer',
  objectFit: 'contain',
  [theme.breakpoints.up('sm')]: {
    width: 100,
  },
}));

export function TopLeftLogo({ onClick }: TopLeftLogoProps) {
  const router = useRouter();

  const handleClick = React.useCallback(() => {
    if (onClick) {
      onClick();
    } else {
      router.push('/');
    }
  }, [onClick, router]);

  return (
    <Root>
      <Logo
        src="/assets/images/navbar/nav_bar_logo.png"
        alt="MeetlyOmni Logo"
        onClick={handleClick}
      />
    </Root>
  );
}
