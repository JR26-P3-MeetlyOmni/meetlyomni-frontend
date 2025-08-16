import { createAsyncThunk } from '@reduxjs/toolkit';

import { authApi, AuthApiError } from '../api/authApi';
import { AUTH_MESSAGES } from '../constants/messages';
import { tokenStorage } from '../services/tokenStorage';
import { AuthError, LoginCredentials, User } from '../types';

export const loginAsync = createAsyncThunk<
  { user: User; token: string },
  LoginCredentials,
  { rejectValue: AuthError }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await authApi.login(credentials);
    tokenStorage.save(response.accessToken);

    return {
      user: response.user,
      token: response.accessToken,
    };
  } catch (error) {
    if (error instanceof AuthApiError) {
      return rejectWithValue({
        message: error.message,
        status: error.status,
      });
    }
    return rejectWithValue({ message: AUTH_MESSAGES.UNEXPECTED_ERROR });
  }
});

export const getCurrentUserAsync = createAsyncThunk<User, string, { rejectValue: AuthError }>(
  'auth/getCurrentUser',
  async (token, { rejectWithValue }) => {
    try {
      return await authApi.getCurrentUser(token);
    } catch (error) {
      if (error instanceof AuthApiError) {
        return rejectWithValue({
          message: error.message,
          status: error.status,
        });
      }
      return rejectWithValue({ message: AUTH_MESSAGES.GET_USER_FAILED });
    }
  },
);

export const initializeAuthAsync = createAsyncThunk<User | null, void, { rejectValue: AuthError }>(
  'auth/initialize',
  async (_, { getState }) => {
    const state = getState() as { auth: { user: User | null; isLoading: boolean } };

    // Skip if already initialized or currently loading
    if (state.auth.user !== null || state.auth.isLoading) {
      return state.auth.user;
    }

    const token = tokenStorage.load();

    if (!token) {
      return null;
    }

    try {
      return await authApi.getCurrentUser(token);
    } catch {
      tokenStorage.remove();
      return null;
    }
  },
);
