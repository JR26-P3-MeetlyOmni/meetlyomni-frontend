'use client';

import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // 更深的蓝色
    },
    secondary: {
      main: '#f50057', // 粉色
    },
    background: {
      default: '#ffffff', // 纯白色背景
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a', // 更深的黑色文字
      secondary: '#666666', // 中灰色次要文字
    },
    divider: '#e0e0e0', // 浅灰色分割线
  },
  typography: {
    fontFamily: 'var(--font-roboto), Roboto, "Helvetica Neue", Arial, sans-serif',
    h3: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.875rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.375rem',
      lineHeight: 1.4,
      letterSpacing: '0',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
      letterSpacing: '0',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: 400,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 400,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 6, // 稍微圆润的边角
  },
  spacing: 8, // 基础间距单位
});

interface MUIProviderProps {
  children: React.ReactNode;
}

const MUIProvider: React.FC<MUIProviderProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MUIProvider;
