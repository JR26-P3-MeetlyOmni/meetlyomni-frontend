import { describe, expect, it } from 'vitest';

import React from 'react';

import { render, screen } from '@testing-library/react';

import { AuthResultPageComponent } from '../components/passwordReset/ResultPage';

// Mock Next.js components
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }) => <img src={src} alt={alt} width={width} height={height} />,
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    passHref,
  }: {
    href: string;
    children: React.ReactNode;
    passHref?: boolean;
  }) => (
    <a href={href} data-testid="link">
      {children}
    </a>
  ),
}));

// Mock PageBackground component
vi.mock('@/components/Auth/PageBackground', () => ({
  PageBackground: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-background">{children}</div>
  ),
}));

describe('AuthResultPageComponent', () => {
  const defaultProps = {
    iconSrc: '/test-icon.png',
    iconAlt: 'Test Icon',
    title: 'Test Title',
    description: 'Test Description',
  };

  it('should render with default props', () => {
    render(<AuthResultPageComponent {...defaultProps} />);

    expect(screen.getByTestId('page-background')).toBeInTheDocument();
    expect(screen.getByAltText('Test Icon')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Back to Login')).toBeInTheDocument();
    expect(screen.getByTestId('link')).toHaveAttribute('href', '/login');
  });

  it('should render with custom button text and href', () => {
    const customProps = {
      ...defaultProps,
      buttonText: 'Go Home',
      buttonHref: '/home',
    };

    render(<AuthResultPageComponent {...customProps} />);

    expect(screen.getByText('Go Home')).toBeInTheDocument();
    expect(screen.getByTestId('link')).toHaveAttribute('href', '/home');
  });

  it('should render icon with correct attributes', () => {
    render(<AuthResultPageComponent {...defaultProps} />);

    const icon = screen.getByAltText('Test Icon');
    expect(icon).toHaveAttribute('src', '/test-icon.png');
    expect(icon).toHaveAttribute('width', '44');
    expect(icon).toHaveAttribute('height', '44');
  });

  it('should render title with correct styling', () => {
    render(<AuthResultPageComponent {...defaultProps} />);

    const title = screen.getByText('Test Title');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('P'); // Typography renders as P by default
  });

  it('should render description with correct styling', () => {
    render(<AuthResultPageComponent {...defaultProps} />);

    const description = screen.getByText('Test Description');
    expect(description).toBeInTheDocument();
    expect(description.tagName).toBe('P'); // Typography with body2 variant
  });

  it('should render button with correct styling', () => {
    render(<AuthResultPageComponent {...defaultProps} />);

    const button = screen.getByText('Back to Login');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  it('should render all required elements', () => {
    render(<AuthResultPageComponent {...defaultProps} />);

    // Check all main elements are present
    expect(screen.getByTestId('page-background')).toBeInTheDocument();
    expect(screen.getByAltText('Test Icon')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Back to Login')).toBeInTheDocument();
    expect(screen.getByTestId('link')).toBeInTheDocument();
  });

  it('should handle empty button text', () => {
    const propsWithEmptyButton = {
      ...defaultProps,
      buttonText: '',
    };

    render(<AuthResultPageComponent {...propsWithEmptyButton} />);

    const link = screen.getByTestId('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/login');
  });

  it('should handle empty button href', () => {
    const propsWithEmptyHref = {
      ...defaultProps,
      buttonHref: '',
    };

    render(<AuthResultPageComponent {...propsWithEmptyHref} />);

    const link = screen.getByTestId('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '');
  });
});
