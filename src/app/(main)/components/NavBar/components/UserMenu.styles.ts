import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Avatar, Box, Typography } from '@mui/material';
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
