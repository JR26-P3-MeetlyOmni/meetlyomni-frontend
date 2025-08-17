import React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import { SignInForm } from './SignInForm';

// Mock functions for Storybook actions
const mockFn = () => {};

// Define proper types for mock Link component
interface MockInternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

// Mock Internal Link component (unused in this story but available for potential future use)
const _MockInternalLink = ({ href, children, className, ...props }: MockInternalLinkProps) => (
  <a href={href} className={className} data-testid="internal-link" {...props}>
    {children}
  </a>
);

const meta: Meta<typeof SignInForm> = {
  title: 'Components/Auth/SignInForm',
  component: SignInForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A comprehensive sign-in form component with email and password fields, validation error display, forgot password link, and sign-up navigation. Includes proper accessibility features and loading states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    formData: {
      description: 'Current form data containing email and password values',
      control: 'object',
    },
    errors: {
      description: 'Validation errors for form fields and authentication',
      control: 'object',
    },
    isSubmitting: {
      description: 'Whether the form is currently being submitted',
      control: 'boolean',
    },
    hasSubmitted: {
      description: 'Whether the form has been submitted (affects error display)',
      control: 'boolean',
    },
    handleInputChange: {
      description: 'Callback function for input value changes',
      action: 'handleInputChange',
    },
    handleInputBlur: {
      description: 'Callback function for input blur events (triggers validation)',
      action: 'handleInputBlur',
    },
    handleSubmit: {
      description: 'Callback function for form submission',
      action: 'handleSubmit',
    },
  },
  decorators: [
    Story => (
      <div
        style={{
          padding: '20px',
          maxWidth: '500px',
          margin: '0 auto',
          backgroundColor: '#f5f5f5',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    formData: { email: '', password: '' },
    errors: { email: '', password: '', auth: null },
    isSubmitting: false,
    hasSubmitted: false,
    handleInputChange: mockFn,
    handleInputBlur: mockFn,
    handleSubmit: mockFn,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default empty sign-in form ready for user input.',
      },
    },
  },
};

// Form with data
export const WithFormData: Story = {
  args: {
    formData: { email: 'user@example.com', password: 'mySecurePassword123' },
    errors: { email: '', password: '', auth: null },
    isSubmitting: false,
    hasSubmitted: false,
    handleInputChange: mockFn,
    handleInputBlur: mockFn,
    handleSubmit: mockFn,
  },
  parameters: {
    docs: {
      description: {
        story: 'Sign-in form with pre-filled email and password values.',
      },
    },
  },
};

// Validation errors (before submission)
export const WithValidationErrors: Story = {
  args: {
    formData: { email: 'invalid-email', password: '123' },
    errors: {
      email: 'Please enter a valid email address',
      password: 'Password must be at least 8 characters with uppercase, lowercase, and number',
      auth: null,
    },
    isSubmitting: false,
    hasSubmitted: true, // Errors only show after submission
    handleInputChange: mockFn,
    handleInputBlur: mockFn,
    handleSubmit: mockFn,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Form displaying field validation errors. Notice how errors appear only after hasSubmitted is true.',
      },
    },
  },
};

// Authentication error
export const WithAuthError: Story = {
  args: {
    formData: { email: 'user@example.com', password: 'wrongPassword' },
    errors: {
      email: '',
      password: '',
      auth: 'Invalid email or password. Please check your credentials and try again.',
    },
    isSubmitting: false,
    hasSubmitted: true,
    handleInputChange: mockFn,
    handleInputBlur: mockFn,
    handleSubmit: mockFn,
  },
  parameters: {
    docs: {
      description: {
        story: 'Form showing authentication error from server after failed login attempt.',
      },
    },
  },
};

// Loading state
export const LoadingState: Story = {
  args: {
    formData: { email: 'user@example.com', password: 'password123' },
    errors: { email: '', password: '', auth: null },
    isSubmitting: true,
    hasSubmitted: true,
    handleInputChange: mockFn,
    handleInputBlur: mockFn,
    handleSubmit: mockFn,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Form in loading state during submission. Submit button is disabled and shows "Signing in..." text.',
      },
    },
  },
};

// All errors combined
export const AllErrors: Story = {
  args: {
    formData: { email: 'invalid', password: '' },
    errors: {
      email: 'Please enter a valid email address',
      password: 'Password is required',
      auth: 'Authentication failed. Please try again later.',
    },
    isSubmitting: false,
    hasSubmitted: true,
    handleInputChange: mockFn,
    handleInputBlur: mockFn,
    handleSubmit: mockFn,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Form showing all possible error states: field validation errors and authentication error.',
      },
    },
  },
};

// Interactive form for testing
export const Interactive: Story = {
  args: {
    formData: { email: '', password: '' },
    errors: { email: '', password: '', auth: null },
    isSubmitting: false,
    hasSubmitted: false,
    handleInputChange: mockFn,
    handleInputBlur: mockFn,
    handleSubmit: mockFn,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive form where all user actions (typing, blurring, submitting) are logged to the Actions panel.',
      },
    },
  },
};

// Form states showcase
export const FormStatesShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <h3>Empty Form</h3>
        <SignInForm
          formData={{ email: '', password: '' }}
          errors={{ email: '', password: '', auth: null }}
          isSubmitting={false}
          hasSubmitted={false}
          handleInputChange={mockFn}
          handleInputBlur={mockFn}
          handleSubmit={mockFn}
        />
      </div>

      <div>
        <h3>With Validation Errors</h3>
        <SignInForm
          formData={{ email: 'invalid', password: '123' }}
          errors={{
            email: 'Invalid email format',
            password: 'Password too short',
            auth: null,
          }}
          isSubmitting={false}
          hasSubmitted={true}
          handleInputChange={mockFn}
          handleInputBlur={mockFn}
          handleSubmit={mockFn}
        />
      </div>

      <div>
        <h3>Loading State</h3>
        <SignInForm
          formData={{ email: 'user@example.com', password: 'password123' }}
          errors={{ email: '', password: '', auth: null }}
          isSubmitting={true}
          hasSubmitted={true}
          handleInputChange={mockFn}
          handleInputBlur={mockFn}
          handleSubmit={mockFn}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Showcase of different form states side by side for comparison.',
      },
    },
  },
};

// Accessibility focus testing
export const AccessibilityFocus: Story = {
  args: {
    formData: { email: '', password: '' },
    errors: { email: '', password: '', auth: null },
    isSubmitting: false,
    hasSubmitted: false,
    handleInputChange: mockFn,
    handleInputBlur: mockFn,
    handleSubmit: mockFn,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Form with accessibility features highlighted. The email field should auto-focus when the form loads.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Auto-focus testing could be added here
    const emailInput = canvasElement.querySelector('input[type="email"]') as HTMLInputElement;
    if (emailInput) {
      emailInput.focus();
    }
  },
};

// Dark mode (if theme supports it)
export const DarkMode: Story = {
  args: {
    formData: { email: 'user@example.com', password: 'password123' },
    errors: { email: '', password: '', auth: null },
    isSubmitting: false,
    hasSubmitted: false,
    handleInputChange: mockFn,
    handleInputBlur: mockFn,
    handleSubmit: mockFn,
  },
  decorators: [
    Story => (
      <div
        style={{
          padding: '20px',
          maxWidth: '500px',
          margin: '0 auto',
          backgroundColor: '#1e1e1e',
          color: '#ffffff',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Form rendered on a dark background to test dark mode compatibility.',
      },
    },
  },
};
