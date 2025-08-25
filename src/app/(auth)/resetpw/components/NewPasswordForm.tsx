'use client';

import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const FormContainer = styled(Box)(({ theme }) => ({
  maxWidth: 400,
  width: '100%',
  padding: theme.spacing(4),
  backgroundColor: 'white',
  borderRadius: theme.spacing(2),
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  position: 'relative',
  zIndex: 10,
  margin: '0 auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: 460,
    padding: theme.spacing(5),
  },
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 600,
  color: theme.palette.text.primary,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    fontSize: '32px',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.grey[50],
    borderRadius: theme.spacing(1),
    '& fieldset': {
      borderColor: theme.palette.grey[300],
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#2C3E50',
  color: 'white',
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#1A252F',
  },
  '&:disabled': {
    backgroundColor: theme.palette.grey[300],
  },
}));

const ValidationText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.text.secondary,
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

  const getValidationColor = (isValid: boolean) => isValid ? 'success.main' : 'text.secondary';

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
        <StyledTextField
          fullWidth
          label="Enter new password"
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
        
        <Box sx={{ mb: 2 }}>
          <ValidationText sx={{ color: getValidationColor(validation.minLength) }}>
            ✓ At least 12 characters
          </ValidationText>
          <ValidationText sx={{ color: getValidationColor(validation.hasUpper) }}>
            ✓ At least 1 uppercase letter
          </ValidationText>
          <ValidationText sx={{ color: getValidationColor(validation.hasLower) }}>
            ✓ At least 1 lowercase letter
          </ValidationText>
          <ValidationText sx={{ color: getValidationColor(validation.hasNumber) }}>
            ✓ At least 1 number
          </ValidationText>
          <ValidationText sx={{ color: getValidationColor(validation.hasSpecial) }}>
            ✓ At least 1 special character
          </ValidationText>
        </Box>

        <StyledTextField
          fullWidth
          label="Repeat new password to confirm"
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
        
        <SubmitButton
          type="submit"
          fullWidth
          disabled={isSubmitting || !isValidPassword}
        >
          {isSubmitting ? 'Resetting...' : 'Reset password'}
        </SubmitButton>
      </Box>
    </FormContainer>
  );
};

export default NewPasswordForm;