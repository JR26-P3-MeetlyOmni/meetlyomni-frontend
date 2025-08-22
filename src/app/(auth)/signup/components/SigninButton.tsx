'use client';

import Link from 'next/link';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  border: `1.5px solid ${theme.palette.grey[300]}`,
  padding: theme.spacing(0.5, 2),
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

export function SigninButton() {
  return (
    <Root>
      <Link href="/signin" passHref>
        <StyledButton variant="contained" startIcon={<ArrowBackIosNewRoundedIcon />}>
          Sign In
        </StyledButton>
      </Link>
    </Root>
  );
}
