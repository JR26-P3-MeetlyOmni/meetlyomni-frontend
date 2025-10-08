'use client';

import { clearError, clearSuccess, sendInvitation } from '@/features/invitation';
import type { AppDispatch, RootState } from '@/store/store';

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Alert, Box, Button, TextField, Typography } from '@mui/material';

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function InvitationForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, success } = useSelector((state: RootState) => state.invitation);

  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [emailError, setEmailError] = React.useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous states
    dispatch(clearError());
    dispatch(clearSuccess());

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError(null);

    try {
      await dispatch(
        sendInvitation({
          email: email.trim(),
          message: message.trim() || undefined,
        }),
      ).unwrap();

      // Clear form on success
      setEmail('');
      setMessage('');
    } catch {
      // Error is handled by Redux state
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError(null);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Send Invitation
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Invite someone to join your organization by sending them an invitation email.
      </Typography>

      {!!error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
          {error}
        </Alert>
      )}

      {!!success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => dispatch(clearSuccess())}>
          Invitation sent successfully!
        </Alert>
      )}

      <form onSubmit={onSubmit} noValidate>
        <TextField
          type="email"
          label="Email Address"
          value={email}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError ?? 'Enter the email address of the person you want to invite'}
          fullWidth
          autoComplete="email"
          inputProps={{ 'aria-label': 'email' }}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Message (Optional)"
          value={message}
          onChange={e => setMessage(e.target.value)}
          fullWidth
          multiline
          rows={3}
          placeholder="Add a personal message to your invitation..."
          inputProps={{ 'aria-label': 'message' }}
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isLoading}
          fullWidth
          aria-label="Send invitation"
        >
          {isLoading ? 'Sending Invitation...' : 'Send Invitation'}
        </Button>
      </form>
    </Box>
  );
}
