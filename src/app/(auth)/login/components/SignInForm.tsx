import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SignInFormProps, EmailFieldProps, PasswordFieldProps } from '../types';
import { InternalLink } from '@/components/Link/Link';

const FormRoot = styled('form')(() => ({
  maxWidth: 412,
  marginLeft: 'auto',
  marginRight: 'auto',
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  fontSize: theme.typography.pxToRem(14),
  lineHeight: 1,
  textAlign: 'left',
  marginBottom: theme.spacing(0.75),
}));

const HelperText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: theme.typography.pxToRem(12),
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(1),
  textAlign: 'left',
}));

const ForgotWrapper = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  marginBottom: theme.spacing(2),
  '& .password-reset': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    cursor: 'pointer',
    fontfamily: 'var(--font-roboto)',
    fontSize: theme.typography.body2.fontSize,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  width: 412,
  height: 38,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(1.5, 0),
  borderRadius: 6,
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
  backgroundColor: '#14183b',
  textTransform: 'none',
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 500,
  color: theme.palette.common.white,
  '&:hover': { 
    backgroundColor: '#0f1228',
  },
  '&:disabled': { 
    backgroundColor: theme.palette.action.disabledBackground, 
    color: theme.palette.action.disabled 
  },
}));

const BottomRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
}));

const BottomText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  whiteSpace: 'nowrap',
  fontfamily: 'var(--font-roboto)',
  fontSize: theme.typography.pxToRem(14),  
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    backgroundColor: theme.palette.common.white,
    '& fieldset': { borderColor: theme.palette.divider },
    '&:hover fieldset': { borderColor: theme.palette.primary.main },
    '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
    '&.Mui-error fieldset': { borderColor: theme.palette.error.main },
    '&.Mui-error:hover fieldset': { borderColor: theme.palette.error.main },
    '&.Mui-error.Mui-focused fieldset': { borderColor: theme.palette.error.main },
  },
  '& .MuiInputBase-input': {
    fontSize: '0.9rem',
  },
  marginBottom: theme.spacing(1),
}));

const EmailField: React.FC<EmailFieldProps> = ({ value, error, onChange, onBlur }) => {
  const inputLabelProps = {
    shrink: false,
  };

  return (
    <>
      <FieldLabel variant="body2">Email</FieldLabel>
      <StyledTextField
        required
        fullWidth
        id="email"
        name="email"
        autoComplete="email"
        autoFocus
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        placeholder="Email Address"
        InputLabelProps={inputLabelProps}
      />
      {error ? <HelperText variant="body2">{error}</HelperText> : null}
    </>
  );
};

const PasswordField: React.FC<PasswordFieldProps> = ({ 
  value, 
  error, 
  showPassword, 
  onChange, 
  onBlur, 
  onToggleVisibility 
}) => {
  const renderEndAdornment = () => (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={onToggleVisibility}
        edge="end"
        color="default"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  const inputProps = {
    endAdornment: renderEndAdornment(),
  };

  const inputLabelProps = {
    shrink: false,
  };

  return (
    <>
      <FieldLabel variant="body2">Password</FieldLabel>
      <StyledTextField
        required
        fullWidth
        name="password"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        placeholder="Password"
        InputProps={inputProps}
        InputLabelProps={inputLabelProps}
      />
      {error ? <HelperText variant="body2">{error}</HelperText> : null}
    </>
  );
};

export const SignInForm: React.FC<SignInFormProps> = ({
  formData,
  errors,
  showPassword,
  isSubmitting,
  isFormValid,
  handleInputChange,
  handleInputBlur,
  handleSubmit,
  setShowPassword,
}) => {
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('email', e.target.value);
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleInputBlur('email', e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('password', e.target.value);
  };

  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleInputBlur('password', e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev: boolean) => !prev);
  };

  const emailFieldProps = {
    value: formData.email,
    error: errors.email,
    onChange: handleEmailChange,
    onBlur: handleEmailBlur,
  };

  const passwordFieldProps = {
    value: formData.password,
    error: errors.password,
    showPassword,
    onChange: handlePasswordChange,
    onBlur: handlePasswordBlur,
    onToggleVisibility: handleTogglePassword,
  };

  return (
    <FormRoot onSubmit={handleSubmit}>
      {errors.auth && (
        <HelperText variant="body2" style={{ marginBottom: '16px' }}>
          {errors.auth}
        </HelperText>
      )}
      
      <EmailField {...emailFieldProps} />

      <PasswordField {...passwordFieldProps} />

      <ForgotWrapper>
        <InternalLink href="/PasswordReset" className="password-reset">
          Forgot Password ?
        </InternalLink>
      </ForgotWrapper>

      <PrimaryButton type="submit" variant="contained" disabled={!isFormValid || isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </PrimaryButton>

      <BottomRow>
        <BottomText variant="body2">Don&apos;t have an account?</BottomText>
        <InternalLink href="/signup"> Sign up</InternalLink>
      </BottomRow>
    </FormRoot>
  );
};
