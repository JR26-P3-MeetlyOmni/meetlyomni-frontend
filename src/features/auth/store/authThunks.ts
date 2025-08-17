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
    
    tokenStorage.save();

    return {
      user: response.user,
      token: 'authenticated', 
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

export const getCurrentUserAsync = createAsyncThunk<User, void, { rejectValue: AuthError }>(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      return await authApi.getCurrentUser();
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

    if (state.auth.user !== null) {
      return state.auth.user;
    }

    const authStatus = tokenStorage.load();
    if (!authStatus) {
      return null;
    }

    try {
      const user = await authApi.getCurrentUser();
      return user;
    } catch {
      await tokenStorage.remove();
      return null;
    }
  },
);

export const logoutAsync = createAsyncThunk<void, void, { rejectValue: AuthError }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      await tokenStorage.remove();
      return; 
    } catch (error) {
      await tokenStorage.remove();
      
      if (error instanceof AuthApiError) {
        return rejectWithValue({
          message: error.message,
          status: error.status,
        });
      }
      return rejectWithValue({ message: AUTH_MESSAGES.LOGOUT_FAILED });
    }
  },
);
