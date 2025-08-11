// apiClient is not needed here; we call our own Next route

interface LoginRequest {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginRequest) => {
  // Prefer calling our Next.js route which ensures cookie is set on app domain
  const resp = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  if (!resp.ok) {
    throw new Error('Login failed');
  }
  return resp.json();
};
