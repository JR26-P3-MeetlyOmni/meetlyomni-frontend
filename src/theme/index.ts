import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#14183b', // 主标题颜色
    },
    secondary: {
      main: '#b0b5bc', // 描述文字颜色
    },
    background: {
      default: '#ffffff', // 页面背景色
      paper: '#000000', // 卡片背景色
    },
    text: {
      primary: '#14183b', // 主标题颜色
      secondary: '#b0b5bc', // 描述文字颜色
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontFamily: 'Roboto',
      fontSize: '36px',
      fontWeight: 'bold',
      lineHeight: 'normal',
      color: '#14183b',
    },
    h2: {
      fontFamily: 'Roboto',
      fontSize: '36px',
      fontWeight: 'bold',
      lineHeight: 'normal',
      color: '#14183b',
    },
    h3: {
      fontFamily: 'Roboto',
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: 'normal',
      color: '#ffffff',
    },
    body1: {
      fontFamily: 'Roboto',
      fontSize: '16px',
      fontWeight: 'normal',
      lineHeight: 1.25,
      color: '#b0b5bc',
    },
    body2: {
      fontFamily: 'Roboto',
      fontSize: '13px',
      fontWeight: 'normal',
      lineHeight: 1.25,
      color: '#b0b5bc',
    },
  },
  spacing: (factor: number) => `${8 * factor}px`,
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1200,
      xl: 1600,
    },
  },
});

export default theme;
