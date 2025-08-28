import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';

import PasswordFormFields from '../components/passwordReset/PasswordFormFields';
import type { PasswordValidation } from '../types';

const meta: Meta<typeof PasswordFormFields> = {
  title: 'Auth/ForgetPassword/PasswordFormFields',
  component: PasswordFormFields,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Password form fields component for password reset flow. Includes password input, confirm password, and validation rules display.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    password: { control: 'text', description: 'Current password value' },
    confirmPassword: { control: 'text', description: 'Current confirm password value' },
    showPassword: { control: 'boolean', description: 'Whether to show password as plain text' },
    showConfirmPassword: { control: 'boolean', description: 'Whether to show confirm password as plain text' },
    isSubmitting: { control: 'boolean', description: 'Whether form is currently submitting' },
    showValidation: { control: 'boolean', description: 'Whether to show validation rules' },
    validation: { control: 'object', description: 'Password validation state object' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper to demonstrate real password input behavior
const InteractiveWrapper = (args: { 
  password?: string; 
  confirmPassword?: string; 
  showPassword?: boolean; 
  showConfirmPassword?: boolean;
  isSubmitting?: boolean;
  showValidation?: boolean;
}) => {
  const [password, setPassword] = useState(args.password || '');
  const [confirmPassword, setConfirmPassword] = useState(args.confirmPassword || '');
  const [showPassword, setShowPassword] = useState(args.showPassword || false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(args.showConfirmPassword || false);

  // Simulate password validation logic
  const validation: PasswordValidation = {
    minLength: password.length >= 12,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    match: password === confirmPassword && password.length > 0,
  };

  return (
    <div style={{ width: '400px', padding: '20px' }}>
      <PasswordFormFields
        password={password}
        confirmPassword={confirmPassword}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        isSubmitting={args.isSubmitting || false}
        showValidation={args.showValidation || false}
        validation={validation}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        toggleShowPassword={function handleTogglePassword() {
          setShowPassword(!showPassword);
        }}
        toggleShowConfirmPassword={function handleToggleConfirmPassword() {
          setShowConfirmPassword(!showConfirmPassword);
        }}
      />
    </div>
  );
};

// Default story with empty fields
export const Default: Story = {
  render: function renderDefault(args) {
    return <InteractiveWrapper {...args} />;
  },
  args: {
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    isSubmitting: false,
    showValidation: false,
    validation: {
      minLength: false,
      hasUpper: false,
      hasLower: false,
      hasNumber: false,
      hasSpecial: false,
      match: false,
    },
    setPassword: function handleSetPassword() {},
    setConfirmPassword: function handleSetConfirmPassword() {},
    toggleShowPassword: function handleTogglePassword() {},
    toggleShowConfirmPassword: function handleToggleConfirmPassword() {},
  },
};

// Story with validation shown and weak password
export const WeakPassword: Story = {
  render: function renderWeakPassword(args) {
    return <InteractiveWrapper {...args} />;
  },
  args: {
    password: 'weak',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    isSubmitting: false,
    showValidation: true,
    validation: {
      minLength: false,
      hasUpper: false,
      hasLower: true,
      hasNumber: false,
      hasSpecial: false,
      match: false,
    },
  },
};

// Story with strong password
export const StrongPassword: Story = {
  render: function renderStrongPassword(args) {
    return <InteractiveWrapper {...args} />;
  },
  args: {
    password: 'MyStrongPassword123!',
    confirmPassword: 'MyStrongPassword123!',
    showPassword: false,
    showConfirmPassword: false,
    isSubmitting: false,
    showValidation: true,
    validation: {
      minLength: true,
      hasUpper: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: true,
      match: true,
    },
  },
};

// Story with password mismatch
export const PasswordMismatch: Story = {
  render: function renderPasswordMismatch(args) {
    return <InteractiveWrapper {...args} />;
  },
  args: {
    password: 'MyStrongPassword123!',
    confirmPassword: 'DifferentPassword123!',
    showPassword: false,
    showConfirmPassword: false,
    isSubmitting: false,
    showValidation: true,
    validation: {
      minLength: true,
      hasUpper: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: true,
      match: false,
    },
  },
};

// Story with passwords visible
export const PasswordsVisible: Story = {
  render: function renderPasswordsVisible(args) {
    return <InteractiveWrapper {...args} />;
  },
  args: {
    password: 'MyStrongPassword123!',
    confirmPassword: 'MyStrongPassword123!',
    showPassword: true,
    showConfirmPassword: true,
    isSubmitting: false,
    showValidation: false,
    validation: {
      minLength: true,
      hasUpper: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: true,
      match: true,
    },
  },
};

// Story with submitting state
export const Submitting: Story = {
  args: {
    password: 'MyStrongPassword123!',
    confirmPassword: 'MyStrongPassword123!',
    showPassword: false,
    showConfirmPassword: false,
    isSubmitting: true,
    showValidation: false,
    validation: {
      minLength: true,
      hasUpper: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: true,
      match: true,
    },
    setPassword: () => {},
    setConfirmPassword: () => {},
    toggleShowPassword: () => {},
    toggleShowConfirmPassword: () => {},
  },
  render: function renderSubmitting(args) {
    return (
      <div style={{ width: '400px', padding: '20px' }}>
        <PasswordFormFields {...args} />
      </div>
    );
  },
};

// Interactive demo story
export const Interactive: Story = {
  render: function renderInteractive(args) {
    return <InteractiveWrapper {...args} />;
  },
  args: {
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    isSubmitting: false,
    showValidation: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo where you can type passwords and see real-time validation. Try entering different password patterns to see the validation rules update.',
      },
    },
  },
};