"use client";
import { useEffect, useState } from 'react';
import { getAuthToken } from '@/utils/cookieUtils';

export default function WelcomePage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
        const idToken = getAuthToken();
        const resp = await fetch(`${apiBase}/api/auth/profile`, {
          credentials: 'include',
          headers: idToken ? { Authorization: `Bearer ${idToken}` } : {},
        });
        if (!resp.ok) return;
        const data = await resp.json();
        setName(data?.name || '');
        setEmail(data?.email || '');
      } catch {}
    })();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>欢迎登陆 {name || '用户'}</h2>
      <p>登录账户为： {email || '未知邮箱'}</p>
    </div>
  );
}


