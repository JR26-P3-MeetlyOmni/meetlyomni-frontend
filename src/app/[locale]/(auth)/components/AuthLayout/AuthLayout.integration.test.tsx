// AuthLayout.integration.test.tsx
import { describe, expect, it } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import AuthLayout from './AuthLayout';

describe('AuthLayout Integration Test', () => {
  it('should render Branding and child content', () => {
    render(
      <AuthLayout>
        <div>
          <h1>Mock Form</h1>
          <p>Mock Form Description</p>
        </div>
      </AuthLayout>,
    );

    expect(screen.getByText('Mock Form')).toBeInTheDocument();
    expect(screen.getByText('Mock Form Description')).toBeInTheDocument();

    expect(screen.getByText(/Get started with/i)).toBeInTheDocument();
    expect(screen.getByText(/Find the perfect time/i)).toBeInTheDocument();
    expect(screen.getByText(/automated reminders/i)).toBeInTheDocument();
    expect(screen.getByText(/calendar synchronisation/i)).toBeInTheDocument();

    const illustration = screen.getByAltText('Meetly Illustration');
    const decoration = screen.getByAltText('Branding Decoration');

    expect(illustration).toBeInTheDocument();
    expect(decoration).toBeInTheDocument();
  });
});
