'use client';

import React from 'react';

import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: theme.spacing(12),
}));

const Card = styled('img')(({ theme }) => ({
  width: 200,
  height: 'auto',
  objectFit: 'contain',
  [theme.breakpoints.up('sm')]: {
    width: 350,
    height: 'auto',
  },
  [theme.breakpoints.up('lg')]: {
    width: 400,
    height: 'auto',
  },
}));

export function SmileyCard() {
  return (
    <Root>
      <Card src="/assets/images/Signup/smiley-face.png" alt="Smiley" />
    </Root>
  );
}
