import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://localhost:7011/api';

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

    // Prefer token from body if provided; otherwise, rely on backend cookies (not accessible here)
    const token: string | undefined = data?.accessToken ?? data?.token ?? data?.AccessToken;
    const expiresAt: string | number | undefined = data?.expiresAt;

    const resp = NextResponse.json(data, { status: backendResp.ok ? 200 : backendResp.status });

    if (token) {
      // Set cookie on app domain so other Next routes can read it
      const isProd = process.env.NODE_ENV === 'production';
      const maxAge = typeof expiresAt === 'number' ? Math.max(0, Math.floor((expiresAt - Date.now()) / 1000)) : 60 * 60 * 8;
      resp.cookies.set('access_token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: isProd,
        path: '/',
        maxAge,
      });
    }

    return resp;
  } catch (e) {
    return NextResponse.json({ message: 'Login proxy failed' }, { status: 500 });
  }
}


