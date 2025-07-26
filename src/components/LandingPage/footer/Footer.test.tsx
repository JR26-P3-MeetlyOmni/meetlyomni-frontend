import { describe, expect, it } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Footer from './Footer';

// 手动设置全局 React (模拟其他组员的做法)
(global as any).React = React;

describe('Footer Component', () => {
  it('should render footer element', () => {
    render(<Footer />);
    const footer = document.querySelector('footer');
    expect(footer).toBeTruthy();
  });

  it('should display company logo', () => {
    render(<Footer />);
    const logo = screen.getByAltText('Omni Logo');
    expect(logo).toBeTruthy();
  });

  it('should display copyright text', () => {
    render(<Footer />);
    const copyright = screen.getByText('© 2025 Meetly Omni. All rights reserved.');
    expect(copyright).toBeTruthy();
  });
}); 
