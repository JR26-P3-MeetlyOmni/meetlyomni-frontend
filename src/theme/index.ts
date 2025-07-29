import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#14183b', // main text color
    },
    secondary: {
      main: '#b0b5bc', // secondary text color
    },
    background: {
      default: '#ffffff', // page background color
      paper: '#000000', // card background color
    },
    text: {
      primary: '#14183b', // main text color
      secondary: '#b0b5bc', // secondary text color
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
