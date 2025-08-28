import { StyledSectionLabel, StyledTextField } from '@/components/Auth/AuthFormComponents';

import React, { useCallback } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';

import { PasswordFieldProps } from '../../types';

const PasswordField: React.FC<PasswordFieldProps> = ({
  type,
  value,
  showPassword,
  isSubmitting,
  hasError = false,
  errorMessage = '',
  onChange,
  onToggleVisibility,
}) => {
  const labels = {
    new: 'Enter new password',
    confirm: 'Repeat new password to confirm',
  };

  const placeholders = {
    new: 'Enter new password',
    confirm: 'Confirm password',
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <>
      <StyledSectionLabel>{labels[type]}</StyledSectionLabel>
      <StyledTextField
        fullWidth
        size="small"
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={handleChange}
        disabled={isSubmitting}
        placeholder={placeholders[type]}
        error={hasError}
        helperText={hasError ? errorMessage : ''}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={onToggleVisibility}
                  edge="end"
                  aria-label={`toggle ${type} password visibility`}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </>
  );
};

export default PasswordField;
