'use client';

import { setExpiresAt } from '@/features/auth/authSlice';
import { fetchMe } from '@/features/auth/authThunks';
import { PersistGate } from 'redux-persist/integration/react';

import { useEffect } from 'react';
import { Provider } from 'react-redux';

import { persistor, store } from './store';

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

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
              fontSize: '18px',
              color: '#666',
            }}
          >
            Loading application...
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
