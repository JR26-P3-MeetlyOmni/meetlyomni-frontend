'use client';

import { forgotPasswordThunk } from '@/features/auth/authThunks';
import type { AppDispatch } from '@/store/store';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { Button, TextField } from '@mui/material';

import { Actions, Title, Wrapper } from './RequestResetEmailForm.style';

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function RequestResetEmailForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await dispatch(forgotPasswordThunk({ email })).unwrap();
      router.push('/forgot-password/sent');
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <Wrapper>
        <Title>Password reset</Title>

        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={!!error}
          helperText={error ?? ' '}
          fullWidth
          autoComplete="email"
          inputProps={{ 'aria-label': 'email' }}
        />

        <Actions>
          <Button
            type="submit"
            variant="contained"
            aria-label="Send reset email"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Email'}
          </Button>
        </Actions>
      </Wrapper>
    </form>
  );
}
