import { createSlice } from '@reduxjs/toolkit';

import { removeAuthToken } from './authApi';
import { loginThunk } from './thunks';
import type { AuthState } from './types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      removeAuthToken();
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload?.message ?? action.error.message ?? 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
