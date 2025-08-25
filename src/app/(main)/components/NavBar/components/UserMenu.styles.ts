import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const UserMenuWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  padding: theme.spacing(0.5, 1),
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
}));

export const UserName = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
}));

export const DropdownIcon = styled(ArrowDropDownIcon)({});

export const DropdownMenu = styled(Paper)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.body2.fontSize,
  fontFamily: 'var(--font-roboto)',
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  zIndex: theme.zIndex.modal,
}));

export const DropdownMenuItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));
