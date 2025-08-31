'use client';

import Image from 'next/image';
import React from 'react';

import { Box, Paper } from '@mui/material';

import Logo from '@assets/images/navbar/nav_bar_logo.png';

import HomeButton from './components/HomeButton';
import UserMenu from './components/UserMenu';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Box display="flex" height="100vh" sx={{ bgcolor: theme => theme.palette.grey[50] }}>
      <Sidebar />
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        sx={{ bgcolor: theme => theme.palette.grey[50] }}
      >
        <Header />
        {children}
      </Box>
    </Box>
  );
}

const Sidebar = () => (
  <Paper
    elevation={1}
    sx={{
      width: 280,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 0,
      bgcolor: 'background.paper',
    }}
  >
    {/* Sidebar Header */}
    <Box padding={3} borderBottom={1} borderColor="divider" sx={{ bgcolor: 'background.paper' }}>
      <Image src={Logo} alt="Dashboard Logo" width={120} height={40} />
    </Box>

    {/* Sidebar Content */}
    <Box padding={2} flex={1} sx={{ bgcolor: 'background.paper' }}>
      <HomeButton />
    </Box>
  </Paper>
);

const Header = () => (
  <Box
    height={80}
    borderBottom={1}
    borderColor="divider"
    display="flex"
    alignItems="center"
    padding={3}
    sx={{ bgcolor: theme => theme.palette.grey[50] }}
  >
    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
      <Box flex={1} />
      <UserMenu />
    </Box>
  </Box>
);
