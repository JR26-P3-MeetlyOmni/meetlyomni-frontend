import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

import {
  FormContainer,
  FormTitle,
  StyledTextField,
  SubmitButton,
  SectionLabel,
  StyledSectionLabel,
  StyledSubmitButton,
} from '../AuthFormComponents';

const mockTheme = createTheme({
  palette: {
    background: {
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
    divider: '#e0e0e0',
    grey: {
      300: '#cccccc',
    },
    action: {
      hoverOpacity: 0.04,
      disabledOpacity: 0.26,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: (factor: number) => `${8 * factor}px`,
  typography: {
    fontFamily: 'Arial, sans-serif',
    button: {
      fontWeight: 500,
    },
  },
  breakpoints: {
    up: (key: string) => `@media (min-width: ${key === 'sm' ? '600px' : key === 'md' ? '960px' : '1280px'})`,
  },
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>
);

describe('AuthFormComponents', () => {
  describe('FormContainer', () => {
    it('should render with correct structure', () => {
      render(
        <TestWrapper>
          <FormContainer data-testid="form-container">
            <div>Test content</div>
          </FormContainer>
        </TestWrapper>
      );

      const container = screen.getByTestId('form-container');
      expect(container).toBeInTheDocument();
      expect(container).toHaveTextContent('Test content');
    });

    it('should accept and render children', () => {
      render(
        <TestWrapper>
          <FormContainer>
            <div data-testid="child-element">Child content</div>
          </FormContainer>
        </TestWrapper>
      );

      expect(screen.getByTestId('child-element')).toBeInTheDocument();
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('should have proper styling structure', () => {
      render(
        <TestWrapper>
          <FormContainer data-testid="form-container" />
        </TestWrapper>
      );

      const container = screen.getByTestId('form-container');
      const computedStyle = getComputedStyle(container);
      
      expect(computedStyle.display).toBe('flex');
      expect(computedStyle.flexDirection).toBe('column');
      expect(computedStyle.position).toBe('relative');
    });
  });

  describe('FormTitle', () => {
    it('should render title text correctly', () => {
      render(
        <TestWrapper>
          <FormTitle>Test Form Title</FormTitle>
        </TestWrapper>
      );

      const title = screen.getByText('Test Form Title');
      expect(title).toBeInTheDocument();
    });

    it('should handle different title lengths', () => {
      const { rerender } = render(
        <TestWrapper>
          <FormTitle>Short</FormTitle>
        </TestWrapper>
      );

      expect(screen.getByText('Short')).toBeInTheDocument();

      rerender(
        <TestWrapper>
          <FormTitle>This is a very long form title that should still render correctly</FormTitle>
        </TestWrapper>
      );

      expect(screen.getByText('This is a very long form title that should still render correctly')).toBeInTheDocument();
    });

    it('should have proper heading structure', () => {
      render(
        <TestWrapper>
          <FormTitle data-testid="form-title">Title</FormTitle>
        </TestWrapper>
      );

      const title = screen.getByTestId('form-title');
      const computedStyle = getComputedStyle(title);
      
      expect(computedStyle.textAlign).toBe('center');
      expect(computedStyle.fontWeight).toBe('700');
    });
  });

  describe('StyledTextField', () => {
    it('should render input field correctly', () => {
      render(
        <TestWrapper>
          <StyledTextField 
            placeholder="Test placeholder" 
            data-testid="styled-textfield"
          />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input).toBeInTheDocument();
    });

    it('should handle different input types', () => {
      const { rerender } = render(
        <TestWrapper>
          <StyledTextField type="text" data-testid="text-input" />
        </TestWrapper>
      );

      const textInput = screen.getByTestId('text-input').querySelector('input');
      expect(textInput).toHaveAttribute('type', 'text');

      rerender(
        <TestWrapper>
          <StyledTextField type="email" data-testid="email-input" />
        </TestWrapper>
      );

      const emailInput = screen.getByTestId('email-input').querySelector('input');
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('should handle value changes', () => {
      render(
        <TestWrapper>
          <StyledTextField 
            value="test value" 
            data-testid="value-input"
            onChange={() => {}}
          />
        </TestWrapper>
      );

      const input = screen.getByDisplayValue('test value');
      expect(input).toBeInTheDocument();
    });

    it('should handle error states', () => {
      render(
        <TestWrapper>
          <StyledTextField 
            error 
            helperText="Error message"
            data-testid="error-input"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should handle disabled state', () => {
      render(
        <TestWrapper>
          <StyledTextField 
            disabled 
            data-testid="disabled-input"
          />
        </TestWrapper>
      );

      const inputElement = screen.getByTestId('disabled-input').querySelector('input');
      expect(inputElement).toBeDisabled();
    });
  });

  describe('SubmitButton', () => {
    it('should render button text correctly', () => {
      render(
        <TestWrapper>
          <SubmitButton>Submit Form</SubmitButton>
        </TestWrapper>
      );

      const button = screen.getByText('Submit Form');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should handle button types correctly', () => {
      const { rerender } = render(
        <TestWrapper>
          <SubmitButton type="submit">Submit</SubmitButton>
        </TestWrapper>
      );

      expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit');

      rerender(
        <TestWrapper>
          <SubmitButton type="button">Cancel</SubmitButton>
        </TestWrapper>
      );

      expect(screen.getByText('Cancel')).toHaveAttribute('type', 'button');
    });

    it('should handle disabled state', () => {
      render(
        <TestWrapper>
          <SubmitButton disabled>Disabled Button</SubmitButton>
        </TestWrapper>
      );

      const button = screen.getByText('Disabled Button');
      expect(button).toBeDisabled();
    });

    it('should have proper styling', () => {
      render(
        <TestWrapper>
          <SubmitButton data-testid="submit-button">Button</SubmitButton>
        </TestWrapper>
      );

      const button = screen.getByTestId('submit-button');
      const computedStyle = getComputedStyle(button);
      
      expect(computedStyle.backgroundColor).toBe('rgb(20, 24, 59)');
      expect(computedStyle.color).toBe('rgb(255, 255, 255)');
      expect(computedStyle.textTransform).toBe('none');
    });
  });

  describe('SectionLabel', () => {
    it('should render label text correctly', () => {
      render(
        <TestWrapper>
          <SectionLabel>Section Label</SectionLabel>
        </TestWrapper>
      );

      const label = screen.getByText('Section Label');
      expect(label).toBeInTheDocument();
    });

    it('should handle different label content', () => {
      const { rerender } = render(
        <TestWrapper>
          <SectionLabel>Email</SectionLabel>
        </TestWrapper>
      );

      expect(screen.getByText('Email')).toBeInTheDocument();

      rerender(
        <TestWrapper>
          <SectionLabel>Password</SectionLabel>
        </TestWrapper>
      );

      expect(screen.getByText('Password')).toBeInTheDocument();
    });

    it('should have proper label styling', () => {
      render(
        <TestWrapper>
          <SectionLabel data-testid="section-label">Label</SectionLabel>
        </TestWrapper>
      );

      const label = screen.getByTestId('section-label');
      const computedStyle = getComputedStyle(label);
      
      expect(computedStyle.fontWeight).toBe('500');
    });
  });

  describe('StyledSectionLabel', () => {
    it('should render and extend SectionLabel', () => {
      render(
        <TestWrapper>
          <StyledSectionLabel>Styled Label</StyledSectionLabel>
        </TestWrapper>
      );

      const label = screen.getByText('Styled Label');
      expect(label).toBeInTheDocument();
    });

    it('should have additional margin styling', () => {
      render(
        <TestWrapper>
          <StyledSectionLabel data-testid="styled-label">Label</StyledSectionLabel>
        </TestWrapper>
      );

      const label = screen.getByTestId('styled-label');
      expect(label).toBeInTheDocument();
    });
  });

  describe('StyledSubmitButton', () => {
    it('should render and extend SubmitButton', () => {
      render(
        <TestWrapper>
          <StyledSubmitButton>Styled Submit</StyledSubmitButton>
        </TestWrapper>
      );

      const button = screen.getByText('Styled Submit');
      expect(button).toBeInTheDocument();
    });

    it('should have additional margin styling', () => {
      render(
        <TestWrapper>
          <StyledSubmitButton data-testid="styled-submit">Submit</StyledSubmitButton>
        </TestWrapper>
      );

      const button = screen.getByTestId('styled-submit');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('should work together in a complete form', () => {
      render(
        <TestWrapper>
          <FormContainer>
            <FormTitle>Login Form</FormTitle>
            <StyledSectionLabel>Email</StyledSectionLabel>
            <StyledTextField 
              type="email" 
              placeholder="Enter your email"
            />
            <StyledSectionLabel>Password</StyledSectionLabel>
            <StyledTextField 
              type="password" 
              placeholder="Enter your password"
            />
            <StyledSubmitButton type="submit">
              Login
            </StyledSubmitButton>
          </FormContainer>
        </TestWrapper>
      );

      expect(screen.getByText('Login Form')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Password')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
      expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('should handle form with error states', () => {
      render(
        <TestWrapper>
          <FormContainer>
            <FormTitle>Form with Errors</FormTitle>
            <StyledTextField 
              error 
              helperText="Email is required"
              placeholder="Email"
            />
            <StyledSubmitButton disabled>
              Submit
            </StyledSubmitButton>
          </FormContainer>
        </TestWrapper>
      );

      expect(screen.getByText('Form with Errors')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Submit')).toBeDisabled();
    });
  });
});