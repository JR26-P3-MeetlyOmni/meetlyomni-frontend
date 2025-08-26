import type { RootState } from '@/store/store';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { resetPasswordApi } from '../api/resetPasswordApi';
import type { AuthError, ResetPasswordCredentials } from '../types';

export const resetPasswordThunk = createAsyncThunk<
  boolean,
  ResetPasswordCredentials,
  { rejectValue: AuthError; state: RootState }
>(
  'auth/resetPassword',
  async (credentials: ResetPasswordCredentials, { rejectWithValue, signal }) => {
    try {
      const result = await resetPasswordApi(credentials, signal);
      return result.ok;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return rejectWithValue({ 
          message: 'Request aborted', 
          code: 'ABORTED' 
        });
      }
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Password reset failed',
        code: 'RESET_PASSWORD_FAILED',
      });
    }
  },
  {
    condition: (_credentials, { getState }) => {
      const { auth } = getState();
      return !auth.passwordReset.isResettingPassword;
    },
  },
);

export default resetPasswordThunk;