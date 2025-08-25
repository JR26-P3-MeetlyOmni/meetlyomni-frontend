import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { DecorativeElements } from './DecorativeElements';

describe('DecorativeElements', () => {
  it('renders without crashing', () => {
    const { getByAltText } = render(<DecorativeElements />);
    expect(getByAltText('Omni Logo')).toBeInTheDocument();
  });
});
