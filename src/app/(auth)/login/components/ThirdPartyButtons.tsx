// 说明：此组件负责第三方登录按钮（目前实现 Google）。
// 点击 Google 按钮后，会在前端生成 PKCE（Proof Key for Code Exchange，pksiː）
// 的 code_verifier 与 code_challenge，并携带 state/nonce 重定向到 Google 授权页。
// 授权成功后，Google 会把授权码（authorization code）带回到我们配置的 redirect_uri。
//
// 学习点（Learning Point）：
// - PKCE：前端生成 code_verifier（保存在浏览器）与 code_challenge（发送给 Google），
//   后端用授权码 + code_verifier 向 Google 换取令牌，防止授权码被拦截后滥用。
// - state/nonce：防 CSRF 与重放攻击（Replay Attack，rɪˈpleɪ）。
import React, { useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { createRandomString, generateCodeChallenge, generateCodeVerifier } from '@/utils/pkce';

const ThirdPartyButton = styled(Button)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  ...theme.typography.body2,
  fontWeight: theme.typography.fontWeightMedium,
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius,
  height: 40,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ThirdPartyIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
}));

export const ThirdPartyButtons: React.FC = () => {
  const handleGoogleLogin = useCallback(() => {
    (async () => {
      // Read Google OAuth 2.0 client configuration from environment variables
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string | undefined;
      // Prefer explicit env; otherwise fall back to a predictable route in this app
      const redirectUri = (typeof window !== 'undefined'
        ? (process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || `${window.location.origin}/auth/google/callback`)
        : process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI) as string | undefined;
      const scope = 'openid email profile';

      if (!clientId) {
        // Fail fast with a clear message if client id is missing
        console.error('Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID. Set it in .env.local.');
        alert('Google login is not configured. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID.');
        return;
      }
      if (!redirectUri) {
        console.error('Missing redirect URI. Computation failed.');
        alert('Google login redirect URI is not configured.');
        return;
      }

      // 生成 state 与 nonce（用于请求关联与防重放）
      const state = createRandomString(32);
      const nonce = createRandomString(32);
      // 生成 PKCE 的 code_verifier 与 code_challenge（S256 方法）
      const codeVerifier = await generateCodeVerifier(128);
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      // 将 code_verifier/state/nonce 暂存到当前会话（只在当前标签页有效）
      sessionStorage.setItem('pkce_code_verifier', codeVerifier);
      sessionStorage.setItem('oauth_state', state);
      sessionStorage.setItem('oauth_nonce', nonce);

      // 组装 Google 授权请求参数
      // access_type=offline + prompt=consent：首次同意时可获取 refresh_token
      // 如需让用户切换账号，可将 prompt 设置为 'select_account'（不会自动授予上一次账号）
      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope,
        state,
        nonce,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
        access_type: 'offline',
        prompt: 'consent',
      });

      // 跳转到 Google 授权页
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
      window.location.href = authUrl;
    })();
  }, []);

  const handleMicrosoftLogin = useCallback(() => {
    // Implement Microsoft OAuth
  }, []);

  return (
    <>
      <ThirdPartyButton onClick={handleGoogleLogin}>
        <ThirdPartyIcon>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        </ThirdPartyIcon>
        Sign in with Google
      </ThirdPartyButton>

      <ThirdPartyButton onClick={handleMicrosoftLogin}>
        <ThirdPartyIcon>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="1" y="1" width="10" height="10" fill="#f25022" />
            <rect x="13" y="1" width="10" height="10" fill="#7fba00" />
            <rect x="1" y="13" width="10" height="10" fill="#00a4ef" />
            <rect x="13" y="13" width="10" height="10" fill="#ffb900" />
          </svg>
        </ThirdPartyIcon>
        Sign in with Microsoft
      </ThirdPartyButton>
    </>
  );
};
