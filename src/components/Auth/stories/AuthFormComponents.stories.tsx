import React, { useState } from 'react';

import { Box } from '@mui/material';

import type { Meta, StoryObj } from '@storybook/nextjs';

import {
  FormContainer,
  FormTitle,
  SectionLabel,
  StyledSectionLabel,
  StyledSubmitButton,
  StyledTextField,
  SubmitButton,
} from '../AuthFormComponents';

// Component wrapper for layout
const ComponentWrapper = ({
  children,
  width = '400px',
}: {
  children: React.ReactNode;
  width?: string;
}) => <div style={{ width, padding: '20px', minHeight: '200px' }}>{children}</div>;

// FormContainer Stories
const FormContainerMeta: Meta<typeof FormContainer> = {
  title: 'Auth/Components/FormContainer',
  component: FormContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Styled container component for authentication forms. Provides consistent spacing, background, and responsive design.',
      },
    },
  },
  tags: ['autodocs'],
};

export default FormContainerMeta;

export const FormContainerDefault: StoryObj<typeof FormContainer> = {
  render: () => (
    <div style={{ width: '500px', height: '400px', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <FormContainer>
        <FormTitle>Sample Form</FormTitle>
        <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '4px' }}>
          Form content goes here
        </div>
      </FormContainer>
    </div>
  ),
};

export const FormContainerWithContent: StoryObj<typeof FormContainer> = {
  render: () => (
    <div style={{ width: '600px', height: '500px', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <FormContainer>
        <FormTitle>Login Form</FormTitle>
        <StyledSectionLabel>Email</StyledSectionLabel>
        <StyledTextField fullWidth placeholder="Enter your email" type="email" />
        <StyledSectionLabel>Password</StyledSectionLabel>
        <StyledTextField fullWidth placeholder="Enter your password" type="password" />
        <StyledSubmitButton fullWidth>Sign In</StyledSubmitButton>
      </FormContainer>
    </div>
  ),
};

// FormTitle Stories
const _FormTitleMeta: Meta<typeof FormTitle> = {
  title: 'Auth/Components/FormTitle',
  component: FormTitle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Styled typography component for form titles. Responsive font size and consistent styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: 'Title text content' },
  },
};

export const FormTitleDefault: StoryObj<typeof FormTitle> = {
  args: {
    children: 'Welcome Back',
  },
  render: args => (
    <ComponentWrapper>
      <FormTitle {...args} />
    </ComponentWrapper>
  ),
};

export const FormTitleVariations: StoryObj<typeof FormTitle> = {
  render: () => (
    <div style={{ width: '500px', padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Short Title</h3>
        <FormTitle>Login</FormTitle>
      </div>
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Medium Title</h3>
        <FormTitle>Reset Password</FormTitle>
      </div>
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Long Title</h3>
        <FormTitle>Create Your New Account</FormTitle>
      </div>
    </div>
  ),
};

// TextField Stories
const _TextFieldMeta: Meta<typeof StyledTextField> = {
  title: 'Auth/Components/StyledTextField',
  component: StyledTextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Styled Material-UI TextField component with consistent theming for authentication forms.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    type: { control: 'select', options: ['text', 'email', 'password', 'number'] },
    error: { control: 'boolean' },
    helperText: { control: 'text' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

const InteractiveTextField = (args: any) => {
  const [value, setValue] = useState(args.value || '');

  return (
    <ComponentWrapper>
      <StyledTextField
        {...args}
        value={value}
        onChange={function handleChange(e) {
          setValue(e.target.value);
        }}
      />
    </ComponentWrapper>
  );
};

export const TextFieldDefault: StoryObj<typeof StyledTextField> = {
  args: {
    placeholder: 'Enter text...',
    fullWidth: true,
  },
  render: InteractiveTextField,
};

export const TextFieldEmail: StoryObj<typeof StyledTextField> = {
  args: {
    type: 'email',
    placeholder: 'Enter your email address',
    fullWidth: true,
  },
  render: InteractiveTextField,
};

export const TextFieldPassword: StoryObj<typeof StyledTextField> = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
    fullWidth: true,
  },
  render: InteractiveTextField,
};

export const TextFieldWithError: StoryObj<typeof StyledTextField> = {
  args: {
    placeholder: 'Enter email',
    error: true,
    helperText: 'Please enter a valid email address',
    fullWidth: true,
  },
  render: InteractiveTextField,
};

export const TextFieldDisabled: StoryObj<typeof StyledTextField> = {
  args: {
    placeholder: 'Disabled field',
    disabled: true,
    value: 'Cannot edit this',
    fullWidth: true,
  },
  render: function renderDisabled(args) {
    return (
      <ComponentWrapper>
        <StyledTextField {...args} />
      </ComponentWrapper>
    );
  },
};

// Button Stories
const _ButtonMeta: Meta<typeof SubmitButton> = {
  title: 'Auth/Components/SubmitButton',
  component: SubmitButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Styled Material-UI Button component for form submissions with consistent theming.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
  },
};

export const ButtonDefault: StoryObj<typeof SubmitButton> = {
  args: {
    children: 'Submit',
  },
  render: function renderButtonDefault(args) {
    return (
      <ComponentWrapper>
        <SubmitButton {...args} />
      </ComponentWrapper>
    );
  },
};

export const ButtonFullWidth: StoryObj<typeof SubmitButton> = {
  args: {
    children: 'Sign In',
    fullWidth: true,
  },
  render: function renderButtonFullWidth(args) {
    return (
      <ComponentWrapper>
        <SubmitButton {...args} />
      </ComponentWrapper>
    );
  },
};

export const ButtonDisabled: StoryObj<typeof SubmitButton> = {
  args: {
    children: 'Please Wait...',
    disabled: true,
    fullWidth: true,
  },
  render: function renderButtonDisabled(args) {
    return (
      <ComponentWrapper>
        <SubmitButton {...args} />
      </ComponentWrapper>
    );
  },
};

export const ButtonVariations: StoryObj<typeof SubmitButton> = {
  render: function renderButtonVariations() {
    return (
      <div style={{ width: '400px', padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Default Button</h3>
          <SubmitButton>Sign In</SubmitButton>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Full Width Button</h3>
          <SubmitButton fullWidth>Create Account</SubmitButton>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Disabled State</h3>
          <SubmitButton disabled fullWidth>
            Loading...
          </SubmitButton>
        </div>
      </div>
    );
  },
};

// Label Stories
const _LabelMeta: Meta<typeof SectionLabel> = {
  title: 'Auth/Components/SectionLabel',
  component: SectionLabel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Styled typography component for form field labels with consistent theming.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
  },
};

export const LabelDefault: StoryObj<typeof SectionLabel> = {
  args: {
    children: 'Email Address',
  },
  render: function renderLabelDefault(args) {
    return (
      <ComponentWrapper>
        <SectionLabel {...args} />
      </ComponentWrapper>
    );
  },
};

export const LabelVariations: StoryObj<typeof SectionLabel> = {
  render: function renderLabelVariations() {
    return (
      <div style={{ width: '400px', padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <SectionLabel>Email</SectionLabel>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <SectionLabel>Password</SectionLabel>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <SectionLabel>Confirm Password</SectionLabel>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <StyledSectionLabel>Styled Label with Margin</StyledSectionLabel>
        </div>
      </div>
    );
  },
};

// Complete Form Example
const _FormExampleMeta: Meta = {
  title: 'Auth/Components/CompleteForm',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Complete example showing all Auth form components working together in a realistic login form.',
      },
    },
  },
  tags: ['autodocs'],
};

export const CompleteLoginForm: StoryObj = {
  render: function renderCompleteForm() {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      // Simple validation
      const newErrors: { email?: string; password?: string } = {};
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.password) newErrors.password = 'Password is required';

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Login simulation complete!');
      }, 2000);
    };

    return (
      <div style={{ width: '600px', height: '600px', backgroundColor: '#f5f5f5', padding: '40px' }}>
        <FormContainer>
          <FormTitle>Welcome Back</FormTitle>
          <Box component="form" onSubmit={handleSubmit}>
            <StyledSectionLabel>Email</StyledSectionLabel>
            <StyledTextField
              fullWidth
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={function handleEmailChange(e) {
                setFormData(prev => ({ ...prev, email: e.target.value }));
              }}
              error={!!errors.email}
              helperText={errors.email}
              disabled={isSubmitting}
            />

            <StyledSectionLabel>Password</StyledSectionLabel>
            <StyledTextField
              fullWidth
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={function handlePasswordChange(e) {
                setFormData(prev => ({ ...prev, password: e.target.value }));
              }}
              error={!!errors.password}
              helperText={errors.password}
              disabled={isSubmitting}
            />

            <StyledSubmitButton type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </StyledSubmitButton>
          </Box>
        </FormContainer>
      </div>
    );
  },
};
