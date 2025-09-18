import { beforeEach, describe, expect, test, vi } from 'vitest';

import type { RootState } from '../../../store/store';
import { logoutApi } from '../api/logoutApi';
import { logoutCondition, logoutThunk } from '../thunks/logoutThunk';

vi.mock('../api/logoutApi', () => {
  return {
    logoutApi: vi.fn(),
  };
});

const logoutApiMock = vi.mocked(logoutApi);

describe('logoutThunk', () => {
  let mockDispatch;
  let mockGetState;
  const mockSignal = new AbortController().signal;

  beforeEach(() => {
    mockDispatch = vi.fn();
    mockGetState = vi.fn();
    vi.clearAllMocks();
  });

  test('should logout successfully', async () => {
    logoutApiMock.mockResolvedValueOnce(undefined);
    mockGetState = vi.fn(() => ({ auth: { isAuthenticated: true, isLoading: false } }));

    const thunkAction = logoutThunk();
    const result = await thunkAction(mockDispatch, mockGetState, {});

    expect(logoutApiMock).toHaveBeenCalledWith(mockSignal);
    expect(result.type).toBe('auth/logout/fulfilled');
    expect(result.payload).toBe(true);
  });

  test('should skip if not authenticated', async () => {
    mockGetState.mockReturnValue({ auth: { isAuthenticated: false, isLoading: false } });
    const allowed = logoutCondition(undefined, { getState: mockGetState });
    expect(allowed).toBe(false);
  });

  test('should skip if loading', () => {
    mockGetState.mockReturnValue({ auth: { isAuthenticated: true, isLoading: true } });
    const allowed = logoutCondition(undefined, { getState: mockGetState });
    expect(allowed).toBe(false);
  });

  test('should allow if authenticated and not loading', () => {
    mockGetState.mockReturnValue({ auth: { isAuthenticated: true, isLoading: false } });
    const allowed = logoutCondition(undefined, { getState: mockGetState });
    expect(allowed).toBe(true);
  });
});
