import type { RootState } from '@/store/store';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestResetApi } from '../api/requestResetApi';
import type { AuthError, RequestResetCredentials } from '../types';

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
      if (error instanceof Error && error.name === 'AbortError') {
        return rejectWithValue({ 
          message: 'Request aborted', 
          code: 'ABORTED' 
        });
      }
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Password reset request failed',
        code: 'REQUEST_RESET_FAILED',
      });
    }
  },
  {
    condition: (_credentials, { getState }) => {
      const { auth } = getState();
      return !auth.passwordReset.isRequestingReset;
    },
  },
);

export default requestResetThunk;