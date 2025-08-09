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
 * 说明：MVF 阶段，前端会临时保存后端返回的 Google id_token。
 * 注意：生产级实现建议由后端签发“自家应用的短时 JWT”，并使用 HttpOnly Cookie 存储。
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
 * 说明：登出时移除客户端可读的 token。若未来改为后端会话，也应调用后端登出接口。
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
