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
export {
  validateEmail,
  validatePasswordStrength,
  isPasswordValid,
  getPasswordStrengthScore,
  getPasswordStrengthMeta,
} from './utils/validation';

// Hooks
export { useEmailRequestForm } from './hooks/useEmailRequestForm';
