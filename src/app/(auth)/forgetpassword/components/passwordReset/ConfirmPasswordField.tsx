import { StyledSectionLabel, StyledTextField } from '@/components/Auth/AuthFormComponents';
import { useCallback } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { ConfirmPasswordFieldProps } from '../../types';

const ConfirmPasswordField: React.FC<ConfirmPasswordFieldProps> = ({
  confirmPassword,
  showConfirmPassword,
  isSubmitting,
  hasError,
  errorMessage,
  onConfirmPasswordChange,
  onToggleVisibility,
}) => {
  const handleConfirmPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onConfirmPasswordChange(e.target.value);
    },
    [onConfirmPasswordChange],
  );
  return (
    <>
      <StyledSectionLabel>Repeat new password to confirm</StyledSectionLabel>
      <StyledTextField
        fullWidth
        size="small"
        type={showConfirmPassword ? 'text' : 'password'}
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        disabled={isSubmitting}
        placeholder="Confirm password"
        error={hasError}
        helperText={hasError ? errorMessage : ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={onToggleVisibility}
                edge="end"
                aria-label="toggle confirm password visibility"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default ConfirmPasswordField;
