'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginThunk } from '@/features/auth/thunks';
import { selectIsLoading, selectError } from '@/features/auth/selectors';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailTrim = email.trim();
    const passwordTrim = password.trim();
    console.log('[login] submit', { email: emailTrim, password: '***' });
    try {
      await dispatch(loginThunk({ email: emailTrim, password: passwordTrim })).unwrap();
      router.replace('/dashboard');
    } catch (err) {
      console.log('[login] failed', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div style={{ marginTop: 8 }}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && (
        <div style={{ color: 'red', marginTop: 8 }}>{error}</div>
      )}

      <button type="submit" disabled={isLoading} style={{ marginTop: 12 }}>
        {isLoading ? 'Loading...' : 'login'}
      </button>

      <div style={{ marginTop: 8, fontSize: 12 }}>
      </div>
    </form>
  );
}