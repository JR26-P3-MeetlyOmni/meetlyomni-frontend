import type { Meta, StoryObj } from '@storybook/nextjs';

import { AuthResultPageComponent } from './ConfirmationForm';

const meta: Meta<typeof AuthResultPageComponent> = {
  title: 'Components/ConfirmationForm/AuthResultPage',
  component: AuthResultPageComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A reusable confirmation/result page component that can display success, error, or other status messages with customizable content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    iconSrc: {
      control: 'text',
      description: 'Path to the icon image',
    },
    iconAlt: {
      control: 'text',
      description: 'Alt text for the icon',
    },
    title: {
      control: 'text',
      description: 'Main title text',
    },
    description: {
      control: 'text',
      description: 'Description text below the title',
    },
    buttonText: {
      control: 'text',
      description: 'Text for the action button',
    },
    buttonHref: {
      control: 'text',
      description: 'Link destination for the button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SuccessPage: Story = {
  args: {
    iconSrc: '/assets/images/confirmationForm/invalid-name.png',
    iconAlt: 'Success',
    title: 'Registration Successful!',
    description:
      'Your account has been successfully created. You can now start using our services.',
    buttonText: 'Get Started',
    buttonHref: '/dashboard',
  },
};

export const ErrorPage: Story = {
  args: {
    iconSrc: '/assets/images/confirmationForm/invalid-name.png',
    iconAlt: 'Error',
    title: 'Verification Failed',
    description:
      'Sorry, the verification link has expired or is invalid. Please request a new verification email.',
    buttonText: 'Resend Email',
    buttonHref: '/resend-verification',
  },
};

export const DefaultLogin: Story = {
  args: {
    iconSrc: '/assets/images/confirmationForm/invalid-name.png',
    iconAlt: 'Information',
    title: 'Please Sign In',
    description: 'You need to sign in to access this page.',
    buttonText: 'Back to Login',
    buttonHref: '/login',
  },
};

export const CustomAction: Story = {
  args: {
    iconSrc: '/assets/images/confirmationForm/invalid-name.png',
    iconAlt: 'Warning',
    title: 'Account Locked',
    description:
      'Your account has been temporarily locked due to multiple failed login attempts. Please contact support to unlock.',
    buttonText: 'Contact Support',
    buttonHref: '/contact-support',
  },
};
