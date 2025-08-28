// Types
export type {
  User,
  LoginCredentials,
  RequestResetCredentials,
  ResetPasswordCredentials,
  PasswordValidation,
  PasswordResetState,
  AuthState,
  AuthError,
  UseNewPasswordFormReturn,
} from './types';

// Slice (reducer and actions)
export { default as authReducer } from './slice';
export { clearPasswordResetState, clearPasswordResetErrors } from './slice';

// Selectors
export {
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectError,
  selectPasswordResetState,
  selectIsRequestingReset,
  selectIsResettingPassword,
  selectEmailSent,
  selectPasswordResetRequestError,
  selectPasswordResetError,
  selectAnyPasswordResetLoading,
  selectAnyPasswordResetError,
} from './selectors';

// Thunks
export { loginThunk } from './thunks/loginThunk';
export { requestResetThunk } from './thunks/requestResetThunk';
export { resetPasswordThunk } from './thunks/resetPasswordThunk';

// API functions
export { loginApi } from './api/loginApi';
export { requestResetApi } from './api/requestResetApi';
export { resetPasswordApi } from './api/resetPasswordApi';

// Utility functions
export { validateEmail } from './utils/emailValidation';
export {
  validatePasswordStrength,
  isPasswordValid,
  getPasswordStrengthScore,
  getPasswordStrengthMeta,
  getPasswordValidationState,
} from './utils/passwordValidation';

export {
  toAuthError,
  canLogin,
  canRequestPasswordReset,
  canResetPassword,
} from './utils/authThunkUtils';

// Hooks
export { useEmailRequestForm } from './hooks/useEmailRequestForm';
export { useNewPasswordForm } from './hooks/useNewPasswordForm';
