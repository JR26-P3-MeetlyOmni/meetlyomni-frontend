import { describe, expect, test } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import NavBar from './NavBar';

describe('NavBar Component', () => {
  test('render logo, nav links, and buttons when not logged in', () => {
    render(<NavBar />);

    const logo = screen.getByAltText('Omni Logo');
    expect(logo).toBeInTheDocument();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();

    const signInButton = screen.getByText('Sign In');
    const getStartedButton = screen.getByText('Get Started');
    expect(signInButton).toBeInTheDocument();
    expect(getStartedButton).toBeInTheDocument();
  });
});
