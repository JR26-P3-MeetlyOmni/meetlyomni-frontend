'use client';

import { TopLeftLogo } from '@/components/Logo';
import { getNavigationItems } from '@/constants/NavigationConfig';
import { useAppSelector } from '@/store/hooks';

import React from 'react';

import { Box, Paper } from '@mui/material';

import NavigationItemComponent from './NavigationItem';

const Sidebar = React.memo(() => {
  const user = useAppSelector(state => state.auth.user);
  const navigationItems = getNavigationItems(user);

  return (
    <Paper
      elevation={1}
      style={{
        width: 280,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        backgroundColor: 'transparent',
      }}
    >
      {/* Sidebar Header */}
      <Box borderBottom={1} borderColor="divider" bgcolor="background.paper">
        <TopLeftLogo />
      </Box>

      {/* Sidebar Content */}
      <Box padding={2} flex={1} bgcolor="background.paper">
        {navigationItems.map(item => (
          <NavigationItemComponent
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={item.isActive}
          />
        ))}
      </Box>
    </Paper>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
