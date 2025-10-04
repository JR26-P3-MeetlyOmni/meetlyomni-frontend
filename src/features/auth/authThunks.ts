import { ApiError } from '@/api/api';
import type { RootState } from '@/store/store';
import { AppErrorCode, ERROR_CONFIG } from '@/types/errors';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { forgotPasswordApi, getMe, loginApi, logoutApi, resetPasswordApi } from './authApi';
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginCredentials,
  ResetPasswordRequest,
  ResetPasswordResponse,
  TokenMeta,
  User,
} from './authTypes';

// Condition to prevent concurrent login attempts
export const loginCondition = (
  _credentials: LoginCredentials,
  { getState }: { getState: () => RootState },
) => {
  const state = getState();
  // Access isLoading directly to avoid circular dependency
  return !state.auth.isLoading;
};

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
  { rejectValue: string; state: RootState }
>(
  'auth/login',
  async (credentials, thunkAPI) => {
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
  },
  {
    // Prevent concurrent login attempts
    condition: loginCondition,
  },
);

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

export const forgotPasswordThunk = createAsyncThunk<
  ForgotPasswordResponse,
  ForgotPasswordRequest,
  { rejectValue: string }
>('auth/forgotPassword', async (request, thunkAPI) => {
  try {
    return await forgotPasswordApi(request, thunkAPI.signal);
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      return thunkAPI.rejectWithValue(err.message);
    }
    return thunkAPI.rejectWithValue('Failed to send reset email');
  }
});

export const resetPasswordThunk = createAsyncThunk<
  ResetPasswordResponse,
  ResetPasswordRequest,
  { rejectValue: string }
>('auth/resetPassword', async (request, thunkAPI) => {
  try {
    return await resetPasswordApi(request, thunkAPI.signal);
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      return thunkAPI.rejectWithValue(err.message);
    }
    return thunkAPI.rejectWithValue('Failed to reset password');
  }
});
