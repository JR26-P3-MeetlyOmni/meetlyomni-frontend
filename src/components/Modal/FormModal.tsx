'use client';

import styled, { DefaultTheme, ThemeProvider } from 'styled-components';

import React, { useCallback } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import { CTAButton } from '../../components/Button/ActionButtons';

type FormModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  theme: DefaultTheme;
  children?: React.ReactNode;
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1),
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingRight: theme.spacing(1),
  fontSize: theme.typography.h6.fontSize,
  fontFamily: 'var(--font-roboto)',
  fontWeight: theme.typography.fontWeightBold,
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  borderRadius: '50%',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
}));

export const FormModal: React.FC<FormModalProps> = ({
  open,
  title,
  onClose,
  onSubmit,

  children,
}) => {
  const theme = createTheme();
  const handleDialogClose = useCallback(
    (event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
      if (reason === 'escapeKeyDown' || reason === 'backdropClick') {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <ThemeProvider theme={theme}>
      <StyledDialog open={open} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <StyledDialogTitle>
          {title}
          <CloseButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </StyledDialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <CTAButton onClick={onClose} variant="outlined">
            Cancel
          </CTAButton>
          <CTAButton onClick={onSubmit} variant="contained">
            Save
          </CTAButton>
        </DialogActions>
      </StyledDialog>
    </ThemeProvider>
  );
};

export default FormModal;
