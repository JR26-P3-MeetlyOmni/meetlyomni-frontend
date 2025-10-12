import { Avatar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CardRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    boxShadow: theme.shadows[1],
  },
}));

export const Cover = styled('img')(({ theme }) => ({
  width: theme.spacing(25), // 200px
  height: theme.spacing(15), // 120px
  objectFit: 'cover',
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.grey[100],
  flexShrink: 0,
  [theme.breakpoints.down('md')]: {
    width: theme.spacing(20), // 160px
    height: theme.spacing(12), // 96px
  },
  [theme.breakpoints.down('sm')]: {
    width: theme.spacing(15), // 120px
    height: theme.spacing(9), // 72px
  },
}));

export const Middle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  flex: 1,
  minWidth: 0,
}));

export const TitleRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  margin: 0,
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical' as const,
}));

export const Desc = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  margin: 0,
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical' as const,
}));

export const CreatorRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const CreatorAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(3), // 24px
  height: theme.spacing(3),
}));

export const Right = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const Actions = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const PlayCountText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  minWidth: theme.spacing(10), // ~80px
  textAlign: 'right',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));
