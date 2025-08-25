'use client';

import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
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

import type { EmailRequestFormProps } from '../types';

const EmailRequestForm: React.FC<EmailRequestFormProps> = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous states
    setError('');
    setSuccess(false);

    // Validate email
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/request-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred');
      }

      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Reset your password</FormTitle>
      
      {success ? (
        <Alert severity="success">
          Password reset link has been sent to your email. Please check your inbox.
        </Alert>
      ) : (
        <Box component="form" onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
            disabled={isSubmitting}
            placeholder="Email Address"
          />
          
          <SubmitButton
            type="submit"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Reset password'}
          </SubmitButton>
        </Box>
      )}
    </FormContainer>
  );
};

export default EmailRequestForm;