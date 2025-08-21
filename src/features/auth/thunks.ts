import { createAsyncThunk } from '@reduxjs/toolkit';

import { loginApi } from './authApi';
import type { LoginCredentials } from './types';

export const loginThunk = createAsyncThunk('auth/login', async (credentials: LoginCredentials) => {
  const { user } = await loginApi(credentials);
  return user;
});

export default loginThunk;
