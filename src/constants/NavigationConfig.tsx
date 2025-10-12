import type { User } from '@/features/auth/authTypes';
import { isAdmin } from '@/utils/permissions';

import { Home, Mail, SignalCellularAlt, WorkspacesOutline } from '@mui/icons-material';

/**
 * Navigation configuration for sidebar menu items
 * Centralized configuration for dashboard navigation
 */

export interface NavigationItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  requireAdmin?: boolean;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    href: '/',
    icon: <Home />,
    label: 'Home',
    isActive: false,
  },
  {
    href: '/dashboard',
    icon: <WorkspacesOutline />,
    label: 'Event management',
    isActive: false,
  },
  {
    href: '/dashboard/Invitation',
    icon: <Mail />,
    label: 'Invitation',
    isActive: false,
    requireAdmin: true,
  },
  {
    href: '/dashboard/Statistics',
    icon: <SignalCellularAlt />,
    label: 'Statistics',
    isActive: false,
  },
] as const;

/**
 * Get navigation items filtered by user permissions
 */
export const getNavigationItems = (user: User | null): NavigationItem[] => {
  return NAVIGATION_ITEMS.filter(item => {
    if (item.requireAdmin) {
      return isAdmin(user);
    }
    return true;
  });
};
