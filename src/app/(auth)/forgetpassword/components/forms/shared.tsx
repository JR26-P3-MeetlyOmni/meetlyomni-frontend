import { TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FormContainer = styled(Box)(({ theme }) => ({
  maxWidth: 460,
  width: '100%',
  padding: theme.spacing(4),
  backgroundColor: 'white',
  borderRadius: 20,
  boxShadow: '0px 1px 3px rgba(0,0,0,0.06)',
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

export const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    boxShadow: '0px 1px 3px rgba(0,0,0,0.06)',
    '& fieldset': {
      borderColor: 'rgb(220,221,223)',
    },
    '&:hover fieldset': {
      borderColor: 'rgb(220,221,223)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgb(220,221,223)',
    },
  },
  '& input::placeholder': {
    color: 'rgb(201,202,205)',
    opacity: 1,
    fontSize: 14,
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgb(20,24,59)',
  color: '#FFFFFF',
  height: 38,
  borderRadius: 6,
  textTransform: 'none',
  fontSize: 14,
  fontWeight: 500,
  '&:hover': {
    backgroundColor: 'rgb(16,20,47)',
  },
  '&:disabled': {
    backgroundColor: theme.palette.grey[300],
  },
}));

export const SectionLabel = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.text.primary,
}));


