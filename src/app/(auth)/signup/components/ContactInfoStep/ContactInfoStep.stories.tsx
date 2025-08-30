import type { Meta, StoryObj } from '@storybook/nextjs';

import ContactInfoStep from './ContactInfoStep';

const meta: Meta<typeof ContactInfoStep> = {
  title: 'Auth/Signup/ContactInfoStep',
  component: ContactInfoStep,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Contact information input step for the signup process. This component allows users to enter their contact name and phone number with validation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    contactName: {
      control: 'text',
      description: 'Current contact name value',
    },
    phone: {
      control: 'text',
      description: 'Current phone number value',
    },
    onChange: {
      action: 'contact info changed',
      description: 'Callback function called when contact information changes',
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
    contactName: '',
    phone: '',
  },
};

export const WithContactInfo: Story = {
  args: {
    contactName: 'Alex Li',
    phone: '0123456789',
  },
};

export const WithLongContactName: Story = {
  args: {
    contactName: 'Dr. John Smith Jr.',
    phone: '0987654321',
  },
};

export const WithInternationalPhone: Story = {
  args: {
    contactName: 'Maria Garcia',
    phone: '1234567890',
  },
};

export const Interactive: Story = {
  args: {
    contactName: '',
    phone: '',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive version where you can type in the contact name and phone number fields and see validation in action.',
      },
    },
  },
};

export const ValidContactInfo: Story = {
  args: {
    contactName: 'Sarah Johnson',
    phone: '0123456789',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the component with valid contact information that meets all validation requirements.',
      },
    },
  },
};

export const InvalidContactInfo: Story = {
  args: {
    contactName: 'A', // Too short
    phone: '123', // Too short
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with invalid contact information that fails validation.',
      },
    },
  },
};

export const PartialContactInfo: Story = {
  args: {
    contactName: 'Valid Name',
    phone: '', // Empty phone
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the component with only contact name filled, demonstrating partial validation state.',
      },
    },
  },
};
