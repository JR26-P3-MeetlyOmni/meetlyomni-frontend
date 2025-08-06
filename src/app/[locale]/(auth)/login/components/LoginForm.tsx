import { Link as NextLink } from '@/i18n/navigation';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import type { LoginFormHook } from '../types';
import { ThirdPartyButtons } from './ThirdPartyButtons';

const LoginFormContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1.5),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  backgroundColor: '#ffffff',
}));

const FormField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
  fontFamily: 'Roboto, sans-serif',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    borderRadius: theme.spacing(1),
    '& fieldset': {
      borderColor: theme.palette.grey[300],
      borderWidth: 1,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.grey[400],
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const SignInButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  color: '#ffffff',
  fontFamily: 'Roboto, sans-serif',
  fontSize: 14,
  fontWeight: 500,
  borderRadius: theme.spacing(0.75),
  height: 38,
  textTransform: 'none',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.08)',
  '&:hover': {
    backgroundColor: theme.palette.text.primary,
    opacity: 0.9,
  },
  '&:disabled': {
    backgroundColor: theme.palette.grey[400],
  },
}));

const ForgotPasswordLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontFamily: 'Roboto, sans-serif',
  fontSize: 14,
  fontWeight: 500,
  textDecoration: 'none',
  alignSelf: 'flex-start',
  marginBottom: theme.spacing(2),
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const OrDivider = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: theme.spacing(2, 0),
  '&::before, &::after': {
    content: '""',
    flex: 1,
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
}));

const OrText = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  color: theme.palette.grey[600],
  fontSize: 14,
  fontFamily: 'Roboto, sans-serif',
}));

const SignUpSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  justifyContent: 'center',
  marginTop: theme.spacing(2),
}));

const SignUpText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto, sans-serif',
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.grey[600],
}));

const SignUpLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontFamily: 'Roboto, sans-serif',
  fontSize: 14,
  fontWeight: 500,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

interface LoginFormProps {
  formHook: LoginFormHook;
}

export const LoginForm: React.FC<LoginFormProps> = ({ formHook }) => {
  const { formData, errors, isLoading, handleInputChange, handleSubmit } = formHook;

  return (
    <LoginFormContainer>
      <form onSubmit={handleSubmit}>
        <FormField>
          <FieldLabel>Email</FieldLabel>
          <StyledTextField
            placeholder="Email Address"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleInputChange('email')}
            error={!!errors.email}
            helperText={errors.email}
          />
        </FormField>

        <FormField>
          <FieldLabel>Password</FieldLabel>
          <StyledTextField
            placeholder="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleInputChange('password')}
            error={!!errors.password}
            helperText={errors.password}
          />
        </FormField>

        <ForgotPasswordLink href="#" variant="body2">
          Forgot Password?
        </ForgotPasswordLink>

        <SignInButton type="submit" disabled={isLoading} fullWidth>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </SignInButton>

        <OrDivider>
          <OrText>or</OrText>
        </OrDivider>

        <ThirdPartyButtons />

        <SignUpSection>
          <SignUpText>Don&apos;t have an account?</SignUpText>
          <NextLink href="/signup" passHref>
            <SignUpLink variant="body2">Sign up</SignUpLink>
          </NextLink>
        </SignUpSection>
      </form>
    </LoginFormContainer>
  );
};
