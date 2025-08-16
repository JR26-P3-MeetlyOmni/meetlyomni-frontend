//想把AuthLayout 定义放在这个文件里，并且让login & singup页面都继承这个布局
//layout 默认是SSR, 但因为MUI的styled API 依赖于：
// 1. Emotion Runtime: 需要在客户端执行
// 2. theme context: 需要访问MUI Theme Provider
// 我有一把layout 改为CSR 是一个best practice吗？ 

'use client';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledAuthLayout = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.common.white,
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <StyledAuthLayout>{children}</StyledAuthLayout>;
}