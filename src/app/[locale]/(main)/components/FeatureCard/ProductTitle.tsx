'use client';

import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTitle = styled(Typography)(({ theme }) => ({
  width: theme.spacing(35), //277px
  height: theme.spacing(5.25), //42px
  mt: 20,
  mb: 10,
  mx: 'auto',
  fontFamily: 'Roboto',
  fontSize: theme.typography.h4.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

export default function ProductTitle() {
  return (
    <StyledTitle>
      <Typography>Product Features</Typography>
    </StyledTitle>
  );
}
