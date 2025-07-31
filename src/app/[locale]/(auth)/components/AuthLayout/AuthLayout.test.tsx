// AuthLayout.test.tsx
import { describe, expect, it } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import AuthLayout from './AuthLayout';

describe('AuthLayout', () => {
  it('renders children correctly', () => {
    render(
      <AuthLayout>
        <div data-testid="test-form">Test Form Content</div>
      </AuthLayout>,
    );

    // ✅ 检查子元素是否渲染
    expect(screen.getByTestId('test-form')).toBeInTheDocument();
  });

  it('renders Branding component', () => {
    render(
      <AuthLayout>
        <div>Dummy</div>
      </AuthLayout>,
    );

    // ✅ 检查 Branding 中的标题（Snapshot 替代）
    expect(screen.getByText(/get started with/i)).toBeInTheDocument();
    expect(screen.getByText(/find the perfect time/i)).toBeInTheDocument();
  });
});
