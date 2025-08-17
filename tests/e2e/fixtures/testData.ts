export const testData = {
  validCredentials: {
    email: 'test@example.com',
    password: 'ValidPassword123',
  },

  invalidCredentials: {
    email: 'invalid@example.com',
    password: 'wrongPassword',
  },

  validationTestCases: {
    invalidEmail: {
      email: 'invalid-email',
      password: 'ValidPassword123',
      expectedEmailError: 'Please enter a valid email address',
    },
    shortPassword: {
      email: 'test@example.com',
      password: 'short',
      expectedPasswordError:
        'Password must be at least 8 characters with uppercase, lowercase, and number',
    },
    emptyFields: {
      email: '',
      password: '',
      expectedEmailError: 'Email is required',
      expectedPasswordError: 'Password is required',
    },
  },

  mockApiResponses: {
    successfulLogin: {
      user: {
        id: '1',
        organizationId: 'org-1',
        organizationCode: 'ORG001',
        fullName: 'Test User',
        email: 'test@example.com',
        phoneNumber: '+1234567890',
        role: 'user',
      },
      token: 'mock-jwt-token-12345',
    },

    invalidCredentialsError: {
      error: 'Invalid credentials',
      status: 401,
    },

    networkError: {
      error: 'Network request failed',
      status: 500,
    },

    timeoutError: {
      error: 'Request timeout',
      status: 408,
    },
  },

  expectedMessages: {
    loginSuccess: 'Login successful',
    invalidCredentials: 'Invalid credentials',
    networkError: 'An unexpected error occurred. Please try again.',
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    passwordRequired: 'Password is required',
    passwordInvalid: 'Password must be at least 8 characters with uppercase, lowercase, and number',
  },

  routes: {
    login: '/login',
    dashboard: '/dashboard',
    signup: '/signup',
    passwordReset: '/PasswordReset',
  },

  timeouts: {
    shortWait: 1000,
    mediumWait: 5000,
    longWait: 10000,
  },
};
