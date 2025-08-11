import { describe, expect, it } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CompanyNameStep from './CompanyNameStep';

describe('CompanyNameStep', () => {
  // 顶层常量：稳定的空函数（no-op），满足必填的 onNext，不触发 jsx-no-bind
  const noop = (_: string) => {};

  // 小工具：每个 it() 开始时都渲染一次组件，避免重复代码
  const renderComp = () => {
    render(<CompanyNameStep onNext={noop} />);
  };

  it("renders label and placeholder 'Google'", () => {
    renderComp();
    const input = screen.getByRole('textbox', { name: /company name/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Google');
  });

  it('disables Next button when input is empty', () => {
    renderComp();
    const nextBtn = screen.getByRole('button', { name: /next/i });
    expect(nextBtn).toBeDisabled();
  });

  it('enables Next button when input has text', async () => {
    renderComp();
    const input = screen.getByRole('textbox', { name: /company name/i });
    await userEvent.type(input, 'Google');
    const nextBtn = screen.getByRole('button', { name: /next/i });
    expect(nextBtn).toBeEnabled();
  });

  it('shows error after blur on empty input', async () => {
    renderComp();
    const input = screen.getByRole('textbox', { name: /company name/i });
    await userEvent.click(input);
    await userEvent.tab(); // 触发 blur
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });
});
