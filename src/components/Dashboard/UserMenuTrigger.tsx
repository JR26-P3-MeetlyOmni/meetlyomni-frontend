'use client';

import { selectUser } from '@/features/auth/selectors';
import { useAppSelector } from '@/store/hooks';

import React from 'react';

import { KeyboardArrowDown } from '@mui/icons-material';
import { Avatar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import UserAvatar from '@assets/images/navbar/user_avatar.png';

interface UserMenuTriggerProps {
  anchorEl: HTMLElement | null;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const UserMenuContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const UserEmail = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(0.5),
}));

const ArrowIcon = styled(KeyboardArrowDown)({
  transition: 'transform 0.2s',
});

const UserMenuTrigger = React.memo(({ anchorEl, onClick }: UserMenuTriggerProps) => {
  const user = useAppSelector(selectUser);

  return (
    <UserMenuContainer onClick={onClick}>
      <Avatar src={UserAvatar.src} alt="User Avatar" />
      <UserEmail variant="body2">{user?.email}</UserEmail>
      <ArrowIcon
        style={{
          transform: anchorEl ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      />
    </UserMenuContainer>
  );
});

UserMenuTrigger.displayName = 'UserMenuTrigger';

export default UserMenuTrigger;
