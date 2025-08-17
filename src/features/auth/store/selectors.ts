import { AuthState } from '../types';

type RootState = { auth: AuthState };

// Basic auth selectors
export const selectAuthState = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;

// Derived selectors
export const selectUserDisplayName = (state: RootState) => {
  const user = selectUser(state);
  return user?.fullName || user?.email || 'Unknown User';
};


export const selectHasAuthError = (state: RootState) => {
  return !!selectAuthError(state);
};

export const selectIsInitialized = (state: RootState) => state.auth.isInitialized;
