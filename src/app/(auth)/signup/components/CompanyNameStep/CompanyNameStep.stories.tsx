import type { Meta, StoryObj } from '@storybook/nextjs';

import { CompanyNameStep } from './CompanyNameStep';

const meta: Meta<typeof CompanyNameStep> = {
  title: 'Auth/Signup/CompanyNameStep',
  component: CompanyNameStep,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Company name input step for the signup process. This component allows users to enter their company name with validation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    companyName: {
      control: 'text',
      description: 'Current company name value',
    },
    onCompanyNameChange: {
      action: 'company name changed',
      description: 'Callback function called when company name changes',
    },
    onNext: {
      action: 'next clicked',
      description: 'Callback function called when next button is clicked',
    },
    onBack: {
      action: 'back clicked',
      description:
        'Callback function called when back button is clicked (not used in this component)',
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
    companyName: '',
  },
};

export const WithCompanyName: Story = {
  args: {
    companyName: 'Google',
  },
};

export const WithLongCompanyName: Story = {
  args: {
    companyName: 'Microsoft Corporation',
  },
};

export const WithSpecialCharacters: Story = {
  args: {
    companyName: 'AT&T & Co.',
  },
};

export const Interactive: Story = {
  args: {
    companyName: '',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive version where you can type in the company name field and see validation in action.',
      },
    },
  },
};

export const ValidCompanyName: Story = {
  args: {
    companyName: 'Apple Inc',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the component with a valid company name that meets all validation requirements.',
      },
    },
  },
};

export const InvalidCompanyName: Story = {
  args: {
    companyName: 'A', // Too short
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with an invalid company name that fails validation.',
      },
    },
  },
};
