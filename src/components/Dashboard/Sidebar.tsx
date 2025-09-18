'use client';

import { TopLeftLogo } from '@/components/Logo';
import { ANIMATION_CONFIG } from '@/constants';
import { NAVIGATION_ITEMS, type NavigationItem } from '@/constants/NavigationConfig';

import Link from 'next/link';
import React, { useCallback } from 'react';

import { Box, Paper, Typography, useTheme } from '@mui/material';

const NavigationItemComponent = React.memo(
  ({ href, icon, label, isActive = false }: NavigationItem) => {
    const theme = useTheme();

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = theme.palette.grey[900];
          e.currentTarget.style.color = 'white';
        }
      },
      [theme.palette.grey, isActive],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'inherit';
        }
      },
      [isActive],
    );

    return (
      <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Box
          display="flex"
          alignItems="center"
          gap={1.5}
          padding={1.5}
          borderRadius={1}
          marginBottom={0.5}
          component="div"
          style={{
            cursor: 'pointer',
            transition: ANIMATION_CONFIG.TRANSITION_PROPERTIES.hoverEffect,
            backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
            color: isActive ? 'white' : 'inherit',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {icon}
          <Typography fontWeight={500}>{label}</Typography>
        </Box>
      </Link>
    );
  },
);

NavigationItemComponent.displayName = 'NavigationItemComponent';

const Sidebar = React.memo(() => {
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
        {NAVIGATION_ITEMS.map(item => (
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
