import React from 'react';

import { TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.75),
  textAlign: 'left',
}));

const StyledTextField = styled(TextField, {
  shouldForwardProp: prop => prop !== 'hasError',
})<{ hasError: boolean }>(({ hasError, theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    '& fieldset': {
      borderColor: hasError ? theme.palette.error.main : theme.palette.grey[300],
    },
    '&:hover fieldset': {
      borderColor: hasError ? theme.palette.error.main : theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: hasError ? theme.palette.error.main : theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': { display: 'none' },
  '& .MuiInputBase-input': { ...theme.typography.body2 },
  marginBottom: theme.spacing(1),
}));

interface FormInputProps {
  label: string;
  value: string;
  hasError: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  type?: string;
  id: string;
  name: string;
  placeholder: string;
  autoComplete: string;
  autoFocus?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  hasError,
  onChange,
  onBlur,
  type = 'text',
  id,
  name,
  placeholder,
  autoComplete,
  autoFocus = false,
}) => (
  <>
    <StyledLabel>{label}</StyledLabel>
    <StyledTextField
      required
      fullWidth
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={hasError}
      placeholder={placeholder}
      hasError={hasError}
    />
  </>
);

interface EmailInputProps {
  value: string;
  hasError: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const EmailInput: React.FC<EmailInputProps> = ({ value, hasError, onChange, onBlur }) => (
  <FormInput
    label="Email"
    value={value}
    hasError={hasError}
    onChange={onChange}
    onBlur={onBlur}
    id="email"
    name="email"
    placeholder="Email Address"
    autoComplete="email"
  />
);

interface PasswordInputProps {
  value: string;
  hasError: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  hasError,
  onChange,
  onBlur,
}) => (
  <FormInput
    label="Password"
    value={value}
    hasError={hasError}
    onChange={onChange}
    onBlur={onBlur}
    type="password"
    id="password"
    name="password"
    placeholder="Password"
    autoComplete="current-password"
  />
);
