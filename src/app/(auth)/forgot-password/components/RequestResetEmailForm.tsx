// src/app/(auth)/forgot-password/components/RequestResetEmailForm.tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField } from '@mui/material';

import { Actions, Title, Wrapper } from './RequestResetEmailForm.style';

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function RequestResetEmailForm() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

   
    router.push('/forgot-password/sent');
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <Wrapper>
        <Title>Password reset</Title>

        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
          helperText={error ?? ' '}
          fullWidth
          autoComplete="email"
          inputProps={{ 'aria-label': 'email' }}
        />

        <Actions>
          <Button type="submit" variant="contained" aria-label="Send reset email">
            Send Email
          </Button>
        </Actions>
      </Wrapper>
    </form>
  );
}
