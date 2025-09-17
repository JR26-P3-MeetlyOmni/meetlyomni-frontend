'use client';

import { setExpiresAt } from '@/features/auth/authSlice';
import { fetchMe } from '@/features/auth/authThunks';

import { useEffect } from 'react';
import { Provider } from 'react-redux';

import { store } from './store';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      const exp = sessionStorage.getItem('expiresAt');
      if (exp) store.dispatch(setExpiresAt(exp));
    } catch {}

    const p = store.dispatch(fetchMe());
    return () => {
      (p as { abort?: () => void })?.abort?.();
    };
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
