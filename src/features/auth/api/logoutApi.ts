const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export const logoutApi = async (signal?: AbortSignal): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IlN2UThaWWdibEtucWRoczNSSTltT3RSaiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MzIwNDMzZS01MmU1LTRjNmUtYWQwNi0xN2NhZjdiNGM2YTEiLCJlbWFpbCI6InRlc3QwMUBleGFtcGxlLmNvbSIsIm5hbWUiOiJ0ZXN0MDEiLCJqdGkiOiIxNDBiOTc5NWViMTA0ZDg5YjE1ZTgwOTgzOGFiYzkyMSIsImlhdCI6MTc1NjQ2NjA3Nywib3JnX2lkIjoiYWQxMDhmNTItODg2Ni00NGI0LWIwNDktODI5NGJmNjAyOTM1Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzU2NDY2MDc3LCJleHAiOjE3NTY0NjY5NzcsImlzcyI6Ik1lZXRseU9tbmktQVBJIiwiYXVkIjoibG9jYWxob3N0MzAwMCJ9.6tZ28lR7IHX-65TPGUezndKmbRVT8PH-jCxaA5w9PEo`,
      'Content-Type': 'application/json',
    }, // todo:update token each time log in
    signal,
  });

  if (!response.ok) {
    throw new Error(`Logout failed (status ${response.status})`);
  }
};
