'use client';

import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Wrapper = styled('main')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  paddingTop: theme.spacing(12),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
}));

export const TitleBlock = styled('div')(({ theme }) => ({
  maxWidth: theme.spacing(130),
  marginBottom: theme.spacing(6),
}));

export const Title = styled('h1')(({ theme }) => ({
  margin: 0,
  ...theme.typography.h4,
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
}));

export const SubTitle = styled('p')(({ theme }) => ({
  margin: `${theme.spacing(1)} 0 0`,
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

export const FormWrap = styled('form')(({ theme }) => ({
  width: '100%',
  maxWidth: theme.spacing(140),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

export const FieldWrap = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: theme.spacing(90),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const Label = styled('label')(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
}));

export const BigInput = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-root': {
    ...theme.typography.h3,
    fontWeight: theme.typography.fontWeightLight,
    paddingBlock: theme.spacing(1.5),
  },
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.grey[400],
    opacity: 1,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderWidth: 1,
    borderLeftWidth: 6,
    borderColor: theme.palette.divider,
    borderLeftColor: theme.palette.grey[300],
  },
  '& .MuiOutlinedInput-root.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    borderLeftColor: theme.palette.primary.main,
  },
  '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.error.main,
    borderLeftColor: theme.palette.error.main,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderLeftColor: theme.palette.grey[400],
  },
}));

export const ErrorText = styled('div')(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.error.main,
}));

export const Actions = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

export const NextButton = styled(Button)(({ theme }) => ({
  minWidth: theme.spacing(30),
  paddingBlock: theme.spacing(2),
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius,
}));

export const BackButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  paddingInline: theme.spacing(3),
  paddingBlock: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
}));
