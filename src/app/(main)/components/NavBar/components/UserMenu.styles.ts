import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const UserMenuWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
}));

export const UserName = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
}));

export const DropdownIcon = styled(ArrowDropDownIcon)<{ isOpen?: boolean }>(
  ({ theme, isOpen }) => ({
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  }),
);

export const DropdownMenu = styled(Paper)<{ isOpen?: boolean }>(({ theme, isOpen }) => ({
  position: 'absolute',
  top: '100%',
  right: 0,
  minWidth: theme.spacing(20),
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.body2.fontSize,
  fontFamily: 'var(--font-roboto)',
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  zIndex: theme.zIndex.modal,
  marginTop: theme.spacing(0.5),
  opacity: isOpen ? 1 : 0,
  transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(-10px)',
  transition: theme.transitions.create(['opacity', 'transform'], {
    duration: theme.transitions.duration.short,
    easing: theme.transitions.easing.easeOut,
  }),
  pointerEvents: isOpen ? 'auto' : 'none',
}));

export const DropdownMenuItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));
