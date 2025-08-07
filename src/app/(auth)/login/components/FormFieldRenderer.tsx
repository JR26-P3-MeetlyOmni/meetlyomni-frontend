import React from 'react';

import type { FormFieldConfig, FormFieldRendererProps } from '../types';
import { FormField, StyledTextField } from './LoginFormStyles';

export const FORM_FIELDS: FormFieldConfig[] = [
  {
    key: 'email',
    label: 'Email',
    placeholder: 'Email Address',
    type: 'email',
  },
  {
    key: 'password',
    label: 'Password',
    placeholder: 'Password',
    type: 'password',
  },
];

export const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({
  config,
  formData,
  errors,
  handleInputChange,
}) => (
  <FormField key={config.key}>
    <StyledTextField
      label={config.label}
      placeholder={config.placeholder}
      type={config.type || 'text'}
      variant="outlined"
      fullWidth
      value={formData[config.key]}
      onChange={handleInputChange(config.key)}
      error={!!errors[config.key]}
      helperText={errors[config.key]}
    />
  </FormField>
);
