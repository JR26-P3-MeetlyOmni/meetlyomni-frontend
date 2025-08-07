import { setAuthToken } from '@/utils/cookieUtils';

// API endpoint configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
const LOGIN_ENDPOINT = `${API_BASE_URL}/api/auth/login`;

// Types for API requests and responses
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  message: string;
}

export interface ApiError {
  success: false;
  message: string;
}

// Custom error class for API errors
export class AuthServiceError extends Error {
  constructor(
    message: string,
    public readonly type: 'network' | 'validation' | 'server' = 'server',
  ) {
    super(message);
    this.name = 'AuthServiceError';
  }
}

// Table-driven method for HTTP status code error handling
const HTTP_ERROR_MAP: Record<number | string, { message: string; type: AuthServiceError['type'] }> =
  {
    400: { message: '输入的用户名密码不对，验证失败', type: 'validation' },
    401: { message: '输入的用户名密码不对，验证失败', type: 'validation' },
    403: { message: '访问被拒绝，请联系管理员', type: 'validation' },
    404: { message: '登录服务不可用，请稍后重试', type: 'server' },
    500: { message: '服务器错误，请稍后重试', type: 'server' },
    502: { message: '服务器错误，请稍后重试', type: 'server' },
    503: { message: '服务暂时不可用，请稍后重试', type: 'server' },
    default: { message: '登录失败，请稍后重试', type: 'server' },
  };

const handleLoginResponse = (response: Response): void => {
  if (!response.ok) {
    const errorConfig = HTTP_ERROR_MAP[response.status] || HTTP_ERROR_MAP['default'];
    if (errorConfig) {
      throw new AuthServiceError(errorConfig.message, errorConfig.type);
    }
    throw new AuthServiceError('登录失败，请稍后重试', 'server');
  }
};

const handleLoginError = (error: unknown): never => {
  if (error instanceof TypeError && error.message.includes('fetch')) {
    throw new AuthServiceError('网络连接失败，请检查网络设置', 'network');
  }
  if (error instanceof AuthServiceError) {
    throw error;
  }
  throw new AuthServiceError('登录过程中发生未知错误', 'server');
};

/**
 * Login user with email and password
 */
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    handleLoginResponse(response);

    const data: LoginResponse = await response.json();

    if (data.success && data.token) {
      setAuthToken(data.token);
      return data;
    }

    throw new AuthServiceError(data.message || '登录失败', 'validation');
  } catch (error) {
    return handleLoginError(error);
  }
};

/**
 * Logout user (remove token from storage)
 */
export const logout = async (): Promise<void> => {
  // For now, just remove the token
  // In the future, this could also make an API call to invalidate the token
  const { removeAuthToken } = await import('@/utils/cookieUtils');
  removeAuthToken();
};
