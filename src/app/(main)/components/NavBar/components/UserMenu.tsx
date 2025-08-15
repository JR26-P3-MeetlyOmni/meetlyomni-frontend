'use client';

import { UserInfo } from '../type';
import { DropdownIcon, UserAvatar, UserMenuWrapper, UserName } from './UserMenu.styles';

interface UserMenuProps {
  user: UserInfo;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  if (!user) return null;

  return (
    <UserMenuWrapper>
      <UserAvatar
        src={typeof user.avatar === 'string' ? user.avatar : user.avatar.src}
        alt={user.username}
      />
      <UserName>{user.username}</UserName>
      <DropdownIcon />
    </UserMenuWrapper>
  );
};
