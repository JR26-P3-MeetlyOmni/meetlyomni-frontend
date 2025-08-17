import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { ReactElement, ReactNode } from 'react';

import { authReducer, type AuthState } from '@/features/auth';

// Simple app slice for testing
const testAppSlice = createSlice({
  name: 'app',
  initialState: {},
  reducers: {},
});

// Define test store type
interface TestRootState {
  app: {};
  auth: AuthState;
}

// Create test store with optional initial state
export const createTestStore = (preloadedState?: Partial<TestRootState>) => {
  return configureStore({
    reducer: {
      app: testAppSlice.reducer,
      auth: authReducer,
    } as any,
    preloadedState,
  });
};

// Custom render function with providers
interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<TestRootState>;
  store?: ReturnType<typeof createTestStore>;
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

// Simple wrapper component for hook testing
export const createWrapper = (preloadedState: Partial<TestRootState> = {}) => {
  const store = createTestStore(preloadedState);
  return ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
};

// Mock data for tests
export const mockUser = {
  id: '1',
  organizationId: 'org-1',
  organizationCode: 'ORG001',
  fullName: 'Test User',
  email: 'test@example.com',
  phoneNumber: '+1234567890',
  role: 'user',
};

export const mockAuthState = {
  user: mockUser,
  token: 'mock-token',
  isAuthenticated: true,
  isLoading: false,
  isInitialized: true,
  error: null,
};

export const mockUnauthenticatedState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: true,
  error: null,
};

export const mockLoadingState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  isInitialized: false,
  error: null,
};

export const mockErrorState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: true,
  error: 'Login failed. Please check your email and password.',
};

// Mock credentials for testing
export const mockValidCredentials = {
  email: 'test@example.com',
  password: 'validPassword123',
};

export const mockInvalidCredentials = {
  email: 'invalid@example.com',
  password: 'wrongPassword',
};

// Mock login response
export const mockLoginResponse = {
  user: mockUser,
  token: 'mock-jwt-token',
};

// Re-export everything from testing-library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
