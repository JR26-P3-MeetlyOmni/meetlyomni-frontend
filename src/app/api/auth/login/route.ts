import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://localhost:7011/api';

// Simple, safe parser for JWT payload (no signature verification)
function parseJwt<T = unknown>(token: string): T | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2 || !parts[1]) return null;
    const payload = parts[1];
    const json = Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

function computeMaxAgeSeconds(expiresAt: string | number | undefined): number {
  if (typeof expiresAt === 'number') {
    return Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
  }
  return 60 * 60 * 8; // 8 hours default
}

function setAccessTokenCookie(
  resp: NextResponse,
  token: string | undefined,
  expiresAt: string | number | undefined,
) {
  if (!token) return;
  const isProd = process.env.NODE_ENV === 'production';
  const maxAge = computeMaxAgeSeconds(expiresAt);
  resp.cookies.set('access_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    path: '/',
    maxAge,
  });
}

export async function GET() {
  const cookieStore = await cookies();
  const namedToken =
    cookieStore.get('access_token')?.value ||
    cookieStore.get('id_token')?.value ||
    cookieStore.get('token')?.value ||
    null;

  const tryParseAndExtract = (token: string | undefined): string | null => {
    if (!token) return null;
    const claims = parseJwt<Record<string, unknown>>(token) || {};
    const candidates = [
      claims['email'],
      claims['preferred_username'],
      claims['upn'],
      claims['unique_name'],
    ];
    const found = candidates.find(v => typeof v === 'string' && (v as string).length > 0) as
      | string
      | undefined;
    return found ?? null;
  };

  const email = tryParseAndExtract(namedToken ?? undefined);
  return NextResponse.json({ email: email ?? null }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const backendResp = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    const data = await backendResp.json().catch(() => ({}));
    const token: string | undefined = data?.accessToken ?? data?.token ?? data?.AccessToken;
    const expiresAt: string | number | undefined = data?.expiresAt;

    const resp = NextResponse.json(data, { status: backendResp.ok ? 200 : backendResp.status });
    setAccessTokenCookie(resp, token, expiresAt);
    return resp;
  } catch {
    return NextResponse.json({ message: 'Login proxy failed' }, { status: 500 });
  }
}


