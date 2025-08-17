import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { mockUser } from '@/test-utils/test-utils';
import { useUserRole } from './useUserRole';

// Mock tokenStorage
vi.mock('../services/tokenStorage', () => ({
  tokenStorage: {
    getUserInfo: vi.fn(),
    load: vi.fn(),
    save: vi.fn(),
    remove: vi.fn(),
    exists: vi.fn(),
    refresh: vi.fn(),
  },
}));

import { tokenStorage } from '../services/tokenStorage';

describe('useUserRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when user is authenticated', () => {
    it('should return user info and authenticated state', () => {
      vi.mocked(tokenStorage.getUserInfo).mockReturnValue(mockUser);

      const { result } = renderHook(() => useUserRole());

      expect(result.current.userInfo).toEqual(mockUser);
      expect(result.current.role).toBe('user');
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('should return admin role for admin user', () => {
      const adminUser = { ...mockUser, role: 'admin' };
      vi.mocked(tokenStorage.getUserInfo).mockReturnValue(adminUser);

      const { result } = renderHook(() => useUserRole());

      expect(result.current.role).toBe('admin');
      expect(result.current.canAccessAdminPanel()).toBe(true);
      expect(result.current.canManageUsers()).toBe(true);
    });

    it('should return manager role for manager user', () => {
      const managerUser = { ...mockUser, role: 'manager' };
      vi.mocked(tokenStorage.getUserInfo).mockReturnValue(managerUser);

      const { result } = renderHook(() => useUserRole());

      expect(result.current.role).toBe('manager');
      expect(result.current.canAccessAdminPanel()).toBe(false);
      expect(result.current.canManageUsers()).toBe(true);
    });
  });

  describe('when user is not authenticated', () => {
    it('should return default values when no user info', () => {
      vi.mocked(tokenStorage.getUserInfo).mockReturnValue(null);

      const { result } = renderHook(() => useUserRole());

      expect(result.current.userInfo).toBeNull();
      expect(result.current.role).toBe('user');
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should handle undefined user info', () => {
      vi.mocked(tokenStorage.getUserInfo).mockReturnValue(undefined as any);

      const { result } = renderHook(() => useUserRole());

      expect(result.current.userInfo).toBeUndefined();
      expect(result.current.role).toBe('user');
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('permission functions', () => {
    it('should return correct dashboard route', () => {
      vi.mocked(tokenStorage.getUserInfo).mockReturnValue(mockUser);

      const { result } = renderHook(() => useUserRole());

      expect(result.current.getDashboardRoute()).toBe('/dashboard');
    });

    it('should handle admin permissions correctly', () => {
      const adminUser = { ...mockUser, role: 'admin' };
      vi.mocked(tokenStorage.getUserInfo).mockReturnValue(adminUser);

      const { result } = renderHook(() => useUserRole());

      expect(result.current.canAccessAdminPanel()).toBe(true);
      expect(result.current.canManageUsers()).toBe(true);
    });

    it('should handle manager permissions correctly', () => {
      const managerUser = { ...mockUser, role: 'manager' };
      vi.mocked(tokenStorage.getUserInfo).mockReturnValue(managerUser);

      const { result } = renderHook(() => useUserRole());

      expect(result.current.canAccessAdminPanel()).toBe(false);
      expect(result.current.canManageUsers()).toBe(true);
    });

    it('should handle regular user permissions correctly', () => {
      const regularUser = { ...mockUser, role: 'user' };
      vi.mocked(tokenStorage.getUserInfo).mockReturnValue(regularUser);

      const { result } = renderHook(() => useUserRole());

      expect(result.current.canAccessAdminPanel()).toBe(false);
      expect(result.current.canManageUsers()).toBe(false);
    });
  });

  describe('role handling', () => {
    it('should default to user role when role is undefined', () => {
      const userWithoutRole = { ...mockUser, role: undefined };
      vi.mocked(tokenStorage.getUserInfo).mockReturnValue(userWithoutRole);

      const { result } = renderHook(() => useUserRole());

      expect(result.current.role).toBe('user');
    });

    it('should handle empty string role', () => {
      const userWithEmptyRole = { ...mockUser, role: '' };
      vi.mocked(tokenStorage.getUserInfo).mockReturnValue(userWithEmptyRole);

      const { result } = renderHook(() => useUserRole());

      expect(result.current.role).toBe('user');
    });

    it('should handle null role', () => {
      const userWithNullRole = { ...mockUser, role: null as any };
      vi.mocked(tokenStorage.getUserInfo).mockReturnValue(userWithNullRole);

      const { result } = renderHook(() => useUserRole());

      expect(result.current.role).toBe('user');
    });
  });
});