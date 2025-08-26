import type { RootState } from '@/store/store';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { loginApi } from '../api/loginApi';
import type { AuthError, LoginCredentials, User } from '../types';

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

export default loginThunk;
