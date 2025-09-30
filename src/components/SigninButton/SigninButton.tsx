'use client';

import NextLink from 'next/link';
import React from 'react';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

type SigninButtonProps = {
  href?: string;
  onClick?: () => void;
  'aria-label'?: string;
};

const Root = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(9),
  right: theme.spacing(20),
}));

const StyledButton = styled(Button)<{ component?: React.ElementType; href?: string }>(
  ({ theme }) => ({
    width: theme.spacing(16),
    height: theme.spacing(6),
    fontSize: theme.typography.body1.fontSize,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    border: `1.5px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(0.5, 2),
    textTransform: 'none',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  }),
);

export function SigninButton({ href = '/signin', onClick, ...rest }: SigninButtonProps) {
  return (
    <Root>
      <StyledButton
        component={NextLink}
        href={href}
        variant="contained"
        startIcon={<ArrowBackIosNewRoundedIcon aria-hidden />}
        onClick={onClick}
        aria-label={rest['aria-label'] ?? 'Sign in'}
      >
        Sign In
      </StyledButton>
    </Root>
  );
}
