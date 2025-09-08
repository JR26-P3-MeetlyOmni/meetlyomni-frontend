import { BarChart, Event, Home } from '@mui/icons-material';

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
    href: '/dashboard/events',
    icon: <Event />,
    label: 'Event management',
    isActive: false,
  },
  {
    href: '/dashboard/statistics',
    icon: <BarChart />,
    label: 'Statistics',
    isActive: false,
  },
] as const;
