'use client';

import React from 'react';

import { styled } from '@mui/material/styles';

type SmileyCardProps = {
  imgSrc: string;
  imgAlt: string;
};

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: theme.spacing(4),
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
}));

export function SmileyCard({ imgSrc, imgAlt }: SmileyCardProps) {
  return (
    <Root>
      <Card src={imgSrc} alt={imgAlt} />
    </Root>
  );
}
