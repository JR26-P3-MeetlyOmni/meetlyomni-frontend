'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { ReactNode, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { AUTH_ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, requireAuth = true }) => {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // ✅ 防止 Hydration 错误：等待客户端挂载
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // 🆕 只有在认证初始化完成后才进行路由跳转判断
    if (isInitialized && !isLoading && isMounted) {
      if (requireAuth && !isAuthenticated) {
        router.push(AUTH_ROUTES.LOGIN);
      } else if (!requireAuth && isAuthenticated) {
        router.push(AUTH_ROUTES.DASHBOARD);
      }
    }
  }, [isAuthenticated, isLoading, isInitialized, requireAuth, router, isMounted]);

  // ✅ 等待客户端挂载和认证初始化完成
  if (!isMounted || !isInitialized || isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // 🆕 只有在初始化完成后才检查认证状态
  if (requireAuth && !isAuthenticated) {
    return null; // 将通过 useEffect 跳转到登录页
  }

  if (!requireAuth && isAuthenticated) {
    return null; // 将通过 useEffect 跳转到 dashboard
  }

  return <>{children}</>;
};
