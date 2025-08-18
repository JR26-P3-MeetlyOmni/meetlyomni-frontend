// src/features/auth/components/CompanyNameStep/CompanyNameStep.test.tsx
import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CompanyNameStep from './CompanyNameStep';

// 与仓库里 Footer/FaqAccordion 测试保持一致，兼容各种运行时
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).React = React;

describe('CompanyNameStep', () => {
  it("renders label and placeholder 'Google'", () => {
    render(<CompanyNameStep onNext={() => {}} />);
    const input = screen.getByRole('textbox', { name: /company name/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Google');
  });

  it('disables Next button when input is empty', () => {
    render(<CompanyNameStep onNext={() => {}} />);
    const nextBtn = screen.getByRole('button', { name: /next/i });
    expect(nextBtn).toBeDisabled();
  });

  it('enables Next button when input has text', async () => {
    render(<CompanyNameStep onNext={() => {}} />);
    const input = screen.getByRole('textbox', { name: /company name/i });
    await userEvent.type(input, 'Google');
    const nextBtn = screen.getByRole('button', { name: /next/i });
    expect(nextBtn).toBeEnabled();
  });

  it('shows error after blur on empty input', async () => {
    render(<CompanyNameStep onNext={() => {}} />);
    const input = screen.getByRole('textbox', { name: /company name/i });
    await userEvent.click(input);
    await userEvent.tab();
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('submits trimmed value and calls onNext', async () => {
    const onNext = vi.fn();
    render(<CompanyNameStep onNext={onNext} />);
    const input = screen.getByRole('textbox', { name: /company name/i });
    await userEvent.type(input, '  Google  ');
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(onNext).toHaveBeenCalledWith('Google');
  });
});
