'use client';

import { logoutThunk } from '@/features/auth/logoutThunk';
import type { AppDispatch } from '@/store/store';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { UserInfo } from '../type';
import {
  DropdownIcon,
  DropdownMenu,
  DropdownMenuItem,
  UserAvatar,
  UserMenuWrapper,
  UserName,
} from './UserMenu.styles';

interface UserMenuProps {
  user: UserInfo;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const router = useRouter();
  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      setIsOpen(false);
      router.push('/login');
    } catch {
      alert('Logout failed'); //ToDo： catch (error)& toast？
    }
  }, [dispatch, router]);
  if (!user) return null;

  return (
    <UserMenuWrapper onClick={toggleMenu}>
      <UserAvatar
        src={typeof user.avatar === 'string' ? user.avatar : user.avatar.src}
        alt={user.username}
      />
      <UserName>{user.username}</UserName>
      <DropdownIcon isOpen={isOpen} />
      <DropdownMenu isOpen={isOpen}>
        <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
      </DropdownMenu>
    </UserMenuWrapper>
  );
};
