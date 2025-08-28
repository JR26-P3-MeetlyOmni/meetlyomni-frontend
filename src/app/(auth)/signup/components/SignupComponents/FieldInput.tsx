'use client';

import * as React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

type Kind = 'company' | 'email' | 'password' | 'phone' | 'contactName';

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

const ErrorBox = styled('div')(({ theme }) => ({
  minHeight: theme.spacing(3),
}));

const Errors = styled('ul')(({ theme }) => ({
  margin: theme.spacing(0.5, 0, 0),
  paddingLeft: theme.spacing(2.5),
  color: theme.palette.error.main,
  ...theme.typography.caption,
  listStyle: 'disc',
}));

// New component for password requirements
const PasswordRequirementsList = styled('ul')(({ theme }) => ({
  margin: theme.spacing(0.5, 0, 0),
  paddingLeft: theme.spacing(2.5),
  ...theme.typography.caption,
  listStyle: 'none',
}));

const RequirementItem = styled('li', {
  shouldForwardProp: prop => prop !== '$isMet',
})<{ $isMet: boolean }>(({ theme, $isMet }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: $isMet ? theme.palette.success.main : theme.palette.error.main,
  transition: 'color 300ms ease',
  '& .MuiSvgIcon-root': {
    fontSize: 16,
    color: $isMet ? theme.palette.success.main : theme.palette.error.main,
  },
}));

// Password requirements configuration
const PASSWORD_REQUIREMENTS = [
  { id: 'length', test: (val: string) => val.length >= 12, text: 'At least 12 characters' },
  {
    id: 'uppercase',
    test: (val: string) => /[A-Z]/.test(val),
    text: 'At least 1 uppercase letter',
  },
  {
    id: 'lowercase',
    test: (val: string) => /[a-z]/.test(val),
    text: 'At least 1 lowercase letter',
  },
  { id: 'number', test: (val: string) => /[0-9]/.test(val), text: 'At least 1 number' },
  {
    id: 'symbol',
    test: (val: string) => /[^\w\s]/.test(val),
    text: 'At least 1 special character',
  },
];

// Component for displaying password requirements
function PasswordRequirements({ value }: { value: string }) {
  return (
    <PasswordRequirementsList>
      {PASSWORD_REQUIREMENTS.map(requirement => {
        const isMet = requirement.test(value);
        return (
          <RequirementItem key={requirement.id} $isMet={isMet}>
            {isMet ? <CheckIcon /> : <CloseIcon />}
            {requirement.text}
          </RequirementItem>
        );
      })}
    </PasswordRequirementsList>
  );
}

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

const LOCAL_PHONE_REGEX = /^(0\d{9}|[1-9]\d{8})$/;
function validatePhone(localDigits: string): string[] {
  const errs: string[] = [];
  if (localDigits.length === 0) return errs;
  if (!LOCAL_PHONE_REGEX.test(localDigits)) {
    errs.push('Phone must be local 9–10 digits: 0XXXXXXXXX or XXXXXXXXX.');
  }
  return errs;
}

function validatePassword(val: string): string[] {
  const errs: string[] = [];
  if (val.length < 12) errs.push('At least 12 characters.');
  if (!/[A-Z]/.test(val)) errs.push('At least 1 uppercase letter.');
  if (!/[a-z]/.test(val)) errs.push('At least 1 lowercase letter.');
  if (!/[0-9]/.test(val)) errs.push('At least 1 number.');
  if (!/[^\w\s]/.test(val)) errs.push('At least 1 special character.');
  return errs;
}

function validateContactName(raw: string): string[] {
  const errs: string[] = [];
  const val = raw.trim();
  if (val.length === 0) return errs;
  if (val.length < 2 || val.length > 50) errs.push('Name must be 2–50 characters.');

  const ok = /^[\p{L} .\-']+$/u.test(val);
  if (!ok) errs.push("Only letters, spaces and . - ' are allowed.");
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
    case 'phone':
      return validatePhone(val);
    case 'contactName':
      return validateContactName(v);
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
  if (!touched && !hasValue && !focused) return '#1976d2';
  if (touched && !valid) return '#d32f2f';
  if (focused) return '#1976d2';
  if (valid && hasValue) return '#2e7d32';
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

// Extract input handlers to reduce function length
function useInputHandlers(
  kind: Kind,
  controlled: boolean,
  setInner: React.Dispatch<React.SetStateAction<string>>,
  onChange?: (val: string) => void,
) {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let next = e.target.value;
      if (kind === 'phone') {
        const digits = next.replace(/\D/g, '');
        const withoutCc = digits.startsWith('61') ? digits.slice(2) : digits;
        next = withoutCc.slice(0, 10); // local up to 10 digits
      }
      if (!controlled) setInner(next);
      onChange?.(next);
    },
    [controlled, onChange, kind, setInner],
  );

  return { handleChange };
}

// Extract state management to reduce function length
function useValidationState(
  kind: Kind,
  v: string,
  required?: boolean,
  onValidChange?: (valid: boolean) => void,
) {
  const [focused, setFocused] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  const errors = React.useMemo(() => validate(kind, v, required), [kind, v, required]);
  const valid = errors.length === 0 && (!!v || !required);

  React.useEffect(() => {
    onValidChange?.(valid);
  }, [valid, onValidChange]);

  const barColor = getBarColor(touched, valid, focused, !!v);

  return { focused, setFocused, touched, setTouched, errors, valid, barColor };
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

  const { handleChange } = useInputHandlers(kind, controlled, setInner, onChange);
  const { setFocused, touched, setTouched, errors, valid, barColor } = useValidationState(
    kind,
    v,
    required,
    onValidChange,
  );

  const handleInputFocus = React.useCallback(() => {
    setFocused(true);
  }, [setFocused]);

  const handleInputBlur = React.useCallback(() => {
    setFocused(false);
    setTouched(true);
  }, [setFocused, setTouched]);

  return (
    <Wrap>
      <Label>{label}</Label>
      <FieldBox $barColor={barColor}>
        <BigInput
          type={kind === 'password' ? 'password' : 'text'}
          placeholder={placeholder}
          value={v}
          onChange={handleChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          inputProps={{
            'aria-invalid': touched && !valid ? 'true' : 'false',
            ...(kind === 'phone' ? { inputMode: 'numeric', pattern: '[0-9]*' } : {}),
          }}
        />
      </FieldBox>
      <ErrorBox>
        {kind === 'password' ? (
          <PasswordRequirements value={v} />
        ) : (
          <ValidationErrors touched={touched} errors={errors} />
        )}
      </ErrorBox>
    </Wrap>
  );
}
