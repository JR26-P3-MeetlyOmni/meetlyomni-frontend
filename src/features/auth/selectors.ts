import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

const selectAuthState = (state: RootState) => state.auth;

// Auth state selectors
export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => auth.isAuthenticated
);

export const selectIsLoading = createSelector(
  [selectAuthState],
  (auth) => auth.isLoading
);

export const selectError = createSelector(
  [selectAuthState],
  (auth) => auth.error
);

export const selectPasswordResetState = createSelector(
  [selectAuthState],
  (auth) => auth.passwordReset
);

export const selectIsRequestingReset = createSelector(
  [selectPasswordResetState],
  (passwordReset) => passwordReset.isRequestingReset
);

export const selectIsResettingPassword = createSelector(
  [selectPasswordResetState],
  (passwordReset) => passwordReset.isResettingPassword
);

export const selectEmailSent = createSelector(
  [selectPasswordResetState],
  (passwordReset) => passwordReset.emailSent
);

export const selectPasswordResetRequestError = createSelector(
  [selectPasswordResetState],
  (passwordReset) => passwordReset.requestError
);

export const selectPasswordResetError = createSelector(
  [selectPasswordResetState],
  (passwordReset) => passwordReset.resetError
);

export const selectAnyPasswordResetLoading = createSelector(
  [selectPasswordResetState],
  (passwordReset) => passwordReset.isRequestingReset || passwordReset.isResettingPassword
);

export const selectAnyPasswordResetError = createSelector(
  [selectPasswordResetState],
  (passwordReset) => passwordReset.requestError || passwordReset.resetError
);