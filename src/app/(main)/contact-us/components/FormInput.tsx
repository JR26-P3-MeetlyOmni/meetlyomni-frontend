'use client';

import React from 'react';

import { styled, TextField, Typography } from '@mui/material';

import { FormInputProps } from '..';

// Common font family constant
const FONT_FAMILY = '"Roboto", "Helvetica", "Arial", sans-serif';

// Label styling for form inputs
const StyledLabel = styled(Typography)(({ theme }) => ({
  fontFamily: FONT_FAMILY,
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: 1,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.75),
  display: 'block',
}));

// Custom styled text field with consistent design
const StyledTextField = styled(TextField, {
  shouldForwardProp: prop => !String(prop).startsWith('$'),
})<{ $multiline?: boolean; $width?: string }>(({ theme, $multiline, $width }) => {
  const getWidth = (w: string) => {
    const numValue = parseFloat(w);
    return isNaN(numValue) ? w : theme.spacing(numValue);
  };

  return {
    width: getWidth($width || '40'),
    '& .MuiOutlinedInput-root': {
      fontFamily: FONT_FAMILY,
      borderRadius: theme.spacing(0.75),
      backgroundColor: theme.palette.background.paper,
      border: `solid 1px ${theme.palette.divider}`,
      boxShadow: theme.shadows[1],
      height: $multiline ? 'auto' : theme.spacing(4.75),
      minHeight: $multiline ? theme.spacing(19) : theme.spacing(4.75),
      '& fieldset': { border: 'none' },
      '&:hover fieldset': { border: 'none' },
      '&.Mui-focused fieldset': { border: `solid 1px ${theme.palette.primary.main}` },
      '& input, & textarea': {
        padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
      },
      '& input': { height: theme.spacing(1.75) },
      '& input::placeholder, & textarea::placeholder': {
        color: theme.palette.text.disabled,
        fontFamily: FONT_FAMILY,
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightRegular,
        opacity: 1,
      },
    },
    '& .MuiInputLabel-root': { display: 'none' },
  };
});

// Reusable form input component
const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  register,
  error,
  placeholder = '',
  multiline = false,
  rows = 1,
  width = '40',
  type = 'text',
}) => {
  return (
    <div style={{ marginBottom: '32px' }}>
      <StyledLabel>{label}</StyledLabel>
      <StyledTextField
        {...register(name, { required: `${label} is required` })}
        placeholder={placeholder}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        type={type}
        $multiline={multiline}
        $width={width}
        error={!!error}
        helperText={error}
      />
    </div>
  );
};

export default FormInput;
