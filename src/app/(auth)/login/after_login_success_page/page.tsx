'use client';

import { useEffect, useState } from 'react';
import { getAuthToken } from '@/utils/cookieUtils';

type MeResponse = { email?: string };
type ProfileResponse = { name?: string; email?: string };

export default function AfterLoginSuccessPage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
        const idToken = getAuthToken();

        const mePromise = fetch('/api/auth/login', { credentials: 'include' })
          .then(async (res) => {
            if (!res.ok) throw new Error('me_failed');
            const data = (await res.json()) as MeResponse;
            return data.email ?? null;
          })
          .catch(() => null);

        const profilePromise = fetch(`${apiBase}/api/auth/profile`, {
          credentials: 'include',
          headers: idToken ? { Authorization: `Bearer ${idToken}` } : {},
        })
          .then(async (resp) => {
            if (!resp.ok) throw new Error('profile_failed');
            return (await resp.json()) as ProfileResponse;
          })
          .catch(() => ({} as ProfileResponse));

        const [meEmail, profile] = await Promise.all([mePromise, profilePromise]);
        if (!isMounted) return;

        setEmail(meEmail ?? profile.email ?? null);
        setName(profile.name || '');

        if (!meEmail && !profile.name && !profile.email) {
          setError('Failed to fetch user info');
        }
      } catch {
        if (!isMounted) return;
        setError('Unexpected error');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Login Succeeded</h2>
      {name && <div>Welcome, {name}</div>}
      <div>Current user: {email ?? 'Unknown'}</div>
      {error && (
        <div style={{ marginTop: 12, color: 'crimson' }}>{error}</div>
      )}
    </div>
  );
}


