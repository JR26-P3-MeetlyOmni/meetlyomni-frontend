"use client";
import { useEffect, useState } from 'react';
import { setAuthToken } from '@/utils/cookieUtils';

// 说明：此回调页接收 Google 授权重定向（包含 authorization code 与 state）。
// 1) 校验 state 是否匹配，防止 CSRF。
// 2) 从 sessionStorage 取出之前保存的 PKCE code_verifier。
// 3) 将 { code, codeVerifier } 发给后端 /api/auth/google/exchange，
//    由后端携带 code + code_verifier 向 Google 交换 id_token/refresh_token。
// 4) 后端返回 id_token（MVF 阶段直接使用 Google id_token 作为会话令牌），
//    前端保存后跳转到首页。
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

        // 基本校验：必须同时存在 code/state/code_verifier 且 state 一致
        if (!code || !state || !codeVerifier || state !== expectedState) {
          setMessage('Authorization response is invalid.');
          return;
        }

        // 将授权码与 code_verifier 发给后端交换令牌
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
          // MVF：暂存 Google id_token（短期令牌），后端在受保护接口会再次验证其签名/aud
          setAuthToken(data.idToken);
          // 清理本地的临时数据，避免泄漏
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


