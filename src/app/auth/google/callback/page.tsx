"use client";
import { useEffect, useState } from 'react';
import { setAuthToken } from '@/utils/cookieUtils';

// 说明：有些路由结构下，我们将 Google 回调页面放在 /auth/google/callback。
// 逻辑与 (auth)/login/callback 基本一致：
// - 校验 state 与本地保存的 expectedState 是否一致；
// - 读取 sessionStorage 的 PKCE code_verifier；
// - 将授权码 + code_verifier 发送给后端交换令牌；
// - 成功后保存 id_token 并跳转到业务欢迎页。
export default function GoogleCallbackPage() {
  const [message, setMessage] = useState('Finishing sign-in...');

  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const state = params.get('state');
        const expectedState = sessionStorage.getItem('oauth_state');
        const codeVerifier = sessionStorage.getItem('pkce_code_verifier');

        // 基本校验
        if (!code || !state || !codeVerifier || state !== expectedState) {
          setMessage('Authorization response is invalid.');
          return;
        }

        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
        const resp = await fetch(`${apiBase}/api/auth/google/exchange`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ code, codeVerifier }),
        });

        if (!resp.ok) {
          const text = await resp.text();
          setMessage(`Sign-in failed: ${text}`);
          return;
        }
        const data = await resp.json();
        if (data?.success && data?.idToken) {
          // 存储后端返回的 Google id_token（MVF）
          setAuthToken(data.idToken);
          sessionStorage.removeItem('pkce_code_verifier');
          sessionStorage.removeItem('oauth_state');
          sessionStorage.removeItem('oauth_nonce');
          setMessage('Signed in. Redirecting...');
          window.location.replace('/login/after_login_success_page');
        } else {
          setMessage('Sign-in failed: invalid server response');
        }
      } catch (e) {
        setMessage('Unexpected error while finishing sign-in');
      }
    })();
  }, []);

  return <div style={{ padding: 24 }}>{message}</div>;
}


