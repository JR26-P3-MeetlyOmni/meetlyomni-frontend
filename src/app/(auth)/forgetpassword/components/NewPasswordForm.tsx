'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Box, Alert, IconButton, InputAdornment, LinearProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { FormContainer, FormTitle, StyledTextField, StyledSectionLabel, StyledSubmitButton } from '@/components/Auth/AuthFormComponents';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetPasswordThunk } from '@/features/auth/thunks/resetPasswordThunk';
import { clearPasswordResetErrors } from '@/features/auth/slice';
import { selectIsResettingPassword, selectPasswordResetError } from '@/features/auth/selectors';
import { validatePasswordStrength, isPasswordValid, getPasswordStrengthScore, getPasswordStrengthMeta } from '@/features/auth/utils/validation';

const PasswordStrengthContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StrengthHeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
}));

const StrengthLabel = styled(Typography)<{ strengthColor: 'error' | 'warning' | 'success' }>(({ theme, strengthColor }) => ({
  color: theme.palette[strengthColor].main,
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.action.hover,
}));

const ValidationContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
}));

const ValidationText = styled(Typography)<{ isValid: boolean }>(({ theme, isValid }) => ({
  fontSize: '14px',
  color: isValid ? theme.palette.success.main : theme.palette.text.secondary,
  lineHeight: 1.4,
}));

import type { NewPasswordFormProps } from '../types';

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({ token }) => {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  // Redux state
  const isSubmitting = useAppSelector(selectIsResettingPassword);
  const resetError = useAppSelector(selectPasswordResetError);

  // Password validation using utility functions
  const validation = validatePasswordStrength(password, confirmPassword);
  const isValidPassword = isPasswordValid(validation);
  const isLengthOk = validation.minLength;
  const isCaseOk = validation.hasUpper && validation.hasLower;
  const isNumSpecialOk = validation.hasNumber && validation.hasSpecial;
  const isStrong = isLengthOk && isCaseOk && isNumSpecialOk;
  const hasInput = password.length > 0;

  // Strength meter
  const strengthScore = getPasswordStrengthScore(validation);
  const strengthPercent = (strengthScore / 5) * 100;
  const strengthMeta = getPasswordStrengthMeta(strengthScore);

  // Clear errors when password changes
  useEffect(() => {
    if (resetError) {
      dispatch(clearPasswordResetErrors());
    }
  }, [password, confirmPassword, dispatch, resetError]);

  // Handle successful password reset
  const handleResetSuccess = useCallback(() => {
    setSuccess(true);
    // Redirect to login page after successful reset
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidPassword) {
      return;
    }

    const result = await dispatch(resetPasswordThunk({ 
      token, 
      newPassword: password 
    }));
    
    // Handle success
    if (resetPasswordThunk.fulfilled.match(result)) {
      handleResetSuccess();
    }
  };

  if (success) {
    return (
      <FormContainer>
        <Alert severity="success">
          Password has been reset successfully! Redirecting to login...
        </Alert>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <FormTitle>Reset your password</FormTitle>
      
      <Box component="form" onSubmit={handleSubmit}>
        <StyledSectionLabel>Enter new password</StyledSectionLabel>
        <StyledTextField
          fullWidth
          size="small"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
          placeholder="Enter new password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <PasswordStrengthContainer>
          <StrengthHeaderBox>
            <Typography variant="caption" color="text.secondary">Password strength</Typography>
            <StrengthLabel variant="caption" strengthColor={strengthMeta.color}>{strengthMeta.label}</StrengthLabel>
          </StrengthHeaderBox>
          <StyledLinearProgress
            variant="determinate"
            value={strengthPercent}
            color={strengthMeta.color}
          />
          {hasInput && !isStrong ? (
            <ValidationContainer>
              <ValidationText isValid={isLengthOk}>
                ✓ At least 12 characters
              </ValidationText>
              <ValidationText isValid={isCaseOk}>
                ✓ At least 1 uppercase letter & 1 lowercase letter
              </ValidationText>
              <ValidationText isValid={isNumSpecialOk}>
                ✓ At least 1 number & 1 special character
              </ValidationText>
            </ValidationContainer>
          ) : null}
        </PasswordStrengthContainer>

        <StyledSectionLabel>Repeat new password to confirm</StyledSectionLabel>
        <StyledTextField
          fullWidth
          size="small"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isSubmitting}
          placeholder="Confirm password"
          error={confirmPassword.length > 0 && !validation.match}
          helperText={confirmPassword.length > 0 && !validation.match ? 'Passwords do not match' : ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                  aria-label="toggle confirm password visibility"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {resetError ? <Alert severity="error">
            {resetError}
          </Alert> : null}
        
        <StyledSubmitButton
          type="submit"
          fullWidth
          disabled={isSubmitting || !isValidPassword}
        >
          {isSubmitting ? 'Resetting...' : 'Reset password'}
        </StyledSubmitButton>
      </Box>
    </FormContainer>
  );
};

export default NewPasswordForm;