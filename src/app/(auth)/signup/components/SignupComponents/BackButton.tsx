'use client';

import React from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

interface BackButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const BackButtonContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 0,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary,
  backgroundColor: 'transparent',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(4),
  transition: 'all 0.2s ease-in-out',
  width: 44,
  height: 44,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.secondary,
  },

  '&:disabled': {
    color: theme.palette.action.disabled,
    borderColor: theme.palette.action.disabled,
    backgroundColor: 'transparent',
    cursor: 'not-allowed',
  },

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.75),
    marginRight: theme.spacing(0.75),
    width: 40,
    height: 40,
  },
}));

export function BackButton({ onClick, disabled = false, className }: BackButtonProps) {
  const handleClick = React.useCallback(() => {
    if (!disabled && onClick) {
      onClick();
    }
  }, [onClick, disabled]);

  return (
    <BackButtonContainer className={className}>
      <StyledIconButton onClick={handleClick} disabled={disabled} aria-label="go back" size="small">
        <ArrowBackIcon fontSize="small" />
      </StyledIconButton>
    </BackButtonContainer>
  );
}

export default BackButton;
