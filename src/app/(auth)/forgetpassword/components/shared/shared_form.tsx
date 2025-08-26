import { TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FormContainer = styled(Box)(({ theme }) => ({
  maxWidth: 460,
  width: '100%',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: Number(theme.shape.borderRadius) * 2.5,
  boxShadow: theme.shadows[1],
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  position: 'relative',
  zIndex: 10,
  margin: '0 auto',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5),
  },
}));

export const FormTitle = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 700,  
  color: theme.palette.text.primary,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    fontSize: '34px', 
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
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
  '& input::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 1,
    fontSize: theme.typography.body2.fontSize,
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgb(20,24,59)', 
  color: '#FFFFFF', 
  height: 38,
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontSize: theme.typography.button.fontSize,
  fontWeight: theme.typography.button.fontWeight,
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
}));

export const StyledSectionLabel = styled(SectionLabel)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const StyledSubmitButton = styled(SubmitButton)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
