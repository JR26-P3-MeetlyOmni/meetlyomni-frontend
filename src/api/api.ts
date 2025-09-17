// lib/api.ts
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

interface ApiError extends Error {
  status?: number;
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

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers,
  });

  if (!res.ok) {
    if (res.status === 403) resetCsrfCache();
    const text = await res.text();
    const error = new Error(text || `Request failed: ${res.status}`) as ApiError;
    error.status = res.status;
    throw error;
  }

  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return (await res.json()) as T;
  return undefined as unknown as T;
}
