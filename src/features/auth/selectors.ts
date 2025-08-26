import type { RootState } from '@/store/store';

import { createSelector } from '@reduxjs/toolkit';

const selectAuthState = (state: RootState) => state.auth;

export const selectUser = createSelector([selectAuthState], auth => auth.user);

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  auth => auth.isAuthenticated,
);

export const selectIsLoading = createSelector([selectAuthState], auth => auth.isLoading);

export const selectError = createSelector([selectAuthState], auth => auth.error);
