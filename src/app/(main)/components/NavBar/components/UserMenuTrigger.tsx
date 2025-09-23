import { ANIMATION_CONFIG, AVATAR_CONFIG } from '@/constants';
import { selectUser } from '@/features/auth/authSelectors';
import { useAppSelector } from '@/store/hooks';

import React, { useCallback } from 'react';

import { KeyboardArrowDown } from '@mui/icons-material';
import { Avatar, Box, Typography, useTheme } from '@mui/material';

interface UserMenuTriggerProps {
  anchorEl: HTMLElement | null;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const UserMenuTrigger = React.memo(({ anchorEl, onClick }: UserMenuTriggerProps) => {
  const user = useAppSelector(selectUser);
  const theme = useTheme();

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.style.backgroundColor = theme.palette.grey[900];
      e.currentTarget.style.color = 'white';
    },
    [theme.palette.grey],
  );

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent';
    e.currentTarget.style.color = 'inherit';
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      padding={0.5}
      borderRadius={1}
      component="div"
      style={{
        cursor: 'pointer',
        transition: ANIMATION_CONFIG.TRANSITION_PROPERTIES.hoverEffect,
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Avatar
        src={AVATAR_CONFIG.DEFAULT_AVATAR}
        alt={AVATAR_CONFIG.ALT_TEXT}
        style={{
          width: AVATAR_CONFIG.DIMENSIONS.width,
          height: AVATAR_CONFIG.DIMENSIONS.height,
        }}
      />
      <Typography variant="body2" marginLeft={1} marginRight={0.5}>
        {user?.email}
      </Typography>
      <KeyboardArrowDown
        style={{
          transform: anchorEl
            ? ANIMATION_CONFIG.TRANSFORMS.rotate.expanded
            : ANIMATION_CONFIG.TRANSFORMS.rotate.collapsed,
          transition: ANIMATION_CONFIG.TRANSITION_PROPERTIES.transform,
        }}
      />
    </Box>
  );
});

UserMenuTrigger.displayName = 'UserMenuTrigger';

export default UserMenuTrigger;
