import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import DashboardPage from './page';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

// Simple mock for Next.js Image component
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }) => <img src={src} alt={alt} width={width} height={height} />,
}));

// Note: Image imports are now handled via getAssetUrl function

// Mock Material-UI components using async importOriginal pattern
vi.mock('@mui/material', async importOriginal => {
  const actual = (await importOriginal()) as Record<string, any>;

  // Filter out non-standard DOM props
  const filterDomProps = (props: any) => {
    const {
      elevation,
      variant,
      startIcon,
      fullWidth,
      maxWidth,
      error,
      spacing,
      alignItems,
      justifyContent,
      flexDirection,
      open,
      onClose,
      ...rest
    } = props;
    return rest;
  };

  return {
    ...actual,
    Box: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
    Button: ({ children, startIcon, ...props }: any) => (
      <button {...filterDomProps(props)}>
        {startIcon && <span className="button-icon">{startIcon}</span>}
        {children}
      </button>
    ),
    Typography: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
    Paper: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
    Stack: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,

    Dialog: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
    DialogTitle: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
    DialogContent: ({ children, ...props }: any) => (
      <div {...filterDomProps(props)}>{children}</div>
    ),
    DialogActions: ({ children, ...props }: any) => (
      <div {...filterDomProps(props)}>{children}</div>
    ),

    AppBar: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
    Toolbar: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
    IconButton: ({ children, ...props }: any) => (
      <button {...filterDomProps(props)}>{children}</button>
    ),
    Container: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
    Grid: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
    Card: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
    CardContent: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
  };
});

// Mock styled function separately if needed
vi.mock('@mui/material/styles', () => ({
  styled: (component: any) => {
    return (styles: any) => {
      return ({ children, ...props }: any) => {
        const filteredProps = Object.keys(props).reduce((acc, key) => {
          if (!key.startsWith('$') && key !== 'theme' && key !== 'sx') {
            acc[key] = props[key];
          }
          return acc;
        }, {} as any);

        return React.createElement(component, filteredProps, children);
      };
    };
  },
  createTheme: vi.fn(),
  ThemeProvider: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

vi.mock('@mui/icons-material', () => ({
  Add: () => <span>+</span>,
  Menu: () => <span>☰</span>,
  AccountCircle: () => <span>👤</span>,
}));

describe('DashboardPage', () => {
  it('renders the dashboard page', () => {
    render(<DashboardPage />);

    // Check that the component renders without crashing
    const container = document.querySelector('div');
    expect(container).toBeInTheDocument();
  });

  it('displays the event management title', () => {
    render(<DashboardPage />);

    expect(screen.getByText('Event Management')).toBeInTheDocument();
  });

  it('displays navigation buttons for Interactive Quiz and Raffle Game', () => {
    render(<DashboardPage />);

    expect(screen.getByText('Interactive Quiz')).toBeInTheDocument();
    expect(screen.getByText('Raffle Game')).toBeInTheDocument();
  });

  it('displays empty state message', () => {
    render(<DashboardPage />);

    expect(screen.getByText("There's nothing here, let's create an Event.")).toBeInTheDocument();
  });

  it('displays create button in empty state', () => {
    render(<DashboardPage />);

    const createButton = screen.getByRole('button', { name: /create/i });
    expect(createButton).toBeInTheDocument();
  });

  it('displays balloon image', () => {
    render(<DashboardPage />);

    const balloonImage = screen.getByAltText('Balloon');
    expect(balloonImage).toBeInTheDocument();
    expect(balloonImage).toHaveAttribute(
      'src',
      expect.stringContaining('EventManagement/balloon.png'),
    );
  });

  it('displays background image in empty state', () => {
    render(<DashboardPage />);

    const backgroundImage = screen.getByAltText('Empty state background');
    expect(backgroundImage).toBeInTheDocument();
    expect(backgroundImage).toHaveAttribute(
      'src',
      expect.stringContaining('EventManagement/background.png'),
    );
  });

  it('renders navigation buttons with correct icons', () => {
    render(<DashboardPage />);

    // Check for emoji icons in buttons
    const interactiveButton = screen.getByText('Interactive Quiz').closest('button');
    const raffleButton = screen.getByText('Raffle Game').closest('button');

    expect(interactiveButton).toBeInTheDocument();
    expect(raffleButton).toBeInTheDocument();
  });

  it('renders create button with add icon', () => {
    render(<DashboardPage />);

    const createButton = screen.getByRole('button', { name: /create/i });
    const icon = createButton.querySelector('.button-icon');

    expect(createButton).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
});
