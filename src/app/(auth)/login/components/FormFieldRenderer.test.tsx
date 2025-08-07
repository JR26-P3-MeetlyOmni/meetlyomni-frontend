import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import { render, screen } from '@testing-library/react';

import type { FormFieldRendererProps } from '../types';
import { FormFieldRenderer } from './FormFieldRenderer';

const mockHandleInputChange = vi.fn();

const createDefaultProps = (): FormFieldRendererProps => ({
  config: {
    key: 'email',
    label: 'Email',
    placeholder: 'Email Address',
    type: 'email',
  },
  formData: {
    email: '',
    password: '',
  },
  errors: {},
  handleInputChange: mockHandleInputChange,
});

describe('FormFieldRenderer Component', () => {
  describe('Basic Rendering', () => {
    it('should render form field with correct label and placeholder', () => {
      render(<FormFieldRenderer {...createDefaultProps()} />);

      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    });

    it('should render password field with correct type', () => {
      const passwordProps: FormFieldRendererProps = {
        ...createDefaultProps(),
        config: {
          key: 'password',
          label: 'Password',
          placeholder: 'Password',
          type: 'password',
        },
      };

      render(<FormFieldRenderer {...passwordProps} />);

      const passwordField = screen.getByLabelText('Password');
      expect(passwordField).toHaveAttribute('type', 'password');
    });
  });

  describe('Field Values and Types', () => {
    it('should display field value correctly', () => {
      const propsWithValue: FormFieldRendererProps = {
        ...createDefaultProps(),
        formData: {
          email: 'test@example.com',
          password: '',
        },
      };

      render(<FormFieldRenderer {...propsWithValue} />);

      const emailField = screen.getByLabelText('Email');
      expect(emailField).toHaveValue('test@example.com');
    });

    it('should use default text type when no type is specified', () => {
      const propsWithoutType: FormFieldRendererProps = {
        ...createDefaultProps(),
        config: {
          key: 'email',
          label: 'Email',
          placeholder: 'Email Address',
          // type is undefined
        },
      };

      render(<FormFieldRenderer {...propsWithoutType} />);

      const emailField = screen.getByLabelText('Email');
      expect(emailField).toHaveAttribute('type', 'text');
    });
  });

  describe('Error Handling', () => {
    it('should display error message when field has error', () => {
      const propsWithError: FormFieldRendererProps = {
        ...createDefaultProps(),
        errors: {
          email: 'Email is required',
        },
      };

      render(<FormFieldRenderer {...propsWithError} />);

      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
    });

    it('should render field without error styling when no error', () => {
      render(<FormFieldRenderer {...createDefaultProps()} />);

      const emailField = screen.getByLabelText('Email');
      expect(emailField).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('User Interactions', () => {
    it('should call handleInputChange when field value changes', () => {
      render(<FormFieldRenderer {...createDefaultProps()} />);

      const emailField = screen.getByLabelText('Email');
      emailField.focus();
      emailField.blur();

      expect(mockHandleInputChange).toHaveBeenCalledWith('email');
    });

    it('should render field with correct accessibility attributes', () => {
      render(<FormFieldRenderer {...createDefaultProps()} />);

      const emailField = screen.getByLabelText('Email');
      expect(emailField).toHaveAttribute('type', 'email');
      expect(emailField).toHaveAttribute('placeholder', 'Email Address');
    });
  });
});
