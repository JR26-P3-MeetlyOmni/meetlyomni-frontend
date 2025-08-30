'use client';

import * as React from 'react';

import { styled } from '@mui/material/styles';
import type { TypographyProps } from '@mui/material/Typography';

type PageTitleProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: TypographyProps['align'];
  mb?: number;
  variant?: 'default' | 'blue-banner' | 'partial-blue';
  blueText?: string; // 要显示为蓝色的文本部分
};

const Root = styled('div', {
  shouldForwardProp: prop => prop !== 'mb' && prop !== 'align' && prop !== 'variant',
})<{
  mb?: number;
  align?: TypographyProps['align'];
  variant?: 'default' | 'blue-banner' | 'partial-blue';
}>(({ theme, mb = 3, align = 'left', variant = 'default' }) => ({
  marginBottom: theme.spacing(mb),
  textAlign: align,
  ...(variant === 'blue-banner' && {
    backgroundColor: '#1976d2', // MUI 默认蓝色
    color: 'white',
    padding: theme.spacing(2, 3),
    borderRadius: theme.spacing(1),
    display: 'inline-block',
    fontWeight: 'bold',
    fontSize: '1.25rem',
    textAlign: 'center',
    minWidth: 'fit-content',
  }),
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

const BlueText = styled('span')(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: 'white',
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(0.5),
  fontWeight: 'bold',
  display: 'inline-block',
  marginRight: theme.spacing(0.5),
}));

export function PageTitle({
  title,
  subtitle,
  align = 'left',
  mb = 3,
  variant = 'default',
  blueText,
}: PageTitleProps) {
  const renderTitle = () => {
    if (variant === 'blue-banner') {
      return <div style={{ color: 'white', fontWeight: 'bold' }}>{title}</div>;
    }

    if (variant === 'partial-blue' && blueText && typeof title === 'string') {
      const titleStr = title as string;
      const blueIndex = titleStr.indexOf(blueText);

      if (blueIndex !== -1) {
        const beforeBlue = titleStr.substring(0, blueIndex);
        const afterBlue = titleStr.substring(blueIndex + blueText.length);

        return (
          <TitleText>
            {beforeBlue}
            <BlueText>{blueText}</BlueText>
            {afterBlue}
          </TitleText>
        );
      }
    }

    return <TitleText>{title}</TitleText>;
  };

  return (
    <Root align={align} mb={mb} variant={variant}>
      {renderTitle()}
      {subtitle ? <SubtitleText>{subtitle}</SubtitleText> : null}
    </Root>
  );
}
