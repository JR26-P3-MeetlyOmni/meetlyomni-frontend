'use client';

import * as React from 'react';

import { styled } from '@mui/material/styles';
import type { TypographyProps } from '@mui/material/Typography';

type PageTitleProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: TypographyProps['align'];
  mb?: number;
};

const Root = styled('div', {
  shouldForwardProp: prop => prop !== 'mb' && prop !== 'align',
})<{ mb?: number; align?: TypographyProps['align'] }>(({ theme, mb = 3, align = 'left' }) => ({
  marginBottom: theme.spacing(mb),
  textAlign: align,
}));

const TitleText = styled('h1')(({ theme }) => ({
  ...theme.typography.h3,
  fontWeight: theme.typography.h6.fontWeight,
  margin: 0,
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: { ...theme.typography.h5, fontWeight: 700 },
}));

const SubtitleText = styled('p')(({ theme }) => ({
  ...theme.typography.body1,
  marginTop: theme.spacing(0.5),
  color: theme.palette.text.secondary,
}));

export function PageTitle({ title, subtitle, align = 'left', mb = 3 }: PageTitleProps) {
  return (
    <Root align={align} mb={mb}>
      <TitleText>{title}</TitleText>
      {subtitle ? <SubtitleText>{subtitle}</SubtitleText> : null}
    </Root>
  );
}
