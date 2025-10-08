'use client';

import { resetPasswordThunk } from '@/features/auth/authThunks';
import type { AppDispatch } from '@/store/store';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { Button, TextField } from '@mui/material';

import { Actions, Title, Wrapper } from './ResetPasswordForm.style';

type Props = { token: string; email: string };

function validatePassword(pw: string) {
  return pw.length >= 8;
}

export default function ResetPasswordForm({ token, email }: Props) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [pw, setPw] = React.useState('');
  const [cpw, setCpw] = React.useState('');
  const [pwErr, setPwErr] = React.useState<string | null>(null);
  const [cpwErr, setCpwErr] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isPasswordValid = validatePassword(pw);
    const isConfirmMatch = pw === cpw;

    setPwErr(isPasswordValid ? null : 'Password must be at least 8 characters.');
    setCpwErr(isConfirmMatch ? null : 'Passwords do not match.');

    if (!isPasswordValid || !isConfirmMatch) return;

    setSubmitting(true);
    setError(null);

    try {
      await dispatch(
        resetPasswordThunk({
          email,
          token,
          newPassword: pw,
          confirmPassword: cpw,
        }),
      ).unwrap();
      router.push('/reset-password/success');
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to reset password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <Wrapper>
        <Title>Set new password</Title>
        {error ? (
          <div style={{ color: 'red', marginBottom: '16px', textAlign: 'center' }}>{error}</div>
        ) : null}
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
