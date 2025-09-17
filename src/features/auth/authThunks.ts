import { createAsyncThunk } from '@reduxjs/toolkit';

import { getMe, loginApi, logoutApi } from './authApi';
import type { LoginCredentials, TokenMeta, User } from './authTypes';

export const fetchMe = createAsyncThunk<User, void, { rejectValue: 'UNAUTHENTICATED' | string }>(
  'auth/fetchMe',
  async (_arg, thunkAPI) => {
    try {
      return await getMe(thunkAPI.signal);
    } catch (err: unknown) {
      const error = err as Error & { status?: number };
      if (error?.status === 401) return thunkAPI.rejectWithValue('UNAUTHENTICATED');
      return thunkAPI.rejectWithValue(error?.message ?? 'Failed to fetch current user');
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
    const error = err as Error & { message?: string };
    return thunkAPI.rejectWithValue(error?.message ?? 'Login failed');
  }
});

export const logoutThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_void, thunkAPI) => {
    try {
      await logoutApi();
      return;
    } catch (err: unknown) {
      const error = err as Error & { message?: string };
      return thunkAPI.rejectWithValue(error?.message ?? 'Logout failed');
    }
  },
);
