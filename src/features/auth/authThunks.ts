import { ApiError } from '@/api/api';
import { AppErrorCode, ERROR_CONFIG } from '@/types/errors';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { getMe, loginApi, logoutApi } from './authApi';
import type { LoginCredentials, TokenMeta, User } from './authTypes';

export const fetchMe = createAsyncThunk<User, void, { rejectValue: 'UNAUTHENTICATED' | string }>(
  'auth/fetchMe',
  async (_arg, thunkAPI) => {
    try {
      return await getMe(thunkAPI.signal);
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        if (err.status === 401) return thunkAPI.rejectWithValue('UNAUTHENTICATED');
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue('Failed to fetch current user');
    }
  },
);

export const loginThunk = createAsyncThunk<
  { user: User; expiresAt: string },
  LoginCredentials,
  { rejectValue: string }
>('auth/login', async (credentials, thunkAPI) => {
  try {
    const meta: TokenMeta = await loginApi(credentials, thunkAPI.signal);
    const user = await thunkAPI.dispatch(fetchMe()).unwrap();
    return { user, expiresAt: meta.expiresAt };
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      // Determine whether logout is needed based on error configuration
      const config = ERROR_CONFIG[err.code as AppErrorCode];
      if (config?.shouldLogout) {
        // Can trigger logout logic here
        // thunkAPI.dispatch(logoutLocal());
      }
      return thunkAPI.rejectWithValue(err.message);
    }
    return thunkAPI.rejectWithValue('Login failed');
  }
});

export const logoutThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_void, thunkAPI) => {
    try {
      await logoutApi();
      return;
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue('Logout failed');
    }
  },
);
