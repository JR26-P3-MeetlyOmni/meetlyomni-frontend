import React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

// Import the actual component with mocks applied
import LoginPage from './page';

// Mock functions for Storybook actions
const mockFn = () => {};

// Define proper types for Image component
interface MockImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

// Mock Next.js Image component
const MockImage = ({ src, alt, width, height, style, ...props }: MockImageProps) => (
  <div
    style={{
      width: `${width}px`,
      height: `${height}px`,
      backgroundImage: `url(${src})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      display: 'block',
      ...style,
    }}
    role="img"
    aria-label={alt}
    {...props}
  />
);

// Mock components for isolated story rendering
const MockAuthGuard = ({
  children,
  requireAuth,
}: {
  children: React.ReactNode;
  requireAuth: boolean;
}) => (
  <div data-testid="auth-guard" data-require-auth={requireAuth}>
    {children}
  </div>
);

// Define proper types for Link component
interface MockInternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

const MockInternalLink = ({ href, children, className, ...props }: MockInternalLinkProps) => (
  <a href={href} className={className} data-testid="internal-link" {...props}>
    {children}
  </a>
);

// Mock useSignInForm hook
const mockUseSignInForm = {
  formData: { email: '', password: '' },
  errors: { email: '', password: '', auth: null },
  isSubmitting: false,
  hasSubmitted: false,
  handleInputChange: mockFn,
  handleInputBlur: mockFn,
  handleSubmit: mockFn,
};

// Viewport configuration for Storybook 9+
const INITIAL_VIEWPORTS = {
  iphone6: { name: 'iPhone 6', styles: { width: '375px', height: '667px' } },
  ipad: { name: 'iPad', styles: { width: '768px', height: '1024px' } },
  desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
};

const meta: Meta<typeof LoginPage> = {
  title: 'Pages/Auth/LoginPage',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    docs: {
      description: {
        component:
          'The main login page component that includes decorative elements, title section, and the sign-in form. This page uses the AuthGuard to ensure users are not already authenticated.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => {
      // Mock the modules globally for this story
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('next/image').default = MockImage;
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('@/features/auth').AuthGuard = MockAuthGuard;
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('@/features/auth').useSignInForm = () => mockUseSignInForm;
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('@/components/Link/Link').InternalLink = MockInternalLink;

      return (
        <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The default login page with all decorative elements and an empty form.',
      },
    },
  },
};

export const WithFormData: Story = {
  decorators: [
    Story => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('@/features/auth').useSignInForm = () => ({
        ...mockUseSignInForm,
        formData: { email: 'user@example.com', password: 'password123' },
      });
      return <Story />;
    },
  ],
  parameters: {
    docs: {
      description: {
        story: 'Login page with pre-filled form data to showcase the form appearance with values.',
      },
    },
  },
};

export const WithFieldErrors: Story = {
  decorators: [
    Story => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('@/features/auth').useSignInForm = () => ({
        ...mockUseSignInForm,
        formData: { email: 'invalid-email', password: '123' },
        errors: {
          email: 'Please enter a valid email address',
          password: 'Password must be at least 8 characters with uppercase, lowercase, and number',
          auth: null,
        },
        hasSubmitted: true,
      });
      return <Story />;
    },
  ],
  parameters: {
    docs: {
      description: {
        story: 'Login page showing field validation errors after form submission.',
      },
    },
  },
};

export const WithAuthError: Story = {
  decorators: [
    Story => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('@/features/auth').useSignInForm = () => ({
        ...mockUseSignInForm,
        formData: { email: 'user@example.com', password: 'wrongpassword' },
        errors: {
          email: '',
          password: '',
          auth: 'Invalid email or password. Please try again.',
        },
        hasSubmitted: true,
      });
      return <Story />;
    },
  ],
  parameters: {
    docs: {
      description: {
        story: 'Login page displaying an authentication error from the server.',
      },
    },
  },
};

export const LoadingState: Story = {
  decorators: [
    Story => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('@/features/auth').useSignInForm = () => ({
        ...mockUseSignInForm,
        formData: { email: 'user@example.com', password: 'password123' },
        isSubmitting: true,
        hasSubmitted: true,
      });
      return <Story />;
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Login page in loading state during form submission, showing disabled button and loading text.',
      },
    },
  },
};

export const AllErrors: Story = {
  decorators: [
    Story => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('@/features/auth').useSignInForm = () => ({
        ...mockUseSignInForm,
        formData: { email: 'invalid', password: '' },
        errors: {
          email: 'Please enter a valid email address',
          password: 'Password is required',
          auth: 'Authentication failed. Please check your credentials.',
        },
        hasSubmitted: true,
      });
      return <Story />;
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Login page showing all possible error states: field validation errors and authentication error.',
      },
    },
  },
};

// Responsive stories
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
    docs: {
      description: {
        story: 'Login page optimized for mobile devices (iPhone 6 viewport).',
      },
    },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    docs: {
      description: {
        story: 'Login page optimized for tablet devices (iPad viewport).',
      },
    },
  },
};

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Login page optimized for desktop devices.',
      },
    },
  },
};

// Accessibility story
export const HighContrast: Story = {
  decorators: [
    Story => (
      <div style={{ filter: 'contrast(150%) brightness(120%)' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Login page with enhanced contrast for accessibility testing.',
      },
    },
  },
};

// Interactive story for testing form functionality
export const Interactive: Story = {
  decorators: [
    Story => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('@/features/auth').useSignInForm = () => ({
        ...mockUseSignInForm,
        handleInputChange: mockFn,
        handleInputBlur: mockFn,
        handleSubmit: mockFn,
      });
      return <Story />;
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Interactive login page where form actions are logged to the Actions panel for testing.',
      },
    },
  },
};
