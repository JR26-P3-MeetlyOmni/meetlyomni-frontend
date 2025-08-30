import type { Meta, StoryObj } from '@storybook/nextjs';

import PasswordStep from './PasswordStep';

const meta: Meta<typeof PasswordStep> = {
  title: 'Auth/Signup/PasswordStep',
  component: PasswordStep,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Password input step for the signup process. This component allows users to set their password with validation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    password: {
      control: 'text',
      description: 'Current password value',
    },
    onPasswordChange: {
      action: 'password changed',
      description: 'Callback function called when password changes',
    },
    onNext: {
      action: 'next clicked',
      description: 'Callback function called when next button is clicked',
    },
    onBack: {
      action: 'back clicked',
      description: 'Callback function called when back button is clicked',
    },
  },
  decorators: [
    Story => (
      <div
        style={{
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    password: '',
  },
};

export const WithPassword: Story = {
  args: {
    password: 'MySecurePassword123',
  },
};

export const WithStrongPassword: Story = {
  args: {
    password: 'VeryStrongPassword123!@#',
  },
};

export const WithLongPassword: Story = {
  args: {
    password: 'ThisIsAVeryLongPasswordThatMeetsAllRequirements123!@#',
  },
};

export const WithSpecialCharacters: Story = {
  args: {
    password: 'P@ssw0rd!$%^&*()',
  },
};

export const Interactive: Story = {
  args: {
    password: '',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive version where you can type in the password field and see validation in action.',
      },
    },
  },
};

export const ValidPassword: Story = {
  args: {
    password: 'ValidPassword123',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with a valid password that meets all validation requirements.',
      },
    },
  },
};

export const InvalidPassword: Story = {
  args: {
    password: 'short', // Too short
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with an invalid password that fails validation.',
      },
    },
  },
};

export const EmptyPassword: Story = {
  args: {
    password: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with an empty password field.',
      },
    },
  },
};
