import type { RootState } from '@/store/store';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { loginApi } from '../api/loginApi';
import type { AuthError, LoginCredentials, User } from '../types';
import { canLogin, toAuthError } from '../utils/authThunkUtils';

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
      return rejectWithValue(toAuthError(error, 'Login failed', 'LOGIN_FAILED'));
    }
  },
  {
    // prevent concurrent submissions while a login is in-flight
    condition: (_credentials, { getState }) => canLogin(getState()),
  },
);

export default loginThunk;
