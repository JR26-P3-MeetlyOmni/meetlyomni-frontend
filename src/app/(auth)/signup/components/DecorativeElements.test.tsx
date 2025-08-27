// src/app/(auth)/signup/components/DecorativeElements.test.tsx
import { beforeEach, describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

async function loadDecorativeElementsWithMQ(match: boolean) {
  vi.resetModules();
  vi.doMock('@mui/material/useMediaQuery', () => ({
    __esModule: true,
    default: () => match,
  }));
  const mod = await import('./DecorativeElements');
  return mod.DecorativeElements;
}

describe('DecorativeElements', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing on small screens (no overlap risk)', async () => {
    const DecorativeElements = await loadDecorativeElementsWithMQ(false);
    const { container } = render(<DecorativeElements />);
    expect(container.firstChild).toBeNull();
  });

  it('renders all decorative images on large screens', async () => {
    const DecorativeElements = await loadDecorativeElementsWithMQ(true);
    render(<DecorativeElements />);

    expect(screen.getByAltText('Omni Logo')).toBeInTheDocument();
    expect(screen.getByAltText('Magnifying glass')).toBeInTheDocument();
    expect(screen.getByAltText('Rachel')).toBeInTheDocument();
    expect(screen.getByAltText('Mark')).toBeInTheDocument();
    expect(screen.getByAltText('Looking For')).toBeInTheDocument();
    expect(screen.getByAltText('Form')).toBeInTheDocument();
    expect(screen.getByAltText('Star')).toBeInTheDocument();
  });
});
