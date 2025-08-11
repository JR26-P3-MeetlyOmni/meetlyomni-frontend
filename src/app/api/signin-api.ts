import apiClient from './apiClient';

interface LoginRequest {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginRequest) => {
  const { data } = await apiClient.post('/auth/login', { email, password });

  const { accessToken, expiresAt, tokenType } = data; // ← 和后端字段一致
  if (!accessToken) throw new Error('Login succeeded but accessToken missing');

  if (typeof window !== 'undefined') {
    localStorage.setItem(
      'user',
      JSON.stringify({ token: accessToken, expiresAt, tokenType }), // ← 统一存成 token
    );
  }

  return { token: accessToken, expiresAt, tokenType };
};
