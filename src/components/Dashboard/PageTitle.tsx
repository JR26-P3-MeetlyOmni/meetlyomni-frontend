'use client';

import React from 'react';

import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(32),
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    fontSize: theme.typography.pxToRem(28),
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.pxToRem(24),
  },
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(16),
  fontWeight: theme.typography.fontWeightRegular,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    fontSize: theme.typography.pxToRem(14),
  },
}));

const PageTitle = React.memo(({ title, subtitle }: PageTitleProps) => (
  <>
    <StyledTitle variant="h4">{title}</StyledTitle>
    {subtitle ? <StyledSubtitle variant="body1">{subtitle}</StyledSubtitle> : null}
  </>
));

PageTitle.displayName = 'PageTitle';

export default PageTitle;
