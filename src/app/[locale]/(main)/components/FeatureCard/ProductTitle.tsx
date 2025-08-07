'use client';

import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTitle = styled(Typography)(({ theme }) => ({
  width: theme.spacing(35), //277px
  height: theme.spacing(5.25), //42px
  margin: `${theme.spacing(20)} auto ${theme.spacing(10)}`,
  fontFamily: 'var(--font-roboto)',
  fontSize: theme.typography.h4.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

export default function ProductTitle() {
  return <StyledTitle>Product Features</StyledTitle>;
}
