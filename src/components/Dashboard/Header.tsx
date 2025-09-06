import React from 'react';

import { Box } from '@mui/material';

import UserMenu from './UserMenu';

const Header = React.memo(() => (
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
));

Header.displayName = 'Header';

export default Header;
