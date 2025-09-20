import { createSlice } from '@reduxjs/toolkit';

import { loginThunk, logoutThunk } from './thunks';
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
    },
  },
  extraReducers: builder => {
    builder
      // login
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
      })
      .addCase(logoutThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        // Even if logout API fails, we still clear the local state
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload?.message ?? action.error.message ?? 'Logout failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
