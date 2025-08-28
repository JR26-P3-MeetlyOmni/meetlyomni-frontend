import type { Meta, StoryObj } from '@storybook/nextjs';

import PasswordValidation from '../components/passwordReset/PasswordValidation';

const meta: Meta<typeof PasswordValidation> = {
  title: 'Auth/ForgetPassword/PasswordValidation',
  component: PasswordValidation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Password validation rules display component. Shows password requirements with visual feedback on completion.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isLengthOk: { control: 'boolean', description: 'Whether minimum length requirement is met' },
    isCaseOk: { control: 'boolean', description: 'Whether case requirements are met' },
    isNumSpecialOk: {
      control: 'boolean',
      description: 'Whether number/special char requirements are met',
    },
    hasInput: { control: 'boolean', description: 'Whether user has entered any input' },
    isStrong: { control: 'boolean', description: 'Whether all requirements are met' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const NoInput: Story = {
  args: {
    isLengthOk: false,
    isCaseOk: false,
    isNumSpecialOk: false,
    hasInput: false,
    isStrong: false,
  },
};

export const WeakPassword: Story = {
  args: {
    isLengthOk: false,
    isCaseOk: false,
    isNumSpecialOk: false,
    hasInput: true,
    isStrong: false,
  },
};

export const PartiallyStrong: Story = {
  args: {
    isLengthOk: true,
    isCaseOk: true,
    isNumSpecialOk: false,
    hasInput: true,
    isStrong: false,
  },
};

export const AllRequirementsMet: Story = {
  args: {
    isLengthOk: true,
    isCaseOk: true,
    isNumSpecialOk: true,
    hasInput: true,
    isStrong: true,
  },
};
