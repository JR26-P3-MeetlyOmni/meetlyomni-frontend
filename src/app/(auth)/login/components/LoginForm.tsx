'use client';

import { selectError, selectIsLoading, loginThunk } from '@/features/auth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { useRouter } from 'next/navigation';
import { type ChangeEvent, type FormEvent, useCallback, useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const emailTrim = email.trim();
      const passwordTrim = password.trim();

      try {
        await dispatch(loginThunk({ email: emailTrim, password: passwordTrim })).unwrap();
        router.replace('/dashboard');
      } catch {}
    },
    [dispatch, email, password, router],
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={handleEmailChange} required />
      </div>

      <div style={{ marginTop: 8 }}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>

      {error ? <div style={{ color: 'red', marginTop: 8 }}>{error}</div> : null}

      <button type="submit" disabled={isLoading} style={{ marginTop: 12 }}>
        {isLoading ? 'Loading...' : 'login'}
      </button>

      <div style={{ marginTop: 8, fontSize: 12 }}></div>
    </form>
  );
}
