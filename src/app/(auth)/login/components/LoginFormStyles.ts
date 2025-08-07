import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export const LoginFormContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.background.paper,
}));

export const FormField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const FieldLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    '& fieldset': {
      borderColor: theme.palette.divider,
      borderWidth: 1,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.action.hover,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const SignInButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  ...theme.typography.button,
  borderRadius: theme.shape.borderRadius,
  height: 38,
  textTransform: 'none',
  boxShadow: theme.shadows[1],
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}));

export const ForgotPasswordLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  ...theme.typography.body2,
  fontWeight: theme.typography.fontWeightMedium,
  textDecoration: 'none',
  alignSelf: 'flex-start',
  marginBottom: theme.spacing(2),
  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.primary.dark,
  },
}));

export const OrDivider = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: theme.spacing(2, 0),
  '&::before, &::after': {
    content: '""',
    flex: 1,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export const OrText = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  color: theme.palette.text.secondary,
  ...theme.typography.body2,
}));

export const SignUpSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  justifyContent: 'center',
  marginTop: theme.spacing(2),
}));

export const SignUpText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  fontWeight: theme.typography.fontWeightRegular,
  color: theme.palette.text.secondary,
}));

export const SignUpLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  ...theme.typography.body2,
  fontWeight: theme.typography.fontWeightMedium,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.primary.dark,
  },
}));

export const MessageContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));
