import { Avatar, Box, Button, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

export const StickyNavbarWrapper = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  width: '100%',
  padding: theme.spacing(2, 4),
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  zIndex: theme.zIndex.appBar,
  marginBottom: theme.spacing(10),
  transition: theme.transitions.create(['background-color', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&.scrolled': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
  },
}));

export const LogoWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  gap: theme.spacing(1.5),
  marginLeft: theme.spacing(20),
  '& img': {
    width: theme.spacing(16),
    height: theme.spacing(4.5),
    objectFit: 'contain',
    transition: theme.transitions.create('width'),
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: theme.spacing(2),
    '& img': {
      width: theme.spacing(14),
    },
  },
}));

export const NavLinksWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(4),
  marginLeft: 'auto',
  marginRight: theme.spacing(7),
  [theme.breakpoints.down('md')]: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(6),
  },
}));

export const NavLink = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(2),
  fontFamily: 'var(--font-roboto)',
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  position: 'relative',
  display: 'inline-block',
  paddingBottom: theme.spacing(1),
  '&:hover::after': {
    content: '""',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 0,
    width: '40%',
    height: 2,
    backgroundColor: theme.palette.primary.main,
    transition: 'transform 0.3s ease, width 0.2s ease',
  },
}));

export const ButtonGroupWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.25),
  marginRight: theme.spacing(20),
  [theme.breakpoints.down('md')]: {
    marginRight: theme.spacing(2),
  },
}));

export const CTAButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: theme.spacing(1.75),
  fontFamily: 'var(--font-roboto)',
  fontWeight: theme.typography.fontWeightRegular,
  width: theme.spacing(13),
  height: theme.spacing(4.75),
  padding: theme.spacing(1.25),
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

export const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
}));
