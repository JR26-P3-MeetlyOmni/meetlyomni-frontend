import { createAsyncThunk } from '@reduxjs/toolkit';

import { loginApi } from './authApi';
import type { AuthError, LoginCredentials, User } from './types';

export const loginThunk = createAsyncThunk<User, LoginCredentials, { rejectValue: AuthError }>(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const { user } = await loginApi(credentials);
      return user;
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Login failed',
        code: 'LOGIN_FAILED',
      });
    }
  },
);

export default loginThunk;
