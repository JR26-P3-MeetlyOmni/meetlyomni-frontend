import type { RootState } from '@/store/store';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { logoutApi } from './logoutApi';
import type { AuthError } from './types';

export const logoutThunk = createAsyncThunk<
  boolean,
  void,
  { rejectValue: AuthError; state: RootState }
>(
  'auth/logout',
  async (_, { rejectWithValue, signal }) => {
    try {
      await logoutApi(signal);
      return true;
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Logout failed',
        code: 'LOGOUT_FAILED',
      });
    }
  },
  {
    // prevent logout if already not authenticated or in loading state
    condition: (_arg, { getState }) => {
      const { auth } = getState();
      return auth.isAuthenticated && !auth.isLoading;
    },
  },
);

export default logoutThunk;
