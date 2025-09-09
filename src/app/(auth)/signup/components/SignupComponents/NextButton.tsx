'use client';

import React from 'react';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

interface NextButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
}

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: theme.spacing(22),
  padding: theme.spacing(1.25, 2.5),
  borderRadius: theme.spacing(0.5),
  textTransform: 'none',
  fontSize: theme.typography.h5.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  gap: theme.spacing(1),
  transition: 'all 0.2s ease-in-out',
  height: theme.spacing(8),
  backgroundColor: '#14183b',
  color: theme.palette.common.white,

  '&:hover': {
    transform: 'translateX(2px)',
  },

  '&.Mui-disabled': {
    transform: 'none',
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },

  [theme.breakpoints.down('sm')]: {
    minWidth: 100,
    padding: theme.spacing(1, 2),
    fontSize: '0.875rem',
    height: 40,
  },
}));

export function NextButton({
  onClick,
  disabled = false,
  children = 'Next',
  className,
  loading = false,
}: NextButtonProps) {
  const handleClick = React.useCallback(() => {
    if (!loading) {
      onClick?.();
    }
  }, [onClick, loading]);

  return (
    <StyledButton
      variant="contained"
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      className={className}
      aria-label={typeof children === 'string' ? children : 'Next'}
    >
      {loading ? (
        <>
          <CircularProgress color="inherit" size={18} thickness={5} />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </StyledButton>
  );
}

export default NextButton;
