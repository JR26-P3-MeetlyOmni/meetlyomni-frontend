import type { RootState } from '@/store/store';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestResetApi } from '../api/requestResetApi';
import type { AuthError, RequestResetCredentials } from '../types';
import { canRequestPasswordReset, toAuthError } from '../utils/authThunkUtils';

export const requestResetThunk = createAsyncThunk<
  boolean,
  RequestResetCredentials,
  { rejectValue: AuthError; state: RootState }
>(
  'auth/requestReset',
  async (credentials: RequestResetCredentials, { rejectWithValue, signal }) => {
    try {
      const result = await requestResetApi(credentials, signal);
      return result.ok;
    } catch (error) {
      return rejectWithValue(
        toAuthError(error, 'Password reset request failed', 'REQUEST_RESET_FAILED'),
      );
    }
  },
  {
    condition: (_credentials, { getState }) => canRequestPasswordReset(getState()),
  },
);

export default requestResetThunk;
