import { createSlice } from '@reduxjs/toolkit';

import { tokenStorage } from '../services/tokenStorage';
import { AuthState } from '../types';
import { getCurrentUserAsync, initializeAuthAsync, loginAsync, logoutAsync } from './authThunks';

// Initial state
const getInitialState = (): AuthState => {
  const initialToken = tokenStorage.load();

  return {
    user: null,
    token: initialToken,
    isAuthenticated: !!initialToken,
    isLoading: !!initialToken, // 如果有 token，需要验证
    isInitialized: false, // 🆕 初始状态为未初始化
    error: null,
  };
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Login
      .addCase(loginAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isInitialized = true; // 🆕 登录成功后标记为已初始化
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isInitialized = true; // 🆕 即使登录失败也要标记为已初始化
        state.error = action.payload?.message || 'Login failed';
      })
      // Get current user
      .addCase(getCurrentUserAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getCurrentUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload?.message || 'Failed to get user information';
        // tokenStorage.remove() is already called in the thunk
      })
      // Initialize auth
      .addCase(initializeAuthAsync.pending, state => {
        state.isLoading = true;
        // 🆕 不在这里设置 isInitialized，等待完成
      })
      .addCase(initializeAuthAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true; // 🆕 初始化完成
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.token = 'authenticated';
        } else {
          state.isAuthenticated = false;
          state.token = null;
        }
      })
      .addCase(initializeAuthAsync.rejected, state => {
        state.isLoading = false;
        state.isInitialized = true; // 🆕 即使失败也标记为已初始化
        state.isAuthenticated = false;
        state.token = null;
      })
      // Logout
      .addCase(logoutAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isInitialized = true; // 🆕 登出后保持已初始化状态
        state.error = null;
      })
      .addCase(logoutAsync.rejected, state => {
        // Even if logout API fails, clear local state
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isInitialized = true; // 🆕 登出后保持已初始化状态
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
