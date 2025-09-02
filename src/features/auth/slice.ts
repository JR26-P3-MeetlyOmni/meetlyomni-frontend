import { createSlice } from '@reduxjs/toolkit';

import { loginThunk } from './thunks/loginThunk';
import { requestResetThunk } from './thunks/requestResetThunk';
import { resetPasswordThunk } from './thunks/resetPasswordThunk';
import type { AuthState } from './types';

const initialPasswordResetState = {
  emailSent: false,
  isRequestingReset: false,
  isResettingPassword: false,
  requestError: null,
  resetError: null,
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  passwordReset: initialPasswordResetState,
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
    clearPasswordResetState: (state) => {
      state.passwordReset = initialPasswordResetState;
    },
    clearPasswordResetErrors: (state) => {
      state.passwordReset.requestError = null;
      state.passwordReset.resetError = null;
    },
  },
  extraReducers: builder => {
    builder
      // Login thunk cases
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
      // Request reset thunk cases
      .addCase(requestResetThunk.pending, state => {
        state.passwordReset.isRequestingReset = true;
        state.passwordReset.requestError = null;
        state.passwordReset.emailSent = false;
      })
      .addCase(requestResetThunk.fulfilled, (state) => {
        state.passwordReset.isRequestingReset = false;
        state.passwordReset.emailSent = true;
        state.passwordReset.requestError = null;
      })
      .addCase(requestResetThunk.rejected, (state, action) => {
        state.passwordReset.isRequestingReset = false;
        state.passwordReset.emailSent = false;
        state.passwordReset.requestError = action.payload?.message ?? action.error.message ?? 'Password reset request failed';
      })
      // Reset password thunk cases
      .addCase(resetPasswordThunk.pending, state => {
        state.passwordReset.isResettingPassword = true;
        state.passwordReset.resetError = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.passwordReset.isResettingPassword = false;
        state.passwordReset.resetError = null;
        state.passwordReset = initialPasswordResetState;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.passwordReset.isResettingPassword = false;
        state.passwordReset.resetError = action.payload?.message ?? action.error.message ?? 'Password reset failed';
      });
  },
});

export const { clearPasswordResetState, clearPasswordResetErrors } = authSlice.actions;
export const { logout } = authSlice.actions;
export default authSlice.reducer;
