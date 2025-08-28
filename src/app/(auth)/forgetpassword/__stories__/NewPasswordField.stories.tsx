import React, { useCallback, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import NewPasswordField from '../components/passwordReset/NewPasswordField';

const meta: Meta<typeof NewPasswordField> = {
  title: 'Auth/ForgetPassword/NewPasswordField',
  component: NewPasswordField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A password input field component with visibility toggle. Used for entering new passwords in the password reset flow.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    password: { control: 'text', description: 'Current password value' },
    showPassword: { control: 'boolean', description: 'Whether to show password as plain text' },
    isSubmitting: {
      control: 'boolean',
      description: 'Whether form is currently submitting (disables input)',
    },
    onPasswordChange: {
      action: 'password-changed',
      description: 'Callback when password value changes',
    },
    onToggleVisibility: {
      action: 'visibility-toggled',
      description: 'Callback when visibility toggle is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper to demonstrate real password input behavior
const InteractiveWrapper = (args: {
  password?: string;
  showPassword?: boolean;
  isSubmitting?: boolean;
  onPasswordChange?: (value: string) => void;
  onToggleVisibility?: () => void;
}) => {
  const [password, setPassword] = useState(args.password || '');
  const [showPassword, setShowPassword] = useState(args.showPassword || false);

  const handlePasswordChange = useCallback(
    (value: string) => {
      setPassword(value);
      args.onPasswordChange?.(value);
    },
    [args],
  );

  const handleToggleVisibility = useCallback(() => {
    setShowPassword(!showPassword);
    args.onToggleVisibility?.();
  }, [showPassword, args]);

  return (
    <div style={{ width: '400px', padding: '20px' }}>
      <NewPasswordField
        password={password}
        showPassword={showPassword}
        isSubmitting={args.isSubmitting || false}
        onPasswordChange={handlePasswordChange}
        onToggleVisibility={handleToggleVisibility}
      />
    </div>
  );
};

// Default empty password field
export const Default: Story = {
  render: function renderDefault(args) {
    return <InteractiveWrapper {...args} />;
  },
  args: {
    password: '',
    showPassword: false,
    isSubmitting: false,
  },
};

// Password field with value (hidden)
export const WithPassword: Story = {
  render: function renderWithPassword(args) {
    return <InteractiveWrapper {...args} />;
  },
  args: {
    password: 'MySecurePassword123!',
    showPassword: false,
    isSubmitting: false,
  },
};

// Password field with value (visible)
export const WithPasswordVisible: Story = {
  render: function renderWithPasswordVisible(args) {
    return <InteractiveWrapper {...args} />;
  },
  args: {
    password: 'MySecurePassword123!',
    showPassword: true,
    isSubmitting: false,
  },
};

// Disabled state while submitting
export const Submitting: Story = {
  args: {
    password: 'MySecurePassword123!',
    showPassword: false,
    isSubmitting: true,
    onPasswordChange: function handlePasswordChange() {},
    onToggleVisibility: function handleToggleVisibility() {},
  },
  render: function renderSubmitting(args) {
    return (
      <div style={{ width: '400px', padding: '20px' }}>
        <NewPasswordField {...args} />
      </div>
    );
  },
};

// Interactive demo
export const Interactive: Story = {
  render: function renderInteractive(args) {
    return <InteractiveWrapper {...args} />;
  },
  args: {
    password: '',
    showPassword: false,
    isSubmitting: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demo where you can type a password and toggle visibility. Try clicking the eye icon to show/hide the password.',
      },
    },
  },
};

// Different password lengths for testing
export const ShortPassword: Story = {
  render: function renderShortPassword(args) {
    return <InteractiveWrapper {...args} />;
  },
  args: {
    password: 'short',
    showPassword: true,
    isSubmitting: false,
  },
};

export const MediumPassword: Story = {
  render: function renderMediumPassword(args) {
    return <InteractiveWrapper {...args} />;
  },
  args: {
    password: 'MediumPassword123',
    showPassword: true,
    isSubmitting: false,
  },
};

export const LongPassword: Story = {
  render: function renderLongPassword(args) {
    return <InteractiveWrapper {...args} />;
  },
  args: {
    password: 'VeryLongPasswordWithManyCharacters123!@#$%^&*()',
    showPassword: true,
    isSubmitting: false,
  },
};
