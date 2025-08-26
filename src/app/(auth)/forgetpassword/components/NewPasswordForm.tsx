'use client';

import React, { useState } from 'react';
import { Typography, Box, Alert, IconButton, InputAdornment, LinearProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { FormContainer, FormTitle, StyledTextField, StyledSectionLabel, StyledSubmitButton } from '@/components/Auth/AuthFormComponents';

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

import type { NewPasswordFormProps, PasswordValidation } from '../types';

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({ token }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validatePassword = (pwd: string): PasswordValidation => {
    return {
      minLength: pwd.length >= 12,
      hasUpper: /[A-Z]/.test(pwd),
      hasLower: /[a-z]/.test(pwd),
      hasNumber: /\d/.test(pwd),
      hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
      match: pwd === confirmPassword && pwd.length > 0,
    };
  };

  const validation = validatePassword(password);
  const isValidPassword = Object.values(validation).every(v => v === true);
  const isLengthOk = validation.minLength;
  const isCaseOk = validation.hasUpper && validation.hasLower;
  const isNumSpecialOk = validation.hasNumber && validation.hasSpecial;
  const isStrong = isLengthOk && isCaseOk && isNumSpecialOk;
  const hasInput = password.length > 0;

  // Strength meter (shown when rules are hidden)
  const strengthScore = [
    validation.minLength,
    validation.hasUpper,
    validation.hasLower,
    validation.hasNumber,
    validation.hasSpecial,
  ].filter(Boolean).length;

  const strengthPercent = (strengthScore / 5) * 100;
  const getStrengthMeta = (score: number): { label: string; color: 'error' | 'warning' | 'success' } => {
    if (score <= 2) return { label: 'Weak', color: 'error' };
    if (score <= 4) return { label: 'Medium', color: 'warning' };
    return { label: 'Strong', color: 'success' };
  };
  const strengthMeta = getStrengthMeta(strengthScore);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous states
    setError('');
    setSuccess(false);

    if (!isValidPassword) {
      setError('Please ensure all password requirements are met');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred');
      }

      setSuccess(true);
      
      // Redirect to login page after successful reset
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
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

        {error ? <Alert severity="error">
            {error}
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