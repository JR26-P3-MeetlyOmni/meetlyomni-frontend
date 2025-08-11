'use client';

import { useEffect, useState } from 'react';

export default function MePage() {
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/me', { credentials: 'include' });
        if (!res.ok) {
          setError('Failed to fetch user info');
          setLoading(false);
          return;
        }
        const data = (await res.json()) as { email?: string };
        setEmail(data.email ?? null);
      } catch (e) {
        setError('Unexpected error');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (error) return <div style={{ padding: 24 }}>{error}</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Login Succeeded</h2>
      <div>Current user: {email ?? 'Unknown'}</div>
    </div>
  );
}


