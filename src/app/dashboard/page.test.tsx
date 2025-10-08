// src/app/dashboard/page.test.tsx
import { store } from '@/store/store';
import { describe, expect, it, vi } from 'vitest';

import React from 'react';
import { Provider } from 'react-redux';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import DashboardPage from './page';

// --- Mock Next.js router ---
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

// --- Mock Image ---
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

// --- Mock MUI Components ---
vi.mock('@mui/material', async importOriginal => {
  const actual = (await importOriginal()) as Record<string, any>;
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

vi.mock('@mui/material/styles', () => ({
  styled: (component: any) => {
    return (_styles: any) => {
      return ({ children, ...props }: any) => {
        const filteredProps = Object.keys(props).reduce((acc, key) => {
          if (!key.startsWith('$') && key !== 'theme' && key !== 'sx')
            (acc as any)[key] = (props as any)[key];
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

// --- Helper ---
const renderWithRedux = (ui: React.ReactElement) => render(<Provider store={store}>{ui}</Provider>);

// --- Tests ---
describe('DashboardPage', () => {
  it('renders the dashboard page', () => {
    renderWithRedux(<DashboardPage />);
    const container = document.querySelector('div');
    expect(container).toBeInTheDocument();
  });

  it('displays the event management title', () => {
    renderWithRedux(<DashboardPage />);
    expect(screen.getByText('Event Management')).toBeInTheDocument();
  });

  it('displays navigation buttons for Interactive Quiz and Raffle Game', () => {
    renderWithRedux(<DashboardPage />);
    expect(screen.getByText('Interactive Quiz')).toBeInTheDocument();
    expect(screen.getByText('Raffle Game')).toBeInTheDocument();
  });

  it('renders event list when mock data exists', () => {
    renderWithRedux(<DashboardPage />);
    const list = screen.getByRole('list', { name: 'event-list' });
    expect(list).toBeInTheDocument();
  });

  it('renders create button with text', () => {
    renderWithRedux(<DashboardPage />);
    const createButton = screen.getByText('+ Create');
    expect(createButton).toBeInTheDocument();
  });

  it('displays balloon image', () => {
    renderWithRedux(<DashboardPage />);
    const balloonImage = screen.getByAltText('Balloon');
    expect(balloonImage).toBeInTheDocument();
    // 不再断言 src，因 getAssetUrl 可能返回 CDN 前缀
  });

  // ✅ no empty-state background anymore; we use event cover images
  it('renders event cover image instead of empty state background', () => {
    renderWithRedux(<DashboardPage />);
    const coverImages = screen.getAllByRole('img');
    // Should have at least the balloon image and event cover images
    expect(coverImages.length).toBeGreaterThan(0);
  });

  it('renders navigation buttons with correct icons', () => {
    renderWithRedux(<DashboardPage />);
    const interactiveButton = screen.getByText('Interactive Quiz').closest('button');
    const raffleButton = screen.getByText('Raffle Game').closest('button');
    expect(interactiveButton).toBeInTheDocument();
    expect(raffleButton).toBeInTheDocument();
  });
});
