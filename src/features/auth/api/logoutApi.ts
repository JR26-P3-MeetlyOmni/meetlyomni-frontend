const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export const logoutApi = async (signal?: AbortSignal): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    signal,
  });

  if (!response.ok) {
    throw new Error(`Logout failed (status ${response.status})`);
  }
};
