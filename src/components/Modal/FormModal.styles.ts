import { Box } from '@mui/material';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1),
  },
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingRight: theme.spacing(1),
  fontSize: theme.typography.h6.fontSize,
  fontFamily: 'var(--font-roboto)',
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: theme.spacing(3),
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  borderRadius: '50%',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
}));

export const ButtonGroupWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginRight: theme.spacing(2),
  gap: theme.spacing(2),

  '& > button': {
    width: theme.spacing(4),
  },
}));
