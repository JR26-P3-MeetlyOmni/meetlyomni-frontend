'use client';

import { Link as NextLink } from '@/i18n/navigation';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import type { FC } from 'react';
import { useCallback, useState } from 'react';

import DescriptionIcon from '@mui/icons-material/Description';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Main container
const LoginContainer = styled(Box)(() => ({
  minHeight: '100vh',
  backgroundColor: '#ffffff',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

// Background decorative patterns
const BackgroundPattern = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `
    radial-gradient(circle at 20% 80%, rgba(240, 240, 240, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(240, 240, 240, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(240, 240, 240, 0.2) 0%, transparent 50%)
  `,
  pointerEvents: 'none',
}));

// Logo section
const LogoSection = styled(Box)(() => ({
  position: 'absolute',
  top: 40,
  left: 60,
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  zIndex: 10,
}));

const LogoIcon = styled(Box)(() => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: '#2196F3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  fontSize: 16,
  fontWeight: 'bold',
}));

const LogoText = styled(Typography)(() => ({
  fontSize: 24,
  fontWeight: 600,
  color: '#1a1a1a',
  fontFamily: 'Roboto, sans-serif',
}));

// Main content area
const MainContent = styled(Container)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '600px',
  zIndex: 5,
  position: 'relative',
}));

// Title section
const TitleContainer = styled(Box)(() => ({
  textAlign: 'center',
  marginBottom: 48,
}));

const WelcomeTitle = styled(Box)(() => ({
  display: 'inline-block',
  backgroundColor: '#3f7cff',
  color: '#ffffff',
  padding: '4px 12px',
  borderRadius: 2,
  fontSize: 28,
  fontWeight: 700,
  fontFamily: 'Roboto, sans-serif',
  marginRight: 8,
  lineHeight: 1.2,
}));

const SubTitle = styled(Typography)(() => ({
  display: 'inline',
  fontSize: 28,
  fontWeight: 600,
  color: '#1a1a1a',
  fontFamily: 'Roboto, sans-serif',
}));

// Login form
const LoginForm = styled(Paper)(() => ({
  width: '100%',
  maxWidth: 400,
  padding: 32,
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  backgroundColor: '#ffffff',
}));

const FormField = styled(Box)(() => ({
  marginBottom: 24,
}));

const FieldLabel = styled(Typography)(() => ({
  fontSize: 14,
  fontWeight: 500,
  color: '#1a1a1a',
  marginBottom: 8,
  fontFamily: 'Roboto, sans-serif',
}));

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    '& fieldset': {
      borderColor: '#e0e0e0',
      borderWidth: 1,
    },
    '&:hover fieldset': {
      borderColor: '#bdbdbd',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2196F3',
    },
    '&.Mui-error fieldset': {
      borderColor: '#f44336',
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px 16px',
    fontSize: 14,
    fontFamily: 'Roboto, sans-serif',
    color: '#1a1a1a',
    '&::placeholder': {
      color: '#9e9e9e',
      opacity: 1,
    },
  },
  '& .MuiFormHelperText-root': {
    fontSize: 12,
    marginLeft: 0,
    marginTop: 4,
    '&.Mui-error': {
      color: '#f44336',
    },
  },
}));

const ForgotPasswordLink = styled(Link)(() => ({
  fontSize: 14,
  color: '#2196F3',
  textDecoration: 'none',
  fontFamily: 'Roboto, sans-serif',
  display: 'block',
  marginBottom: 24,
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const SignInButton = styled(Button)(() => ({
  width: '100%',
  height: 48,
  backgroundColor: '#1a237e',
  color: '#ffffff',
  fontSize: 16,
  fontWeight: 500,
  borderRadius: 8,
  textTransform: 'none',
  fontFamily: 'Roboto, sans-serif',
  marginBottom: 24,
  '&:hover': {
    backgroundColor: '#0d1757',
  },
  '&:disabled': {
    backgroundColor: '#e0e0e0',
    color: '#9e9e9e',
  },
}));

const SignUpSection = styled(Box)(() => ({
  textAlign: 'center',
}));

const SignUpText = styled(Typography)(() => ({
  fontSize: 14,
  color: '#757575',
  fontFamily: 'Roboto, sans-serif',
  display: 'inline',
  marginRight: 4,
}));

const SignUpLink = styled(Link)(() => ({
  fontSize: 14,
  color: '#2196F3',
  textDecoration: 'none',
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 500,
  '&:hover': {
    textDecoration: 'underline',
  },
}));

// Third-party login components
const OrDivider = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  margin: '24px 0',
  '&::before, &::after': {
    content: '""',
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  '&::before': {
    marginRight: 16,
  },
  '&::after': {
    marginLeft: 16,
  },
}));

const OrText = styled(Typography)(() => ({
  fontSize: 14,
  color: '#9e9e9e',
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 400,
}));

const ThirdPartyButton = styled(Button)(() => ({
  width: '100%',
  height: 48,
  backgroundColor: '#ffffff',
  color: '#424242',
  fontSize: 14,
  fontWeight: 500,
  borderRadius: 8,
  textTransform: 'none',
  fontFamily: 'Roboto, sans-serif',
  border: '1px solid #e0e0e0',
  marginBottom: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  '&:hover': {
    backgroundColor: '#f5f5f5',
    borderColor: '#bdbdbd',
  },
}));

const ThirdPartyIcon = styled(Box)(() => ({
  width: 20,
  height: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Decorative elements
const RachelCard = styled(Box)(() => ({
  position: 'absolute',
  top: 120,
  right: 80,
  zIndex: 10,
}));

const UserCard = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#f44336',
  borderRadius: 12,
  padding: '12px 16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: -8,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: '8px 8px 8px 0',
    borderColor: 'transparent #f44336 transparent transparent',
  },
}));

const UserAvatar = styled(Box)(() => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  marginRight: 12,
  overflow: 'hidden',
}));

const UserInfo = styled(Box)(() => ({
  color: '#ffffff',
}));

const UserName = styled(Typography)(() => ({
  fontSize: 16,
  fontWeight: 600,
  fontFamily: 'Roboto, sans-serif',
  lineHeight: 1,
  marginBottom: 4,
}));

const UserRole = styled(Typography)(() => ({
  fontSize: 12,
  fontWeight: 400,
  fontFamily: 'Roboto, sans-serif',
  opacity: 0.9,
}));

const MarkCard = styled(Box)(() => ({
  position: 'absolute',
  bottom: 100,
  left: 60,
  zIndex: 10,
}));

const MarkUserCard = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#ff9800',
  borderRadius: 12,
  padding: '12px 16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    right: -8,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: '8px 0 8px 8px',
    borderColor: 'transparent transparent transparent #ff9800',
  },
}));

const SearchIcon = styled(Box)(() => ({
  position: 'absolute',
  left: 120,
  top: '50%',
  transform: 'translateY(-50%)',
  width: 60,
  height: 60,
  borderRadius: '50%',
  backgroundColor: '#f5f5f5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 8,
}));

const SearchBox = styled(Box)(() => ({
  position: 'absolute',
  right: 80,
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
  borderRadius: 8,
  padding: '8px 12px',
  gap: 8,
  zIndex: 8,
}));

const SearchText = styled(Typography)(() => ({
  fontSize: 14,
  color: '#757575',
  fontFamily: 'Roboto, sans-serif',
}));

const StarIcon = styled(Box)(() => ({
  position: 'absolute',
  bottom: 80,
  right: 80,
  width: 50,
  height: 50,
  borderRadius: '50%',
  backgroundColor: '#f5f5f5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 8,
}));

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginPage: FC = () => {
  const t = useTranslations('login');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateEmail]);

  const handleInputChange = useCallback(
    (field: keyof FormData) => {
      return (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));

        if (errors[field]) {
          setErrors(prev => ({ ...prev, [field]: undefined }));
        }
      };
    },
    [errors],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Login attempt:', { email: formData.email });
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, validateForm],
  );

  const handleGoogleLogin = useCallback(() => {
    console.log('Google login clicked');
    // TODO: Implement Google OAuth
  }, []);

  const handleMicrosoftLogin = useCallback(() => {
    console.log('Microsoft login clicked');
    // TODO: Implement Microsoft OAuth
  }, []);

  return (
    <LoginContainer>
      <BackgroundPattern />

      {/* Logo */}
      <LogoSection>
        <Image
          src="/assets/images/sign-in/logo.png"
          alt="Omni Logo"
          width={96}
          height={32}
        />
      </LogoSection>

      {/* Decorative Elements */}
      <RachelCard>
        <UserCard>
          <UserAvatar>
            <Image
              src="/assets/images/sign-in/user_avatar.png"
              alt="Rachel"
              width={40}
              height={40}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </UserAvatar>
          <UserInfo>
            <UserName>Rachel</UserName>
            <UserRole>Market Manager</UserRole>
          </UserInfo>
        </UserCard>
      </RachelCard>

      <MarkCard>
        <MarkUserCard>
          <UserAvatar>
            <Image
              src="/assets/images/sign-in/user_avatar.png"
              alt="Mark"
              width={40}
              height={40}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </UserAvatar>
          <UserInfo>
            <UserName>Mark</UserName>
            <UserRole>Operation Expert</UserRole>
          </UserInfo>
        </MarkUserCard>
      </MarkCard>

      <SearchIcon>
        <Image
          src="/assets/images/sign-in/magnifying_glass.png"
          alt="Search"
          width={30}
          height={30}
        />
      </SearchIcon>

      <SearchBox>
        <SearchText>I am looking for</SearchText>
        <DescriptionIcon sx={{ fontSize: 16, color: '#757575' }} />
      </SearchBox>

      <StarIcon>
        <Image src="/assets/images/sign-in/star.png" alt="Rating" width={28} height={28} />
      </StarIcon>

      {/* Main Content */}
      <MainContent>
        <TitleContainer>
          <WelcomeTitle>Welcome to Omni !</WelcomeTitle>
          <SubTitle>Let's Sign in Your Profile</SubTitle>
        </TitleContainer>

        <LoginForm>
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

          <SignInButton type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </SignInButton>

          <OrDivider>
            <OrText>or</OrText>
          </OrDivider>

          <ThirdPartyButton onClick={handleGoogleLogin}>
            <ThirdPartyIcon>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </ThirdPartyIcon>
            Sign in with Google
          </ThirdPartyButton>

          <ThirdPartyButton onClick={handleMicrosoftLogin}>
            <ThirdPartyIcon>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="10" height="10" fill="#f25022"/>
                <rect x="13" y="1" width="10" height="10" fill="#7fba00"/>
                <rect x="1" y="13" width="10" height="10" fill="#00a4ef"/>
                <rect x="13" y="13" width="10" height="10" fill="#ffb900"/>
              </svg>
            </ThirdPartyIcon>
            Sign in with Microsoft
          </ThirdPartyButton>

          <SignUpSection>
            <SignUpText>Don't have an account?</SignUpText>
            <NextLink href="/signup" passHref>
              <SignUpLink variant="body2">Sign up</SignUpLink>
            </NextLink>
          </SignUpSection>
          </form>
        </LoginForm>
      </MainContent>
    </LoginContainer>
  );
};

export default LoginPage;
