import { useMemo } from 'react';

import { tokenStorage } from '../services/tokenStorage';

export interface UserInfo {
  id: string;
  email: string;
  name: string;
  role?: string;
  organizationId?: string;
  organizationCode?: string;
  fullName?: string;
  phoneNumber?: string;
}

/**
 * Hook to get current user information from token storage
 */
export const useUserRole = () => {
  const userInfo = useMemo(() => {
    return tokenStorage.getUserInfo();
  }, []);

  const role = userInfo?.role || 'user';

  return {
    userInfo,
    role,
    isAuthenticated: !!userInfo,
    canAccessAdminPanel: () => role === 'admin',
    canManageUsers: () => ['admin', 'manager'].includes(String(role)),
    getDashboardRoute: () => '/dashboard',
  };
};