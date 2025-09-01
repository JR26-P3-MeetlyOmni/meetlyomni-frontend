'use client';

import { Box, Container, styled, Typography } from '@mui/material';

const BackgroundDecoration = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  height: '100%',
  opacity: 0.5,
  backgroundImage: 'linear-gradient(to bottom, #f0f0f1, #dcdddf4c 30%)',
  zIndex: -1, // Ensure it's behind content
  pointerEvents: 'none', // Don't interfere with interactions
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    height: '100%',
  },
}));
export const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  minHeight: '100vh',
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  maxWidth: theme.spacing(70),
  width: 'auto',
  height: 'auto',
  margin: '0 auto 0',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: theme.typography.pxToRem(56),
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: 1.2,
  textAlign: 'center',
  color: theme.palette.text.primary,
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('md')]: {
    maxWidth: '90%',
    fontSize: theme.typography.pxToRem(48),
    whiteSpace: 'normal',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.pxToRem(36),
    whiteSpace: 'normal',
  },
}));

export const StyledSubtitle = styled(Typography)(({ theme }) => ({
  maxWidth: theme.spacing(80),
  width: 'auto',
  height: 'auto',
  margin: `${theme.spacing(2)} auto ${theme.spacing(10)}`,
  padding: `0 ${theme.spacing(2)}`,
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: 1.5,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  [theme.breakpoints.down('md')]: {
    maxWidth: '90%',
    padding: `0 ${theme.spacing(1)}`,
  },
}));

export default BackgroundDecoration;
