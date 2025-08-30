import type { Meta, StoryObj } from '@storybook/nextjs';

import EmailStep from './EmailStep';

const meta: Meta<typeof EmailStep> = {
  title: 'Auth/Signup/EmailStep',
  component: EmailStep,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Email input step for the signup process. This component allows users to enter their email address with validation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    email: {
      control: 'text',
      description: 'Current email value',
    },
    onEmailChange: {
      action: 'email changed',
      description: 'Callback function called when email changes',
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
    email: '',
  },
};

export const WithEmail: Story = {
  args: {
    email: 'user@example.com',
  },
};

export const WithGmailAddress: Story = {
  args: {
    email: 'user123@gmail.com',
  },
};

export const WithCorporateEmail: Story = {
  args: {
    email: 'john.doe@company.com',
  },
};

export const WithLongEmail: Story = {
  args: {
    email: 'very.long.email.address.with.many.parts@very.long.domain.com',
  },
};

export const Interactive: Story = {
  args: {
    email: '',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive version where you can type in the email field and see validation in action.',
      },
    },
  },
};

export const ValidEmail: Story = {
  args: {
    email: 'valid.email@example.com',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the component with a valid email address that meets all validation requirements.',
      },
    },
  },
};

export const InvalidEmail: Story = {
  args: {
    email: 'invalid-email', // Invalid format
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with an invalid email address that fails validation.',
      },
    },
  },
};

export const EmptyEmail: Story = {
  args: {
    email: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with an empty email field.',
      },
    },
  },
};
