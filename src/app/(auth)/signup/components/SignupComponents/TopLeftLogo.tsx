'use client';

import React from 'react';

import { styled } from '@mui/material/styles';

type TopLeftLogoProps = {
  imgSrc: string;
  imgAlt: string;
  onClick?: () => void;
};

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(6),
  paddingLeft: theme.spacing(16),
}));

const Logo = styled('img')(({ theme }) => ({
  width: 32,
  height: 'auto',
  cursor: 'pointer',
  objectFit: 'contain',
  [theme.breakpoints.up('sm')]: {
    width: 80,
    height: 'auto',
  },
}));

export function TopLeftLogo({ imgSrc, imgAlt, onClick }: TopLeftLogoProps) {
  const handleClick = React.useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <Root>
      <Logo src={imgSrc} alt={imgAlt} onClick={handleClick} />
    </Root>
  );
}
