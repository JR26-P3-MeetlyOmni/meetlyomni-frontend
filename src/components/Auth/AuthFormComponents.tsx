'use client';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 'clamp(320px, 45vw, 520px)',
  padding: 'clamp(16px, 3vw, 24px)',
  backgroundColor: theme.palette.background.paper,
  borderRadius: Number(theme.shape.borderRadius) * 2.5,
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(16px, 2.5vw, 28px)',
  position: 'relative',
  zIndex: 15,
  margin: '0 auto',
  transform: 'translateY(15vh)',
}));

export const FormTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(22px, 34px, 45px)',
  fontWeight: 700,
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.primary,
  textAlign: 'center',
  marginBottom: 'clamp(12px, 2.5vw, 24px)',
  lineHeight: 1.2,
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    fontSize: 'clamp(14px, 1.8vw, 18px)',
    minHeight: 'clamp(12px, 2vw, 28px)',
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.divider,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.divider,
    },
  },
  '& .MuiInputBase-input': {
    fontSize: 'clamp(14px, 1.8vw, 18px)',
    padding: 'clamp(8px, 2vw, 12px) clamp(10px, 2.4vw, 16px)',
  },
  '& input::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 1,
    fontSize: 'clamp(13px, 1.7vw, 16px)',
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgb(20,24,59)',
  color: '#FFFFFF',
  minHeight: 'clamp(40px, 6vw, 56px)',
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontSize: 'clamp(14px, 1.8vw, 18px)',
  fontWeight: theme.typography.button.fontWeight,
  padding: 'clamp(8px, 2vw, 12px) clamp(16px, 4vw, 28px)',
  '&:hover': {
    backgroundColor: 'rgb(16,20,47)',
  },
  '&:disabled': {
    backgroundColor: theme.palette.grey[300],
  },
}));

export const SectionLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.primary,
  fontSize: 'clamp(13px, 2.2vw, 15px)',
  [theme.breakpoints.up('sm')]: {
    fontSize: '14px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '15px',
  },
}));

export const StyledSectionLabel = styled(SectionLabel)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const StyledSubmitButton = styled(SubmitButton)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
