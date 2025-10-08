import { styled } from '@mui/material/styles';

export const ListRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  width: '100%',
}));

export const EmptyWrap = styled('div')(({ theme }) => ({
  padding: theme.spacing(6, 0),
}));
