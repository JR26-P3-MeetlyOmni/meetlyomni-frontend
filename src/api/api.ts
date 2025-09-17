// lib/api.ts
import { AppError, AppErrorCode, ERROR_MESSAGES } from '@/types/errors';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
let csrfTokenCache: string | null = null;

function readXsrfFromCookie(): string | null {
  if (typeof window === 'undefined' || typeof window.document === 'undefined') return null;
  // match XSRF-TOKEN cookie
  const m = window.document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
  const raw = m?.[1];
  return raw ? decodeURIComponent(raw) : null;
}

export function resetCsrfCache() {
  csrfTokenCache = null;
}

// trigger backend to send XSRF Cookie (no need to parse response body)
export async function ensureXsrfCookie() {
  csrfTokenCache = null;
  await fetch(`${API_BASE}/auth/csrf`, {
    method: 'GET',
    credentials: 'include', // must: let browser receive/send Cookie
    cache: 'no-store',
  });
}

async function ensureXsrfToken(): Promise<string> {
  // memory already has -> use cache
  if (csrfTokenCache) return csrfTokenCache;

  // try to read from cookie first
  let token = readXsrfFromCookie();
  if (token) {
    csrfTokenCache = token;
    return token;
  }

  // if not read -> trigger /csrf to set cookie, then read again
  await ensureXsrfCookie();
  token = readXsrfFromCookie();
  if (!token) throw new Error('Failed to get XSRF-TOKEN cookie');
  csrfTokenCache = token;
  return token;
}

// --- helpers to keep apiFetch simple ---

type HeaderRecord = Record<string, string>;

function headersToRecord(init?: HeadersInit): HeaderRecord {
  if (!init) return {};
  if (init instanceof Headers) {
    const record: HeaderRecord = {};
    init.forEach((value, key) => {
      record[key] = value;
    });
    return record;
  }
  if (Array.isArray(init)) {
    const record: HeaderRecord = {};
    init.forEach(([key, value]) => {
      record[key] = value;
    });
    return record;
  }
  return { ...(init as Record<string, string>) };
}

function isGetOrHead(method: string): boolean {
  return method === 'GET' || method === 'HEAD';
}

function isStateChanging(method: string): boolean {
  return method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE';
}

function shouldSetJsonContentType(
  body: RequestInit['body'] | undefined,
  headers: HeaderRecord,
): boolean {
  const hasBody = body != null;
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  const isBlob = typeof Blob !== 'undefined' && body instanceof Blob;
  const hasContentType = headers['Content-Type'] != null;
  return hasBody && !isFormData && !isBlob && !hasContentType;
}

// Log error - currently disabled, but can be extended for error monitoring services
function logError(_error: AppError, _context?: Record<string, unknown>): void {
  // This function is currently a no-op since console logging is disabled
  // In production, you can integrate with error monitoring services like Sentry here
  // Example: Sentry.captureException(new Error(_error.message), { extra: { ..._error, _context } });
}

// Parse error response data
async function parseErrorData(
  response: Response,
): Promise<{ title: string; detail: string; traceId?: string }> {
  try {
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const data = (await response.json()) as { title?: string; detail?: string; traceId?: string };
      return {
        title: data.title || '',
        detail: data.detail || '',
        traceId: data.traceId,
      };
    } else {
      const text = await response.text();
      return { title: '', detail: text, traceId: undefined };
    }
  } catch {
    return { title: '', detail: `HTTP ${response.status}`, traceId: undefined };
  }
}

// Map HTTP status to error code
function mapStatusToErrorCode(status: number, title: string, detail: string): AppErrorCode {
  if (status === 401) return AppErrorCode.UNAUTHORIZED;
  if (status === 403) {
    const isCsrf =
      title.toLowerCase().includes('csrf') || detail.toLowerCase().includes('antiforgery');
    return isCsrf ? AppErrorCode.CSRF_VALIDATION_FAILED : AppErrorCode.FORBIDDEN;
  }
  if (status === 422) return AppErrorCode.VALIDATION_ERROR;
  if (status === 404) return AppErrorCode.NOT_FOUND;
  if (status === 409) return AppErrorCode.CONFLICT;
  if (status === 400) return AppErrorCode.BAD_REQUEST;
  if (status >= 500) return AppErrorCode.INTERNAL_ERROR;
  if (status === 503) return AppErrorCode.SERVICE_UNAVAILABLE;
  return AppErrorCode.UNKNOWN_ERROR;
}

// Parse backend error response
async function parseErrorResponse(response: Response): Promise<AppError> {
  const { title, detail, traceId } = await parseErrorData(response);
  const status = response.status;
  const code = mapStatusToErrorCode(status, title, detail);

  return {
    status,
    code,
    message: ERROR_MESSAGES[code],
    traceId,
    details: { title, detail, traceId },
  };
}

// Create network error
function createNetworkError(error: Error): AppError {
  const message = error.message.toLowerCase();

  if (message.includes('timeout')) {
    return {
      status: 0,
      code: AppErrorCode.TIMEOUT_ERROR,
      message: ERROR_MESSAGES[AppErrorCode.TIMEOUT_ERROR],
    };
  }

  return {
    status: 0,
    code: AppErrorCode.NETWORK_ERROR,
    message: ERROR_MESSAGES[AppErrorCode.NETWORK_ERROR],
    details: { originalError: error.message },
  };
}

// Custom error class that extends Error but contains AppError information
export class ApiError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly traceId?: string;
  public readonly details?: unknown;

  constructor(appError: AppError) {
    super(appError.message);
    this.name = 'ApiError';
    this.status = appError.status;
    this.code = appError.code;
    this.traceId = appError.traceId;
    this.details = appError.details;
  }
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const method = (options.method ?? 'GET').toUpperCase();

  // clone and normalize headers to a simple record
  const headers: HeaderRecord = headersToRecord(options.headers);

  if (isGetOrHead(method)) {
    headers['Accept'] ??= 'application/json';
  } else {
    if (shouldSetJsonContentType(options.body, headers)) {
      headers['Content-Type'] = 'application/json';
    }

    if (isStateChanging(method)) {
      const xsrf = await ensureXsrfToken();
      headers['X-XSRF-TOKEN'] = xsrf;
    }
  }

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      credentials: 'include',
      headers,
    });

    if (!res.ok) {
      if (res.status === 403) resetCsrfCache();

      // Parse error response
      const appError = await parseErrorResponse(res);

      // Log error
      logError(appError, { path, method });

      // Throw standardized error
      throw new ApiError(appError);
    }

    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) return (await res.json()) as T;
    return undefined as unknown as T;
  } catch (error) {
    // Handle network errors or other exceptions
    if (error instanceof ApiError) {
      throw error; // Re-throw already processed API error
    }

    // Handle network error
    const networkError = createNetworkError(error as Error);
    logError(networkError, { path, method });
    throw new ApiError(networkError);
  }
}
