import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';

import PasswordValidationRules from '../components/passwordReset/PasswordValidationRules';

const meta: Meta<typeof PasswordValidationRules> = {
  title: 'Auth/ForgetPassword/PasswordValidationRules',
  component: PasswordValidationRules,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Password validation rules display component. Shows checkmarks for password requirements that are met and grayed out text for unmet requirements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isLengthOk: { control: 'boolean', description: 'Whether password meets minimum length requirement (12 chars)' },
    isCaseOk: { control: 'boolean', description: 'Whether password has both uppercase and lowercase letters' },
    isNumSpecialOk: { control: 'boolean', description: 'Whether password has both numbers and special characters' },
    hasInput: { control: 'boolean', description: 'Whether user has started typing (controls visibility)' },
    isStrong: { control: 'boolean', description: 'Whether password meets all requirements (hides component when true)' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - no requirements met
export const Default: Story = {
  args: {
    isLengthOk: false,
    isCaseOk: false,
    isNumSpecialOk: false,
    hasInput: true,
    isStrong: false,
  },
  render: (args) => (
    <div style={{ width: '400px', padding: '20px' }}>
      <PasswordValidationRules {...args} />
    </div>
  ),
};

// Length requirement met
export const LengthOk: Story = {
  args: {
    isLengthOk: true,
    isCaseOk: false,
    isNumSpecialOk: false,
    hasInput: true,
    isStrong: false,
  },
  render: (args) => (
    <div style={{ width: '400px', padding: '20px' }}>
      <PasswordValidationRules {...args} />
    </div>
  ),
};

// Length and case requirements met
export const LengthAndCaseOk: Story = {
  args: {
    isLengthOk: true,
    isCaseOk: true,
    isNumSpecialOk: false,
    hasInput: true,
    isStrong: false,
  },
  render: (args) => (
    <div style={{ width: '400px', padding: '20px' }}>
      <PasswordValidationRules {...args} />
    </div>
  ),
};

// Almost all requirements met
export const AlmostComplete: Story = {
  args: {
    isLengthOk: true,
    isCaseOk: true,
    isNumSpecialOk: false,
    hasInput: true,
    isStrong: false,
  },
  render: (args) => (
    <div style={{ width: '400px', padding: '20px' }}>
      <PasswordValidationRules {...args} />
    </div>
  ),
};

// All requirements met (component should be hidden)
export const AllComplete: Story = {
  args: {
    isLengthOk: true,
    isCaseOk: true,
    isNumSpecialOk: true,
    hasInput: true,
    isStrong: true,
  },
  render: (args) => (
    <div style={{ width: '400px', padding: '20px', border: '1px dashed #ccc', minHeight: '60px' }}>
      <div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
        Component should be hidden when isStrong=true:
      </div>
      <PasswordValidationRules {...args} />
      {args.isStrong && (
        <div style={{ fontSize: '14px', color: '#4caf50', fontStyle: 'italic' }}>
          ✓ All requirements met - component is hidden
        </div>
      )}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'When all password requirements are met (isStrong=true), the component returns null and is not displayed.',
      },
    },
  },
};

// No input yet (component should be hidden)
export const NoInput: Story = {
  args: {
    isLengthOk: false,
    isCaseOk: false,
    isNumSpecialOk: false,
    hasInput: false,
    isStrong: false,
  },
  render: (args) => (
    <div style={{ width: '400px', padding: '20px', border: '1px dashed #ccc', minHeight: '60px' }}>
      <div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
        Component should be hidden when hasInput=false:
      </div>
      <PasswordValidationRules {...args} />
      {!args.hasInput && (
        <div style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
          Component is hidden until user starts typing
        </div>
      )}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'When user has not started typing (hasInput=false), the component returns null and is not displayed.',
      },
    },
  },
};

// Mixed states for demonstration
export const MixedValidation: Story = {
  args: {
    isLengthOk: true,
    isCaseOk: false,
    isNumSpecialOk: true,
    hasInput: true,
    isStrong: false,
  },
  render: (args) => (
    <div style={{ width: '400px', padding: '20px' }}>
      <div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
        Example: Password &quot;MyPassword123!&quot; (missing lowercase)
      </div>
      <PasswordValidationRules {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example showing mixed validation states - some requirements met, others not.',
      },
    },
  },
};

// Showcase different validation combinations
export const ValidationStates: Story = {
  render: () => (
    <div style={{ width: '500px', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Weak Password (only lowercase)</h3>
        <PasswordValidationRules 
          isLengthOk={false}
          isCaseOk={false}
          isNumSpecialOk={false}
          hasInput={true}
          isStrong={false}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Getting Better (length + case)</h3>
        <PasswordValidationRules 
          isLengthOk={true}
          isCaseOk={true}
          isNumSpecialOk={false}
          hasInput={true}
          isStrong={false}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Almost There (missing numbers/special)</h3>
        <PasswordValidationRules 
          isLengthOk={true}
          isCaseOk={true}
          isNumSpecialOk={false}
          hasInput={true}
          isStrong={false}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different validation states showing password strength progression.',
      },
    },
  },
};