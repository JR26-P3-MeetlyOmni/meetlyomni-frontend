import axios from 'axios';
import type { AxiosRequestHeaders } from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'https://localhost:7011/api',
});

apiClient.interceptors.request.use(
  config => {
    const user = localStorage.getItem('user');
    const token = user ? JSON.parse(user).token : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.request.use(config => {
  const isLogin = (config.url ?? '').includes('/auth/login');
  if (typeof window !== 'undefined' && !isLogin) {
    const raw = localStorage.getItem('user');
    if (raw) {
      try {
        const u = JSON.parse(raw);
        const token: string | undefined = u.token ?? u.accessToken;
        if (token) {
          if (config.headers) {
            (config.headers as AxiosRequestHeaders)['Authorization'] = `Bearer ${token}`;
          } else {
            config.headers = { Authorization: `Bearer ${token}` } as AxiosRequestHeaders;
          }
        }
      } catch {}
    }
  }
  return config;
});

export default apiClient;
