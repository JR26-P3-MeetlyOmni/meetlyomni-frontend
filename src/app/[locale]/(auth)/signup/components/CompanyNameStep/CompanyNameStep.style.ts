// src/app/[locale]/(auth)/signup/components/CompanyNameStep/CompanyNameStep.style.ts
'use client';

import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

// src/app/[locale]/(auth)/signup/components/CompanyNameStep/CompanyNameStep.style.ts

// src/app/[locale]/(auth)/signup/components/CompanyNameStep/CompanyNameStep.style.ts

// src/app/[locale]/(auth)/signup/components/CompanyNameStep/CompanyNameStep.style.ts

// src/app/[locale]/(auth)/signup/components/CompanyNameStep/CompanyNameStep.style.ts

export const Wrapper = styled('main')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: theme.spacing(10),
}));

export const TitleRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(8),
}));

export const TitleHighlight = styled('span')(({ theme }) => ({
  display: 'inline-block',
  padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  ...theme.typography.h6,
  fontWeight: theme.typography.fontWeightBold,
}));

export const TitleNormal = styled('span')(({ theme }) => ({
  ...theme.typography.h4,
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
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
  maxWidth: theme.spacing(90), // 720px
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
    ...theme.typography.h3,
    fontWeight: theme.typography.fontWeightLight,
    paddingBlock: theme.spacing(1.5),
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
  minWidth: theme.spacing(30), // 240px
  paddingBlock: theme.spacing(2),
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius,
}));
