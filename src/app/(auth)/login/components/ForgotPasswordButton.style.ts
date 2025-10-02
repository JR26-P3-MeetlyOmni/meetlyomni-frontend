import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Row = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  marginTop: theme.spacing(2),
}));

export const FPButton = styled(Button)<{ component?: React.ElementType; href?: string }>(
  ({ theme }) => ({
    textTransform: 'none',
    padding: theme.spacing(0.5, 1),
    minWidth: 0,
  }),
);
