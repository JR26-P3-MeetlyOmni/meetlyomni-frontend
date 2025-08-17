export const AUTH_MESSAGES = {
  // Error messages
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_INVALID: 'Password must be at least 8 characters with uppercase, lowercase, and number',
  LOGIN_FAILED: 'Invalid email or password',
  UNAUTHORIZED: 'Unauthorized access',
  NETWORK_ERROR: 'Network error occurred',
  UNEXPECTED_ERROR: 'An unexpected error occurred',
  GET_USER_FAILED: 'Failed to get user information',

  // Success messages
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  LOGOUT_FAILED: 'Logout failed',
} as const;
