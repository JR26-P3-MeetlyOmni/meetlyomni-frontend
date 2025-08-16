import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { AuthState, LoginCredentials, User, AuthError } from '../types';

const STORAGE_KEY = 'auth_token';

// Load token from localStorage
const loadTokenFromStorage = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

// Save token to localStorage
const saveTokenToStorage = (token: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, token);
  } catch {
    // Handle storage errors silently
  }
};

// Remove token from localStorage
const removeTokenFromStorage = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Handle storage errors silently
  }
};

// Initial state
const getInitialToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return loadTokenFromStorage();
};

const initialToken = getInitialToken();

const initialState: AuthState = {
  user: null,
  token: initialToken,
  isAuthenticated: !!initialToken,
  isLoading: !!initialToken, // If we have a token, we're loading to verify it
  error: null,
};

// Async thunks
export const loginAsync = createAsyncThunk<
  { user: User; token: string },
  LoginCredentials,
  { rejectValue: AuthError }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await authApi.login(credentials);
    saveTokenToStorage(response.accessToken);
    
    return {
      user: response.user,
      token: response.accessToken,
    };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({
        message: error.message,
        status: 'status' in error ? error.status as number : undefined,
      });
    }
    return rejectWithValue({ message: 'An unexpected error occurred' });
  }
});

export const getCurrentUserAsync = createAsyncThunk<
  User,
  string,
  { rejectValue: AuthError }
>('auth/getCurrentUser', async (token, { rejectWithValue }) => {
  try {
    return await authApi.getCurrentUser(token);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({
        message: error.message,
        status: 'status' in error ? error.status as number : undefined,
      });
    }
    return rejectWithValue({ message: 'Failed to get user information' });
  }
});

export const initializeAuthAsync = createAsyncThunk<
  User | null,
  void,
  { rejectValue: AuthError }
>('auth/initialize', async (_, { getState, rejectWithValue }) => {
  const state = getState() as { auth: AuthState };
  
  // Skip if already initialized or currently loading
  if (state.auth.user !== null || state.auth.isLoading) {
    return state.auth.user;
  }

  const token = loadTokenFromStorage();
  
  if (!token) {
    return null;
  }

  try {
    return await authApi.getCurrentUser(token);
  } catch (error) {
    // If token is invalid, remove it from storage
    removeTokenFromStorage();
    return null;
  }
});

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      removeTokenFromStorage();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload?.message || 'Login failed';
      })
      // Get current user
      .addCase(getCurrentUserAsync.pending, (state) => {
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
        removeTokenFromStorage();
      })
      // Initialize auth
      .addCase(initializeAuthAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuthAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      })
      .addCase(initializeAuthAsync.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;