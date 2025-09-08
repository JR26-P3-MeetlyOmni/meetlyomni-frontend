'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { BarChart, Dashboard, Home } from '@mui/icons-material';
import { Box, Button, Paper } from '@mui/material';

import Logo from '@assets/images/navbar/nav_bar_logo.png';

interface NavigationItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const NavigationItem = React.memo(({ href, icon, label }: NavigationItemProps) => {
  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Button
        variant="text"
        startIcon={icon}
        fullWidth
        style={{
          justifyContent: 'flex-start',
          padding: '12px 16px',
          textTransform: 'none',
          fontWeight: 500,
        }}
      >
        {label}
      </Button>
    </Link>
  );
});

NavigationItem.displayName = 'NavigationItem';

const Sidebar = React.memo(() => {
  const navigationItems = [
    {
      href: '/',
      icon: <Home />,
      label: 'Home',
    },
    {
      href: '/dashboard',
      icon: <Dashboard />,
      label: 'Event management',
    },
    {
      href: '/statistics',
      icon: <BarChart />,
      label: 'Statistics',
    },
  ];

  return (
    <Paper
      elevation={1}
      style={{
        width: 280,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
      }}
    >
      {/* Sidebar Header */}
      <Box
        style={{
          padding: 24,
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Image src={Logo} alt="Dashboard Logo" width={120} height={40} />
      </Box>

      {/* Sidebar Content */}
      <Box
        style={{
          padding: 16,
          flex: 1,
        }}
      >
        {navigationItems.map(item => (
          <NavigationItem key={item.href} href={item.href} icon={item.icon} label={item.label} />
        ))}
      </Box>
    </Paper>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
