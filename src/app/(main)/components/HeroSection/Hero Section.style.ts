import { Box, Button, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

export const HeroSectionWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(10, 4),
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  maxWidth: theme.breakpoints.values.md,
  width: '100%',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const HeroTitle = styled(Typography)(({ theme }) => ({
  maxWidth: '100%',
  fontWeight: theme.typography.fontWeightBold,
  fontFamily: 'var(--font-roboto)',
  fontSize: theme.typography.h2.fontSize,
  lineHeight: theme.typography.h2.lineHeight,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    fontSize: theme.typography.h3.fontSize,
    width: '100%',
    marginBottom: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.h3.fontSize,
    width: '100%',
    marginBottom: theme.spacing(3),
  },
}));

export const HeroDescription = styled(Typography)(({ theme }) => ({
  maxWidth: theme.spacing(90),
  fontFamily: 'var(--font-roboto)',
  fontSize: theme.typography.subtitle1.fontSize,
  lineHeight: theme.typography.h2.lineHeight,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down('md')]: {
    width: '100%',
    fontSize: theme.typography.body1.fontSize,
    marginBottom: theme.spacing(6),
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4),
  },
}));

export const HeroCTAWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3.75),
  flexWrap: 'wrap',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(10),
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(6),
    gap: theme.spacing(2),
  },
}));

export const CTAButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: theme.typography.h6.fontSize,
  width: theme.spacing(23),
  height: theme.spacing(7),
  padding: theme.spacing(3, 2.5),
  borderRadius: theme.spacing(1),
  letterSpacing: 0.5,
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&.MuiButton-contained': {
    backgroundColor: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: alpha(theme.palette.text.primary, 0.8),
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[2],
    },
  },
  '&.MuiButton-outlined': {
    borderWidth: 2,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.disabled,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.dark, 0.08),
      transform: 'translateY(-2px)',
      borderWidth: 1,
    },
  },
}));
