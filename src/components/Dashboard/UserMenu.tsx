'use client';

import { logoutThunk } from '@/features/auth/thunks';
import { useAppDispatch } from '@/store/hooks';

import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';

import { Box } from '@mui/material';

import UserMenuDropdown from './UserMenuDropdown';
import UserMenuTrigger from './UserMenuTrigger';

const UserMenu = React.memo(() => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      router.push('/login');
    } catch (error) {
      // Even if logout fails, redirect to login page
      // eslint-disable-next-line no-console
      console.warn('Logout failed:', error);
      router.push('/login');
    }
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
    <Box position="relative">
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

UserMenu.displayName = 'UserMenu';

export default UserMenu;
