'use client';

import React, { useCallback } from 'react';

import { ListItemText, Menu, MenuItem } from '@mui/material';

interface UserMenuDropdownProps {
  onLogout: () => void;
  onDashboard?: () => void;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  isLoggingOut?: boolean;
}

const UserMenuDropdown = React.memo(
  ({ onLogout, onDashboard, anchorEl, onClose, isLoggingOut = false }: UserMenuDropdownProps) => {
    const handleDashboardClick = useCallback(() => {
      onClose();
      if (onDashboard) {
        onDashboard();
      }
    }, [onDashboard, onClose]);

    const handleLogoutClick = useCallback(() => {
      onClose();
      onLogout();
    }, [onLogout, onClose]);

    return (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {onDashboard ? (
          <MenuItem onClick={handleDashboardClick}>
            <ListItemText primary="Dashboard" />
          </MenuItem>
        ) : null}
        <MenuItem onClick={handleLogoutClick} disabled={isLoggingOut}>
          <ListItemText primary={isLoggingOut ? 'Logging out...' : 'Log out'} />
        </MenuItem>
      </Menu>
    );
  },
);

UserMenuDropdown.displayName = 'UserMenuDropdown';

export default UserMenuDropdown;
