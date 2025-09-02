import React, { useCallback, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import PasswordField from '../components/passwordReset/PasswordField';

const meta: Meta<typeof PasswordField> = {
  title: 'Auth/ForgetPassword/PasswordField',
  component: PasswordField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A unified password input field component with visibility toggle. Supports both new password and confirm password types.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['new', 'confirm'],
      description: 'Type of password field - determines label and placeholder',
    },
    value: { control: 'text', description: 'Current password value' },
    showPassword: { control: 'boolean', description: 'Whether to show password as plain text' },
    isSubmitting: {
      control: 'boolean',
      description: 'Whether form is currently submitting (disables input)',
    },
    hasError: { control: 'boolean', description: 'Whether field has validation error' },
    errorMessage: { control: 'text', description: 'Error message to display' },
    onChange: { action: 'password-changed', description: 'Callback when password value changes' },
    onToggleVisibility: {
      action: 'visibility-toggled',
      description: 'Callback when password visibility is toggled',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

interface TemplateProps {
  type: 'new' | 'confirm';
  value: string;
  showPassword: boolean;
  isSubmitting: boolean;
  hasError?: boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
  onToggleVisibility?: () => void;
}

const InteractiveTemplate = (args: TemplateProps) => {
  const [password, setPassword] = useState(args.value || '');
  const [showPassword, setShowPassword] = useState(args.showPassword || false);

  const handleChange = useCallback(
    (value: string) => {
      setPassword(value);
      args.onChange?.(value);
    },
    [args],
  );

  const handleToggleVisibility = useCallback(() => {
    setShowPassword((prev: boolean) => !prev);
    args.onToggleVisibility?.();
  }, [args]);

  return (
    <PasswordField
      {...args}
      value={password}
      showPassword={showPassword}
      onChange={handleChange}
      onToggleVisibility={handleToggleVisibility}
    />
  );
};

export const NewPasswordField: Story = {
  render: InteractiveTemplate,
  args: {
    type: 'new',
    value: '',
    showPassword: false,
    isSubmitting: false,
    hasError: false,
    errorMessage: '',
  },
};

export const ConfirmPasswordField: Story = {
  render: InteractiveTemplate,
  args: {
    type: 'confirm',
    value: '',
    showPassword: false,
    isSubmitting: false,
    hasError: false,
    errorMessage: '',
  },
};

export const WithError: Story = {
  render: InteractiveTemplate,
  args: {
    type: 'confirm',
    value: 'mismatch',
    showPassword: false,
    isSubmitting: false,
    hasError: true,
    errorMessage: 'Passwords do not match',
  },
};

export const Submitting: Story = {
  render: InteractiveTemplate,
  args: {
    type: 'new',
    value: 'MySecurePassword123!',
    showPassword: false,
    isSubmitting: true,
    hasError: false,
    errorMessage: '',
  },
};

export const WithVisiblePassword: Story = {
  render: InteractiveTemplate,
  args: {
    type: 'new',
    value: 'MySecurePassword123!',
    showPassword: true,
    isSubmitting: false,
    hasError: false,
    errorMessage: '',
  },
};
