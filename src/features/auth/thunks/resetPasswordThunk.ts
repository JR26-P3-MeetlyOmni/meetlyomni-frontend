import type { RootState } from '@/store/store';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { resetPasswordApi } from '../api/resetPasswordApi';
import type { AuthError, ResetPasswordCredentials } from '../types';
import { canResetPassword, toAuthError } from '../utils/authThunkUtils';

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
      return rejectWithValue(toAuthError(error, 'Password reset failed', 'RESET_PASSWORD_FAILED'));
    }
  },
  {
    condition: (_credentials, { getState }) => canResetPassword(getState()),
  },
);

export default resetPasswordThunk;
