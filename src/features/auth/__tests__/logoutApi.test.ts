import { beforeEach, describe, expect, test, vi } from 'vitest';

import { logoutApi } from '../api/logoutApi';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('logoutApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.API_BASE_URL;
  });

  test('should make POST request to correct endpoint', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });

    await logoutApi();

    expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      signal: undefined,
    });
  });

  test('should throw error if response not ok', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });

    await expect(logoutApi()).rejects.toThrow('Logout failed (status 500)');
  });

  test('should pass AbortSignal if provided', async () => {
    const controller = new AbortController();
    const { signal } = controller;

    mockFetch.mockResolvedValueOnce({ ok: true });

    await logoutApi(signal);

    expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      signal,
    });
  });
});
