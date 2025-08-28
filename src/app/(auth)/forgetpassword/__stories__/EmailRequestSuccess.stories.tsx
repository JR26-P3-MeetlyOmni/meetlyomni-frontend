import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';

import EmailRequestSuccess from '../EmailSentSuccess/page';

// Mock Next.js Image component for Storybook
const MockImage = ({ _src, alt, width, height }: { _src: string; alt: string; width: number; height: number }) => (
  <div 
    style={{ 
      width, 
      height, 
      backgroundColor: '#f0f0f0', 
      border: '1px solid #ddd',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      color: '#666'
    }}
  >
    {alt}
  </div>
);

// Mock Next.js Link component for Storybook
const MockLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const handleClick = () => {
    // Mock navigation - disabled for production
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-alert
      alert(`Navigate to: ${href}`);
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  );
};

const meta: Meta<typeof EmailRequestSuccess> = {
  title: 'Auth/ForgetPassword/EmailRequestSuccess',
  component: EmailRequestSuccess,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Success page displayed after user requests a password reset email. Shows confirmation message and provides link back to sign in.',
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock the dependencies for Storybook environment
const WithMockedDependencies = () => {
  // Mock Next.js dependencies
  React.useEffect(() => {
    // Mock Next.js Image
    if (typeof window !== 'undefined') {
      (window as unknown as { next: { router: { push: (href: string) => void } } }).next = {
        router: {
          push: (href: string) => {
            if (process.env.NODE_ENV !== 'production') {
              // eslint-disable-next-line no-alert
              alert(`Navigate to: ${href}`);
            }
          },
        }
      };
    }
  }, []);

  return <EmailRequestSuccess />;
};

// Default success page
export const Default: Story = {
  render: WithMockedDependencies,
};

// With custom viewport sizes to test responsiveness
export const Mobile: Story = {
  render: WithMockedDependencies,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'How the success page appears on mobile devices',
      },
    },
  },
};

export const Tablet: Story = {
  render: WithMockedDependencies,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'How the success page appears on tablet devices',
      },
    },
  },
};

export const Desktop: Story = {
  render: WithMockedDependencies,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'How the success page appears on desktop devices',
      },
    },
  },
};

// Dark mode variant
export const DarkMode: Story = {
  render: WithMockedDependencies,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'Success page with dark background',
      },
    },
  },
};

// Helper components for breakdown
const IconSection = () => (
  <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
    <h3>Icon Container</h3>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
      <MockImage 
        _src="/assets/images/WelcomeToSignin/pwreset-icon.png"
        alt="Success Checkmark"
        width={44}
        height={44}
      />
    </div>
  </div>
);

const TitleSection = () => (
  <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
    <h3>Title Text</h3>
    <div style={{ 
      fontSize: '24px', 
      fontWeight: 'bold', 
      textAlign: 'center',
      marginTop: '10px'
    }}>
      Password reset link has been sent
    </div>
  </div>
);

const DescriptionSection = () => (
  <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
    <h3>Description Text</h3>
    <div style={{ 
      fontSize: '14px', 
      textAlign: 'center',
      color: '#666',
      lineHeight: 1.5,
      marginTop: '10px'
    }}>
      An email with password reset link has been sent to your email address. If you do not see
      it in the inbox, check your spam folder
    </div>
  </div>
);

const ActionSection = () => (
  <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
    <h3>Action Button</h3>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
      <MockLink href="/login">
        <button style={{ 
          padding: '12px 20px', 
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: 'white',
          cursor: 'pointer'
        }}>
          Back to Sign in
        </button>
      </MockLink>
    </div>
  </div>
);

// Component parts breakdown
export const ComponentBreakdown: Story = {
  render: function renderComponentBreakdown() {
    return (
      <div style={{ padding: '20px', maxWidth: '800px' }}>
        <h2 style={{ marginBottom: '20px' }}>EmailRequestSuccess Component Structure</h2>
        <IconSection />
        <TitleSection />
        <DescriptionSection />
        <ActionSection />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Breakdown of the component showing each part separately for design reference.',
      },
    },
  },
};