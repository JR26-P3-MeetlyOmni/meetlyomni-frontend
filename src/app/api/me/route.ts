import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Simple, safe parser for JWT payload (no signature verification)
function parseJwt<T = unknown>(token: string): T | null {
  try {
    const [, payload] = token.split('.');
    const json = Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

export async function GET() {
  const cookieStore = await cookies();
  // Try typical cookie names first
  const namedToken =
    cookieStore.get('access_token')?.value ||
    cookieStore.get('id_token')?.value ||
    cookieStore.get('token')?.value ||
    null;

  let email: string | null = null;

  const tryParseAndExtract = (token: string | undefined): string | null => {
    if (!token) return null;
    const claims = parseJwt<Record<string, unknown>>(token) || {};
    const candidates = [
      claims['email'],
      claims['preferred_username'],
      claims['upn'],
      claims['unique_name'],
    ];
    const found = candidates.find(v => typeof v === 'string' && v.length > 0) as string | undefined;
    return found ?? null;
  };

  email = tryParseAndExtract(namedToken ?? undefined);

  if (!email) {
    // Fallback: scan all cookies for a JWT-looking value
    const all = cookieStore.getAll();
    for (const c of all) {
      if (c.value && c.value.split('.').length === 3) {
        email = tryParseAndExtract(c.value);
        if (email) break;
      }
    }
  }

  return NextResponse.json({ email: email ?? null }, { status: 200 });
}


