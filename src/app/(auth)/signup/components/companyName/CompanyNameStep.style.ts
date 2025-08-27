'use client';

import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Wrapper = styled('section')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const TitleRow = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  flexWrap: 'nowrap',
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1.5),
  },
}));

export const TitleHighlight = styled('span')(({ theme }) => ({
  display: 'inline-block',
  padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  ...theme.typography.subtitle1,
  fontWeight: theme.typography.fontWeightBold,
  whiteSpace: 'nowrap',
  wordBreak: 'keep-all',
}));

export const TitleNormal = styled('span')(({ theme }) => ({
  ...theme.typography.h5,
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  whiteSpace: 'nowrap',
  wordBreak: 'keep-all',
  [theme.breakpoints.up('md')]: {
    ...theme.typography.h4,
  },
}));

export const FormWrap = styled('form')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
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
  ...theme.typography.subtitle1,
  color: theme.palette.text.secondary,
}));

export const CompanyInput = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-root': {
    ...theme.typography.h5,
    fontWeight: theme.typography?.fontWeightLight ?? theme.typography.fontWeightLight,
    paddingBlock: theme.spacing(1.25),
    [theme.breakpoints.up('md')]: {
      ...theme.typography.h4,
      paddingBlock: theme.spacing(1.5),
    },
  },
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.grey[400],
    opacity: 1,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderWidth: 0,
    borderLeftWidth: 6,
    borderLeftColor: theme.palette.primary.main,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderLeftColor: theme.palette.primary.dark,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderLeftColor: theme.palette.primary.main,
  },
}));

export const ErrorText = styled('div')(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.error.main,
}));

export const NextButton = styled(Button)(({ theme }) => ({
  minWidth: theme.spacing(24),
  paddingBlock: theme.spacing(1.5),
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.up('md')]: {
    minWidth: theme.spacing(30),
    paddingBlock: theme.spacing(2),
  },
}));
