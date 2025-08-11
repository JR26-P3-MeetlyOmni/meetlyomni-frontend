import axios from 'axios';

// Use HttpOnly cookies for auth: rely on browser-managed cookies only
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'https://localhost:7011/api',
  withCredentials: true,
});

export default apiClient;
