'use client';

import React, { useCallback } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { DialogActions, DialogContent } from '@mui/material';

import { CTAButton } from '../Button/CTAButton';
import { CloseButton, StyledDialog, StyledDialogTitle } from './FormModal.styles';
import { ButtonGroupWrapper } from './FormModal.styles';
import { FormModalProps } from './FormModal.type';

export const FormModal: React.FC<FormModalProps> = ({
  open,
  title,
  onClose,
  onSubmit,
  children,
  isLoading = false,
  disabledSubmit = false,
}) => {
  const handleDialogClose = useCallback(
    (_event: object, reason?: 'backdropClick' | 'escapeKeyDown') => {
      if (isLoading && (reason === 'backdropClick' || reason === 'escapeKeyDown')) return;
      onClose();
    },
    [onClose, isLoading],
  );

  return (
    <StyledDialog open={open} onClose={handleDialogClose} fullWidth maxWidth="sm">
      <StyledDialogTitle>
        {title}
        <CloseButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </StyledDialogTitle>
      <DialogContent aria-busy={isLoading}>{children}</DialogContent>
      <DialogActions>
        <ButtonGroupWrapper>
          <CTAButton onClick={onClose} variant="outlined" disabled={isLoading}>
            Cancel
          </CTAButton>
          <CTAButton onClick={onSubmit} variant="contained" disabled={disabledSubmit || isLoading}>
            Save
          </CTAButton>
        </ButtonGroupWrapper>
      </DialogActions>
    </StyledDialog>
  );
};

export default FormModal;
