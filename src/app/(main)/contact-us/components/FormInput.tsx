'use client';

import React from 'react';

import { Box, styled, TextField, Typography } from '@mui/material';

import { FormInputProps } from '..';

// Label styling for form inputs
const StyledLabel = styled(Typography)(({ theme }) => ({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: 1,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.75),
  display: 'block',
}));

// Container for form input with consistent spacing
const FormInputContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

// Custom styled text field with consistent design
const StyledTextField = styled(TextField, {
  shouldForwardProp: prop => !String(prop).startsWith('$'),
})<{ $multiline?: boolean; $width?: string }>(({ theme, $multiline, $width }) => {
  // Convert width string to theme spacing function
  const getWidth = (w: string) => {
    const numValue = parseFloat(w);
    return isNaN(numValue) ? w : theme.spacing(numValue);
  };

  return {
    width: getWidth($width || '40'),
    '& .MuiOutlinedInput-root': {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      borderRadius: theme.spacing(0.75),
      backgroundColor: theme.palette.background.paper,
      border: `solid 1px ${theme.palette.divider}`,
      boxShadow: theme.shadows[1],
      height: $multiline ? 'auto' : theme.spacing(4.75),
      minHeight: $multiline ? theme.spacing(19) : theme.spacing(4.75),
      '& fieldset': {
        border: 'none',
      },
      '&:hover fieldset': {
        border: 'none',
      },
      '&.Mui-focused fieldset': {
        border: `solid 1px ${theme.palette.primary.main}`,
      },
      '& input': {
        padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
        height: theme.spacing(1.75),
      },
      '& textarea': {
        padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
      },
      '& input::placeholder, & textarea::placeholder': {
        color: theme.palette.text.disabled,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightRegular,
        opacity: 1,
      },
    },
    '& .MuiInputLabel-root': {
      display: 'none',
    },
  };
});

// Reusable form input component
const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  multiline = false,
  rows = 1,
  width = '40',
  required: _required = true,
  type = 'text',
}) => {
  // Handle input value changes
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(event.target.value);
    },
    [onChange],
  );

  return (
    <FormInputContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledTextField
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        type={type}
        $multiline={multiline}
        $width={width}
      />
    </FormInputContainer>
  );
};

export default FormInput;
