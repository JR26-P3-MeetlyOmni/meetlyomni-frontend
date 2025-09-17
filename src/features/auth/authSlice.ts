import { resetCsrfCache } from '@/api/api';

import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { fetchMe, loginThunk, logoutThunk } from './authThunks';
import type { AuthState } from './authTypes';

const initialState: AuthState = {
  user: null,
  expiresAt: null,
  isLoading: false,
  error: null,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    setExpiresAt(state, action) {
      state.expiresAt = action.payload as string;
    },
    logoutLocal(state) {
      state.user = null;
      state.expiresAt = null;
      state.isLoading = false;
      state.error = null;
      state.initialized = true;
      try {
        sessionStorage.removeItem('expiresAt');
      } catch {}
    },
  },
  extraReducers: builder => {
    // ---- fetchMe not login is not a error----
    builder.addCase(fetchMe.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
      state.initialized = true;
    });

    builder.addCase(fetchMe.rejected, (state, action) => {
      state.isLoading = false;
      state.initialized = true;
      if (action.payload === 'UNAUTHENTICATED') {
        state.user = null;
        state.error = null; // not a error
      } else {
        state.error = (action.payload as string) ?? action.error.message ?? 'Request failed';
      }
    });

    // ---- other thunk ----
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.expiresAt = action.payload.expiresAt;
      state.isLoading = false;
      state.error = null;
      state.initialized = true;
      try {
        sessionStorage.setItem('expiresAt', action.payload.expiresAt);
      } catch {}
    });

    builder.addCase(logoutThunk.fulfilled, state => {
      state.user = null;
      state.expiresAt = null;
      state.isLoading = false;
      state.error = null;
      state.initialized = true;
      try {
        sessionStorage.removeItem('expiresAt');
      } catch {}
      resetCsrfCache();
    });

    // pending
    builder.addMatcher(isAnyOf(loginThunk.pending, logoutThunk.pending), state => {
      state.isLoading = true;
      state.error = null;
    });

    // rejected
    builder.addMatcher(isAnyOf(loginThunk.rejected, logoutThunk.rejected), (state, action) => {
      state.isLoading = false;
      state.error = (action.payload as string) ?? action.error.message ?? 'Request failed';
    });
  },
});

export const { clearAuthError, setExpiresAt, logoutLocal } = authSlice.actions;
export default authSlice.reducer;
