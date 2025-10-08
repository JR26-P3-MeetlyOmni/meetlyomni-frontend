import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Box)(({ theme: _theme }) => ({
  minHeight: 'calc(100vh - 80px)',
  padding: _theme.spacing(3),
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

export const StyledTitleBox = styled(Box)(({ theme: _theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: _theme.spacing(1),
  marginBottom: _theme.spacing(3),
}));

export const Spacer = styled('div')(() => ({
  flex: 1,
}));

export const StyledTitle = styled(Typography)(({ theme: _theme }) => ({
  color: _theme.palette.text.primary,
  fontWeight: 'bold',
}));

export const StyledNavBox = styled(Box)(({ theme: _theme }) => ({
  marginBottom: _theme.spacing(3),
  display: 'flex',
  gap: _theme.spacing(1),
}));

export const StyledNavButton = styled(Button)(({ theme: _theme }) => ({
  textTransform: 'none',
  backgroundColor: 'transparent',
  borderColor: _theme.palette.grey[300],
  color: _theme.palette.text.primary,
  fontWeight: 'normal',
  '&:hover': {
    backgroundColor: _theme.palette.grey[900],
    color: _theme.palette.common.white,
    borderColor: _theme.palette.grey[900],
  },
}));

export const Content = styled(Box)(({ theme: _theme }) => ({
  flex: 1,
}));
