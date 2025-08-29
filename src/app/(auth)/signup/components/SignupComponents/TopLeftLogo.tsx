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
