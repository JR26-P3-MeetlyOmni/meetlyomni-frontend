'use client';

import React from 'react';

import { Box, styled, TextField, Typography } from '@mui/material';

const StyledLabel = styled(Typography)(({ theme }) => ({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: 1,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.75), // 6px / 8 = 0.75
  display: 'block',
}));

// 注释掉未使用的StyledOptionalLabel
// const StyledOptionalLabel = styled(Typography)(({ theme }) => ({
//   fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//   fontSize: theme.typography.pxToRem(14),
//   fontWeight: theme.typography.fontWeightRegular,
//   lineHeight: 1,
//   color: theme.palette.text.disabled,
//   marginBottom: theme.spacing(0.75), // 6px / 8 = 0.75
//   display: 'block',
// }));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    borderRadius: theme.spacing(0.75), // 6px / 8 = 0.75
    backgroundColor: theme.palette.background.paper,
    border: `solid 1px ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
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
      padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`, // 上下12px 左右16px
      height: theme.spacing(1.75), // 14px / 8 = 1.75
    },
    '& textarea': {
      padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`, // 上下12px 左右16px
    },
    '& input::placeholder, & textarea::placeholder': {
      color: theme.palette.text.disabled, // #c9cacd
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: theme.typography.pxToRem(14),
      fontWeight: theme.typography.fontWeightRegular,
      opacity: 1,
    },
  },
  '& .MuiInputLabel-root': {
    display: 'none',
  },
}));

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  width?: string;
  required?: boolean;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  multiline = false,
  rows = 1,
  width = '40', // Default to theme.spacing(40) which is 320px
  required: _required = true, // 前缀_表示未使用但需要保留
  type = 'text',
}) => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(event.target.value);
    },
    [onChange],
  );

  // 所有字段都使用required样式（深色标签）
  const LabelComponent = StyledLabel;

  // Convert width to theme spacing if it's a number string
  const getWidth = (w: string) => {
    const numValue = parseFloat(w);
    return isNaN(numValue)
      ? w
      : (theme: { spacing: (value: number) => string }) => theme.spacing(numValue);
  };

  return (
    <Box sx={{ marginBottom: theme => theme.spacing(3) }}>
      {' '}
      {/* 24px / 8 = 3 */}
      <LabelComponent>{label}</LabelComponent>
      <StyledTextField
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        type={type}
        sx={{
          width: getWidth(width),
          '& .MuiOutlinedInput-root': {
            height: multiline ? 'auto' : theme => theme.spacing(4.75), // 38px / 8 = 4.75
            minHeight: multiline ? theme => theme.spacing(19) : theme => theme.spacing(4.75), // 152px / 8 = 19
          },
        }}
      />
    </Box>
  );
};

export default FormInput;
