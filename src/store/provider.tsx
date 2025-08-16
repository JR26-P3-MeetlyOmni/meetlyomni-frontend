'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from '../features/auth';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Provider>
  );
}