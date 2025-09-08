'use client';

import Image from 'next/image';
import React from 'react';

import { Box, Paper } from '@mui/material';

import Logo from '@assets/images/navbar/nav_bar_logo.png';

import HomeButton from './HomeButton';

const Sidebar = React.memo(() => (
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
    <Box padding={3} borderBottom={1} borderColor="divider" bgcolor="background.paper">
      <Image src={Logo} alt="Dashboard Logo" width={120} height={40} />
    </Box>

    {/* Sidebar Content */}
    <Box padding={2} flex={1} bgcolor="background.paper">
      <HomeButton />
    </Box>
  </Paper>
));

Sidebar.displayName = 'Sidebar';

export default Sidebar;
