import { logout } from '@/features/auth/slice';
import { useAppDispatch } from '@/store/hooks';

import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';

import { Box } from '@mui/material';

import UserMenuDropdown from './UserMenuDropdown';
import UserMenuTrigger from './UserMenuTrigger';

const DashboardUserMenu = React.memo(() => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    router.push('/login');
  }, [dispatch, router]);

  const handleDashboard = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  const handleMenuClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Box sx={{ position: 'relative' }}>
      <UserMenuTrigger anchorEl={anchorEl} onClick={handleMenuClick} />
      <UserMenuDropdown
        onLogout={handleLogout}
        onDashboard={handleDashboard}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
      />
    </Box>
  );
});

DashboardUserMenu.displayName = 'DashboardUserMenu';

export default DashboardUserMenu;
