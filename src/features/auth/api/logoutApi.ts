const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export const logoutApi = async (signal?: AbortSignal): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    // headers: {
    //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6ImdQN09nZk9ZLXBhY29IeHQ1WkZnOUtKRCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MzIwNDMzZS01MmU1LTRjNmUtYWQwNi0xN2NhZjdiNGM2YTEiLCJlbWFpbCI6InRlc3QwMUBleGFtcGxlLmNvbSIsIm5hbWUiOiJ0ZXN0MDEiLCJqdGkiOiIzYTk4Y2UzZjEwYTY0N2IxYjExZjIzODIwOTc4MGM4ZSIsImlhdCI6MTc1NjY0MjYwNywib3JnX2lkIjoiYWQxMDhmNTItODg2Ni00NGI0LWIwNDktODI5NGJmNjAyOTM1Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzU2NjQyNjA3LCJleHAiOjE3NTY2NDM1MDcsImlzcyI6Ik1lZXRseU9tbmktQVBJIiwiYXVkIjoibG9jYWxob3N0MzAwMCJ9._GuxYHe6juXGB0I8YorwI04isGTxWEbnbrgY8Ll5sF8`,
    //   'Content-Type': 'application/json',
    // },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Logout failed (status ${response.status})`);
  }
};
