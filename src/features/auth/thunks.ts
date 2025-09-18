import type { RootState } from '@/store/store';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { loginApi, logoutApi } from './authApi';
import type { AuthError, LoginCredentials, User } from './types';

export const loginThunk = createAsyncThunk<
  User,
  LoginCredentials,
  { rejectValue: AuthError; state: RootState }
>(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue, signal }) => {
    try {
      const { user } = await loginApi(credentials, signal);
      return user;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return rejectWithValue({ message: 'Request aborted', code: 'ABORTED' });
      }
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Login failed',
        code: 'LOGIN_FAILED',
      });
    }
  },
  {
    // prevent concurrent submissions while a login is in-flight
    condition: (_credentials, { getState }) => {
      const { auth } = getState();
      return !auth.isLoading && !auth.isAuthenticated;
    },
  },
);

export const logoutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: AuthError; state: RootState }
>(
  'auth/logout',
  async (_, { signal }) => {
    try {
      await logoutApi(signal);
      // Always resolve successfully, even if server logout fails
      // The local state will be cleared regardless
    } catch (error) {
      // Log the error but don't block the logout flow
      // eslint-disable-next-line no-console
      console.warn('Logout API error:', error);
      // Still resolve successfully to allow local state cleanup
    }
  },
  {
    // Allow logout even if already logged out or loading
    condition: () => true,
  },
);

export default loginThunk;
