import { Home, SignalCellularAlt, WorkspacesOutline } from '@mui/icons-material';

/**
 * Navigation configuration for sidebar menu items
 * Centralized configuration for dashboard navigation
 */

export interface NavigationItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
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
    href: '/dashboard/Statistics',
    icon: <SignalCellularAlt />,
    label: 'Statistics',
    isActive: false,
  },
] as const;
