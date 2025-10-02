import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../store/store';

// Base selector
const selectSignupState = (state: RootState) => state.signup;

// Only keep complex selectors that add value
export const selectCanGoToStep = createSelector(
  [selectSignupState],
  signup => (targetStep: string) => {
    if (targetStep === 'company') return true;
    if (targetStep === 'email') return signup.companyValid;
    if (targetStep === 'password') return signup.companyValid && signup.emailValid;
    if (targetStep === 'contact')
      return signup.companyValid && signup.emailValid && signup.passwordValid;
    return false;
  },
);

export const selectIsFormComplete = createSelector(
  [selectSignupState],
  signup => signup.companyValid && signup.emailValid && signup.passwordValid && signup.contactValid,
);
