'use client';

import React, { useCallback } from 'react';

import { ListItemText, Menu, MenuItem } from '@mui/material';

interface UserMenuDropdownProps {
  onLogout: () => void;
  onDashboard?: () => void;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const UserMenuDropdown = React.memo(
  ({ onLogout, onDashboard, anchorEl, onClose }: UserMenuDropdownProps) => {
    const handleDashboardClick = useCallback(() => {
      if (onDashboard) {
        onDashboard();
      }
      onClose();
    }, [onDashboard, onClose]);

    const handleLogoutClick = useCallback(() => {
      onLogout();
      onClose();
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
        <MenuItem onClick={handleLogoutClick}>
          <ListItemText primary="Log out" />
        </MenuItem>
      </Menu>
    );
  },
);

UserMenuDropdown.displayName = 'UserMenuDropdown';

export default UserMenuDropdown;
