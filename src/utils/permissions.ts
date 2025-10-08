import type { User } from '@/features/auth/authTypes';

/**
 * Check if user has admin role
 */
export const isAdmin = (user: User | null): boolean => {
  return user?.role?.toLowerCase() === 'admin';
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (user: User | null): boolean => {
  return user !== null;
};

/**
 * Check if user has specific role
 */
export const hasRole = (user: User | null, role: string): boolean => {
  return user?.role?.toLowerCase() === role.toLowerCase();
};
