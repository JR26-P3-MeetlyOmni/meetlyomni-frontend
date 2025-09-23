// Unified error handling type definitions

export interface AppError {
  status: number;
  code: string;
  message: string;
  traceId?: string;
  details?: unknown;
}

export enum AppErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',

  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  CSRF_VALIDATION_FAILED = 'CSRF_VALIDATION_FAILED',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',

  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',

  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',

  BAD_REQUEST = 'BAD_REQUEST',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// User-friendly error messages
export const ERROR_MESSAGES: Record<AppErrorCode, string> = {
  [AppErrorCode.NETWORK_ERROR]: 'Network connection failed, please check your network settings',
  [AppErrorCode.TIMEOUT_ERROR]: 'Request timeout, please try again later',
  [AppErrorCode.UNAUTHORIZED]: 'Login expired, please log in again',
  [AppErrorCode.FORBIDDEN]: 'You do not have permission to perform this operation',
  [AppErrorCode.CSRF_VALIDATION_FAILED]:
    'Security validation failed, please refresh the page and try again',
  [AppErrorCode.TOKEN_EXPIRED]: 'Login expired, please log in again',
  [AppErrorCode.INVALID_CREDENTIALS]: 'Invalid username or password',
  [AppErrorCode.VALIDATION_ERROR]: 'Invalid input, please check and try again',
  [AppErrorCode.NOT_FOUND]: 'The requested resource does not exist',
  [AppErrorCode.CONFLICT]: 'Operation conflict, please try again',
  [AppErrorCode.INTERNAL_ERROR]: 'Internal server error, please try again later',
  [AppErrorCode.SERVICE_UNAVAILABLE]: 'Service temporarily unavailable, please try again later',
  [AppErrorCode.BAD_REQUEST]: 'Invalid request parameters, please check and try again',
  [AppErrorCode.UNKNOWN_ERROR]: 'An unknown error occurred, please contact technical support',
};

// Error handling configuration
export interface ErrorConfig {
  shouldRetry: boolean;
  shouldLogout: boolean;
  shouldRefreshToken: boolean;
  logLevel: 'error' | 'warn' | 'info';
}

export const ERROR_CONFIG: Record<AppErrorCode, ErrorConfig> = {
  [AppErrorCode.NETWORK_ERROR]: {
    shouldRetry: true,
    shouldLogout: false,
    shouldRefreshToken: false,
    logLevel: 'warn',
  },
  [AppErrorCode.TIMEOUT_ERROR]: {
    shouldRetry: true,
    shouldLogout: false,
    shouldRefreshToken: false,
    logLevel: 'warn',
  },
  [AppErrorCode.UNAUTHORIZED]: {
    shouldRetry: false,
    shouldLogout: true,
    shouldRefreshToken: false,
    logLevel: 'info',
  },
  [AppErrorCode.FORBIDDEN]: {
    shouldRetry: false,
    shouldLogout: false,
    shouldRefreshToken: false,
    logLevel: 'warn',
  },
  [AppErrorCode.CSRF_VALIDATION_FAILED]: {
    shouldRetry: true,
    shouldLogout: false,
    shouldRefreshToken: false,
    logLevel: 'warn',
  },
  [AppErrorCode.TOKEN_EXPIRED]: {
    shouldRetry: false,
    shouldLogout: true,
    shouldRefreshToken: true,
    logLevel: 'info',
  },
  [AppErrorCode.INVALID_CREDENTIALS]: {
    shouldRetry: false,
    shouldLogout: false,
    shouldRefreshToken: false,
    logLevel: 'info',
  },
  [AppErrorCode.VALIDATION_ERROR]: {
    shouldRetry: false,
    shouldLogout: false,
    shouldRefreshToken: false,
    logLevel: 'info',
  },
  [AppErrorCode.NOT_FOUND]: {
    shouldRetry: false,
    shouldLogout: false,
    shouldRefreshToken: false,
    logLevel: 'warn',
  },
  [AppErrorCode.CONFLICT]: {
    shouldRetry: false,
    shouldLogout: false,
    shouldRefreshToken: false,
    logLevel: 'warn',
  },
  [AppErrorCode.INTERNAL_ERROR]: {
    shouldRetry: true,
    shouldLogout: false,
    shouldRefreshToken: false,
    logLevel: 'error',
  },
  [AppErrorCode.SERVICE_UNAVAILABLE]: {
    shouldRetry: true,
    shouldLogout: false,
    shouldRefreshToken: false,
    logLevel: 'error',
  },
  [AppErrorCode.BAD_REQUEST]: {
    shouldRetry: false,
    shouldLogout: false,
    shouldRefreshToken: false,
    logLevel: 'warn',
  },
  [AppErrorCode.UNKNOWN_ERROR]: {
    shouldRetry: false,
    shouldLogout: false,
    shouldRefreshToken: false,
    logLevel: 'error',
  },
};
