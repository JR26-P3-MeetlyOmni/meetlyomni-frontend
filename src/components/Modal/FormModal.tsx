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

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 16px;
    padding: 8px;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px;
`;

const CloseButton = styled(IconButton)`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 4px;
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

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
          <CloseButton aria-label="close" onClick={onClose} size="small">
            <CloseIcon fontSize="small" />
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
