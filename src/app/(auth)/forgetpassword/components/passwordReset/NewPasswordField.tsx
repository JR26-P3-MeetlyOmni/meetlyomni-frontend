import { StyledSectionLabel, StyledTextField } from '@/components/Auth/AuthFormComponents';

import { useCallback } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { PasswordFieldProps } from '../../types';

const PasswordField: React.FC<PasswordFieldProps> = ({
  password,
  showPassword,
  isSubmitting,
  onPasswordChange,
  onToggleVisibility,
}) => {
  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onPasswordChange(e.target.value);
    },
    [onPasswordChange],
  );
  return (
    <>
      <StyledSectionLabel>Enter new password</StyledSectionLabel>
      <StyledTextField
        fullWidth
        size="small"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handlePasswordChange}
        disabled={isSubmitting}
        placeholder="Enter new password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={onToggleVisibility}
                edge="end"
                aria-label="toggle password visibility"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default PasswordField;
