import Cookies from 'js-cookie';

// Token cookie configuration
const TOKEN_COOKIE_NAME = 'meetly_auth_token';

// Cookie options
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  sameSite: 'strict' as const,
  secure: process.env.NODE_ENV === 'production',
  httpOnly: false, // Note: js-cookie cannot set httpOnly from client-side
};

/**
 * Set authentication token in cookie
 */
export const setAuthToken = (token: string): void => {
  Cookies.set(TOKEN_COOKIE_NAME, token, COOKIE_OPTIONS);
};

/**
 * Get authentication token from cookie
 */
export const getAuthToken = (): string | undefined => {
  return Cookies.get(TOKEN_COOKIE_NAME);
};

/**
 * Remove authentication token from cookie
 */
export const removeAuthToken = (): void => {
  Cookies.remove(TOKEN_COOKIE_NAME);
};

/**
 * Check if user is authenticated (has valid token)
 */
export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  return !!token;
};
