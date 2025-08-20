import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginStart, loginSuccess, loginFailure } from './slice';
import { loginApi } from './authApi';
import type { LoginCredentials } from './types';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { dispatch }) => {
    try {
      dispatch(loginStart());
      const { user } = await loginApi(credentials);
      dispatch(loginSuccess(user));
      return user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch(loginFailure(errorMessage));
      throw error;
    }
  }
);

export default loginThunk;