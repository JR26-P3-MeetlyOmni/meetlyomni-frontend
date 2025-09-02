// Authentication Constants
export const MOCK_CREDENTIALS = {
  VALID_EMAIL: 'test@example.com',
  VALID_PASSWORD: 'password',
} as const;

export const MOCK_USER = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
} as const;

// Cookie Configuration
export const AUTH_COOKIE_CONFIG = {
  name: 'auth-token',
  value: 'mock-jwt-token',
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  },
} as const;

// Error Messages and Codes
export const AUTH_ERRORS = {
  MISSING_CREDENTIALS: {
    code: 'MISSING_CREDENTIALS',
    message: 'Email and password are required',
    status: 400,
  },
  INVALID_CREDENTIALS: {
    code: 'INVALID_CREDENTIALS',
    message: 'Invalid username or password, please try again',
    status: 401,
  },
  INTERNAL_ERROR: {
    code: 'INTERNAL_ERROR',
    message: 'Internal server error, please try again later',
    status: 500,
  },
} as const;
