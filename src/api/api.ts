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

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const method = (options.method ?? 'GET').toUpperCase();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // if not GET: add XSRF header
  if (method !== 'GET') {
    const xsrf = await ensureXsrfToken();
    (headers as Record<string, string>)['X-XSRF-TOKEN'] = xsrf;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers,
  });

  if (!res.ok) {
    if (res.status === 403) csrfTokenCache = null;
    const text = await res.text();
    const err = new Error(text || `Request failed: ${res.status}`) as Error & { status: number };
    err.status = res.status;
    throw err;
  }

  // if no content, avoid .json() error
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return (await res.json()) as T;
  // Non-JSON response: caller can ignore return value
  return undefined as unknown as T;
}
