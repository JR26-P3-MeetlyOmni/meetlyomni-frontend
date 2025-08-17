import { InternalLink } from '@/components/Link/Link';

import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { FieldProps, SignInFormProps } from '../types';

const FormContainer = styled('form')(({ theme }) => ({
  maxWidth: theme.spacing(51.5),
  marginLeft: 'auto',
  marginRight: 'auto',
}));

const FormField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  '& .MuiOutlinedInput-root': {
    borderRadius: Number(theme.shape.borderRadius) * 2,
    backgroundColor: theme.palette.common.white,
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-error fieldset': {
      borderColor: theme.palette.error.main,
    },
    '&.Mui-error:hover fieldset': {
      borderColor: theme.palette.error.main,
    },
    '&.Mui-error.Mui-focused fieldset': {
      borderColor: theme.palette.error.main,
    },
  },
  '& .MuiInputBase-input': {
    fontSize: theme.typography.body2.fontSize,
  },
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(14),
  lineHeight: theme.typography.body1.lineHeight,
  textAlign: 'left',
  marginBottom: theme.spacing(0.75),
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: theme.typography.pxToRem(12),
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(1),
  textAlign: 'left',
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  width: theme.spacing(51.5),
  height: theme.spacing(4.75),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(1.5, 0),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.primary.main,
  textTransform: 'none',
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}));

const ActionRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  '&.forgotPW-link': {
    justifyContent: 'flex-start',
    marginBottom: theme.spacing(2),
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-roboto)',
      fontSize: theme.typography.body2.fontSize,
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  '& .signup-text': {
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    fontFamily: 'var(--font-roboto)',
    fontSize: theme.typography.pxToRem(14),
  },
}));

const Field: React.FC<FieldProps> = ({
  type,
  label,
  placeholder,
  value,
  error,
  showError,
  onChange,
  onBlur,
}) => (
  <>
    <FieldLabel>{label}</FieldLabel>
    <FormField
      required
      fullWidth
      id={type}
      name={type}
      type={type}
      autoComplete={type === 'email' ? 'email' : 'current-password'}
      autoFocus={type === 'email'}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={showError ? Boolean(error) : false}
      placeholder={placeholder}
      InputLabelProps={{ shrink: false }}
    />
    {showError && Boolean(error) ? <ErrorText>{error}</ErrorText> : null}
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
    <FormContainer onSubmit={handleSubmit}>
      {hasSubmitted && Boolean(errors.auth) ? (
        <ErrorText style={{ marginBottom: '16px' }}>{errors.auth}</ErrorText>
      ) : null}

      <Field
        type="email"
        label="Email"
        placeholder="Email Address"
        value={formData.email}
        error={errors.email}
        showError={hasSubmitted}
        {...createFieldHandler('email')}
      />

      <Field
        type="password"
        label="Password"
        placeholder="Password"
        value={formData.password}
        error={errors.password}
        showError={hasSubmitted}
        {...createFieldHandler('password')}
      />

      <ActionRow className="forgotPW-link">
        <InternalLink href="/PasswordReset">Forgot Password ?</InternalLink>
      </ActionRow>

      <SubmitButton type="submit" variant="contained" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </SubmitButton>

      <ActionRow>
        <Typography className="signup-text">Don&apos;t have an account?</Typography>
        <InternalLink href="/signup"> Sign up</InternalLink>
      </ActionRow>
    </FormContainer>
  );
};
