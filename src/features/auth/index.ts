// Types
export type { AuthError, AuthState, LoginCredentials, LoginResponse, User } from './types';

// Components
export { AuthGuard } from './components/AuthGuard';
export { AuthProvider } from './components/AuthProvider';

// API
export { authApi, AuthApiError } from './api/authApi';
export { apiClient } from './api/apiClient';

// Hooks
export { useAuth } from './hooks/useAuth';
export { useLogin } from './hooks/useLogin';
export { useLogout } from './hooks/useLogout';
export { useSignInForm } from './hooks/useSignInForm';

// Store
export { default as authReducer, logout, clearError } from './store/authSlice';
export { loginAsync, getCurrentUserAsync, initializeAuthAsync } from './store/authThunks';

// Selectors
export {
  selectAuthState,
  selectUser,
  selectToken,
  selectIsAuthenticated,
  selectIsLoading,
  selectAuthError,
  selectUserDisplayName,
  selectUserRole,
  selectIsAdmin,
  selectHasAuthError,
  selectIsInitialized,
} from './store/selectors';

// Services
export { tokenStorage } from './services/tokenStorage';

// Validation
export { validateEmail } from './validation/email';
export { validatePassword } from './validation/password';
export { validateField, validateLoginForm } from './validation/validators';

// Constants
export { AUTH_MESSAGES } from './constants/messages';
export { AUTH_ROUTES } from './constants/routes';
