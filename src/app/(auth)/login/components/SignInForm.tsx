import { InternalLink } from '@/components/Link/Link';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { EmailFieldProps, PasswordFieldProps, SignInFormProps } from '../types';

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
    color: theme.palette.action.disabled,
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

const EmailField: React.FC<EmailFieldProps> = ({ value, error, showError, onChange, onBlur }) => (
  <>
    <FieldLabel>Email</FieldLabel>
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
      error={showError ? Boolean(error) : false}
      placeholder="Email Address"
      InputLabelProps={{ shrink: false }}
    />
    {showError && Boolean(error) ? <HelperText>{error}</HelperText> : null}
  </>
);

const PasswordField: React.FC<PasswordFieldProps> = ({
  value,
  error,
  showError,
  onChange,
  onBlur,
}) => (
  <>
    <FieldLabel variant="body2">Password</FieldLabel>
    <StyledTextField
      required
      fullWidth
      name="password"
      type="password"
      id="password"
      autoComplete="current-password"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={showError ? Boolean(error) : false}
      placeholder="Password"
      InputLabelProps={{ shrink: false }}
    />
    {showError && Boolean(error) ? <HelperText variant="body2">{error}</HelperText> : null}
  </>
);

export const SignInForm: React.FC<SignInFormProps> = ({
  formData,
  errors,
  isSubmitting,
  hasSubmitted,
  handleInputChange,
  handleInputBlur,
  handleSubmit,
}) => {
  const createFieldHandler = (field: string) => ({
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(field, e.target.value),
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => handleInputBlur(field, e.target.value),
  });

  return (
    <FormRoot onSubmit={handleSubmit}>
      {hasSubmitted && Boolean(errors.auth) ? (
        <HelperText variant="body2" style={{ marginBottom: '16px' }}>
          {errors.auth}
        </HelperText>
      ) : null}

      <EmailField
        value={formData.email}
        error={errors.email}
        showError={hasSubmitted}
        {...createFieldHandler('email')}
      />

      <PasswordField
        value={formData.password}
        error={errors.password}
        showError={hasSubmitted}
        {...createFieldHandler('password')}
      />

      <ForgotWrapper>
        <InternalLink href="/PasswordReset" className="password-reset">
          Forgot Password ?
        </InternalLink>
      </ForgotWrapper>

      <PrimaryButton type="submit" variant="contained" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </PrimaryButton>

      <BottomRow>
        <BottomText variant="body2">Don&apos;t have an account?</BottomText>
        <InternalLink href="/signup"> Sign up</InternalLink>
      </BottomRow>
    </FormRoot>
  );
};
