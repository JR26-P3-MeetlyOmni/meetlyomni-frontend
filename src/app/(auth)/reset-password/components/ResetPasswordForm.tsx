'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { Button, TextField } from '@mui/material';

import { Actions, Title, Wrapper } from './ResetPasswordForm.style';

type Props = { token: string };

function validatePassword(pw: string) {
  return pw.length >= 8;
}

export default function ResetPasswordForm({ token: _token }: Props) {
  const router = useRouter();
  const [pw, setPw] = React.useState('');
  const [cpw, setCpw] = React.useState('');
  const [pwErr, setPwErr] = React.useState<string | null>(null);
  const [cpwErr, setCpwErr] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isPasswordValid = validatePassword(pw);
    const isConfirmMatch = pw === cpw;

    setPwErr(isPasswordValid ? null : 'Password must be at least 8 characters.');
    setCpwErr(isConfirmMatch ? null : 'Passwords do not match.');

    if (!isPasswordValid || !isConfirmMatch) return;

    setSubmitting(true);
    try {
      router.push('/reset-password/success');
    } catch {
      router.push('/reset-password/invalid');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <Wrapper>
        <Title>Set new password</Title>
        <TextField
          type="password"
          label="New Password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          error={!!pwErr}
          helperText={pwErr ?? ' '}
          fullWidth
          autoComplete="new-password"
        />
        <TextField
          type="password"
          label="Confirm Password"
          value={cpw}
          onChange={e => setCpw(e.target.value)}
          error={!!cpwErr}
          helperText={cpwErr ?? ' '}
          fullWidth
          autoComplete="new-password"
        />
        <Actions>
          <Button
            type="submit"
            disabled={submitting}
            variant="contained"
            aria-label="Set new password"
          >
            Set New Password
          </Button>
        </Actions>
      </Wrapper>
    </form>
  );
}
