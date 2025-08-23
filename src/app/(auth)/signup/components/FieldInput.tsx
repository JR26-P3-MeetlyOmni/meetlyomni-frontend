'use client';

import * as React from 'react';

import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

type Kind = 'company' | 'email' | 'password';

type ValidatedInputProps = {
  kind: Kind;
  label: string;
  placeholder?: string;
  value?: string; // controlled input
  defaultValue?: string;
  onChange?: (val: string) => void;
  onValidChange?: (valid: boolean) => void;
  required?: boolean;
};

const Wrap = styled('div')(({ theme: _theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const Label = styled('label')(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.5),
}));

const FieldBox = styled('div', {
  shouldForwardProp: prop => prop !== '$barColor',
})<{ $barColor: string }>(({ theme, $barColor }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(1.5),
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 2,
    bottom: 2,
    width: 4,
    borderRadius: 2,
    background: $barColor,
    transition: 'background-color 500ms ease',
  },
}));

const BigInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  fontWeight: 600,
  fontSize: 36,
  lineHeight: 1.2,
  color: theme.palette.text.primary,
  padding: theme.spacing(0.5, 0),
  '& input::placeholder': {
    color: theme.palette.grey[400],
    opacity: 1,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 24,
  },
}));

const Errors = styled('ul')(({ theme }) => ({
  margin: theme.spacing(0.5, 0, 0),
  paddingLeft: theme.spacing(2.5),
  color: theme.palette.error.main,
  ...theme.typography.caption,
  listStyle: 'disc',
}));

function validateEmail(val: string): string[] {
  const errs: string[] = [];
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  if (!ok) errs.push('Please enter a valid email address.');
  return errs;
}

function validateCompany(val: string): string[] {
  const errs: string[] = [];
  if (val.length < 2 || val.length > 50) errs.push('Company name must be 2–50 characters.');
  const ok = /^[\p{L}\p{N}&.\-'\s]+$/u.test(val);
  if (!ok) errs.push("Only letters, numbers, spaces and & . - ' are allowed.");
  return errs;
}

function validatePassword(val: string): string[] {
  const errs: string[] = [];
  if (val.length < 8) errs.push('At least 8 characters.');
  if (!/[A-Z]/.test(val)) errs.push('Include an uppercase letter.');
  if (!/[a-z]/.test(val)) errs.push('Include a lowercase letter.');
  if (!/[0-9]/.test(val)) errs.push('Include a number.');
  if (!/[^\w\s]/.test(val)) errs.push('Include a symbol.');
  return errs;
}

function validate(kind: Kind, v: string, required?: boolean): string[] {
  const val = v.trim();
  const errs: string[] = [];

  if (required && !val) {
    return ['This field is required.'];
  }
  if (!val) return errs;

  switch (kind) {
    case 'email':
      return validateEmail(val);
    case 'company':
      return validateCompany(val);
    case 'password':
      return validatePassword(val);
    default:
      return errs;
  }
}

// Helper function to determine bar color based on validation state
function getBarColor(
  touched: boolean,
  valid: boolean,
  focused: boolean,
  hasValue: boolean,
): string {
  if (touched && !valid) return '#d32f2f';
  if (valid && hasValue) return '#2e7d32';
  if (focused) return '#1976d2';
  return 'rgba(0,0,0,0.12)';
}

// Component for displaying validation errors
function ValidationErrors({ touched, errors }: { touched: boolean; errors: string[] }) {
  if (!touched || errors.length === 0) return null;

  return (
    <Errors>
      {errors.map((e, i) => (
        <li key={i}>{e}</li>
      ))}
    </Errors>
  );
}

export function ValidatedInput({
  kind,
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  onValidChange,
  required,
}: ValidatedInputProps) {
  const [inner, setInner] = React.useState<string>(defaultValue ?? '');
  const controlled = value !== undefined;
  const v = controlled ? (value as string) : inner;

  const [focused, setFocused] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  const errors = React.useMemo(() => validate(kind, v, required), [kind, v, required]);
  const valid = errors.length === 0 && (!!v || !required);

  React.useEffect(() => {
    onValidChange?.(valid);
  }, [valid, onValidChange]);

  const barColor = getBarColor(touched, valid, focused, !!v);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value;
      if (!controlled) setInner(next);
      onChange?.(next);
    },
    [controlled, onChange],
  );

  const handleFocus = React.useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = React.useCallback(() => {
    setFocused(false);
    setTouched(true);
  }, []);

  return (
    <Wrap>
      <Label>{label}</Label>
      <FieldBox $barColor={barColor}>
        <BigInput
          type={kind === 'password' ? 'password' : 'text'}
          placeholder={placeholder}
          value={v}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          inputProps={{
            'aria-invalid': touched && !valid ? 'true' : 'false',
          }}
        />
      </FieldBox>
      <ValidationErrors touched={touched} errors={errors} />
    </Wrap>
  );
}
