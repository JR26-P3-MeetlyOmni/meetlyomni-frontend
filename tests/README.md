# Testing Documentation

This project contains various types of tests to ensure application quality and stability.

## Test Structure

```
tests/
├── e2e/                          # End-to-End Tests (Playwright)
│   ├── pages/                    # Page Object Models
│   │   └── LoginPage.ts          # Login Page POM
│   ├── utils/                    # Test Utilities
│   │   ├── apiMocks.ts           # API Mocking Utilities
│   │   └── testHelpers.ts        # Test Helper Utilities
│   ├── fixtures/                 # Test Data
│   │   └── testData.ts           # Test Data Definitions
│   ├── login.spec.ts             # Complete Login Flow E2E Tests
│   ├── login-basic.spec.ts       # Basic Login Page Tests
│   └── setup.spec.ts             # Setup Verification Tests
├── README.md                     # This Documentation
└──
src/features/auth/tests/
├── integration/                  # Integration Tests
│   └── LoginFlow.integration.test.tsx  # Login Flow Integration Tests
└──
```

## Test Types

### 1. Unit Tests (Vitest + React Testing Library)

- **Location**: Same directory as components (`*.test.tsx`)
- **Purpose**: Test individual component or function behavior
- **Run**: `npm run test`

### 2. Integration Tests (Vitest + React Testing Library)

- **Location**: `src/features/auth/tests/integration/`
- **Purpose**: Test interactions between multiple components or systems
- **Run**: `npm run test` (included in unit tests)

### 3. End-to-End Tests (Playwright)

- **Location**: `tests/e2e/`
- **Purpose**: Test complete user journeys and real browser behavior
- **Run**: `npm run test:e2e`

## Running Tests

### Prerequisites

- Node.js 20+
- Project dependencies installed: `npm install`
- Playwright browsers installed: `npx playwright install`

### Unit Tests and Integration Tests

```bash
# Run all unit tests and integration tests
npm run test

# Watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run specific test file
npm run test -- LoginFlow.integration.test.tsx
```

### E2E Tests

#### Basic Execution

```bash
# Run all E2E tests (headless mode)
npm run test:e2e

# Run specific test file
npm run test:e2e -- login.spec.ts

# Run specific browser
npm run test:e2e -- --project=chromium
npm run test:e2e -- --project=firefox
npm run test:e2e -- --project=webkit
```

#### Debug Mode

```bash
# Run with headed mode (visible browser)
npm run test:e2e:headed

# Debug mode (step-by-step execution)
npm run test:e2e:debug

# UI mode (visual test runner)
npm run test:e2e:ui
```

#### View Test Reports

```bash
# View HTML report from last test run
npm run test:e2e:report
```

### Testing with Development Server Running

```bash
# Start development server in one terminal
npm run dev

# Run E2E tests in another terminal
npm run test:e2e
```

## Test Configuration

### Playwright Configuration (`playwright.config.ts`)

- Multi-browser testing support (Chrome, Firefox, Safari)
- Mobile testing (Mobile Chrome, Mobile Safari)
- Automatic development server startup
- Screenshots and video recording on failure
- Retry mechanism

### Test Coverage Scenarios

#### Login Functionality E2E Tests

1. **Page Loading and Visual Elements**
   - Page loading performance verification
   - All visual elements display correctly
   - Responsive design performance across different screen sizes

2. **Form Interaction and Validation**
   - User input functionality
   - Client-side form validation
   - Real-time error display and clearing

3. **Successful Login Flow**
   - Valid credentials login
   - Loading state display
   - Automatic redirect to dashboard
   - localStorage token persistence

4. **Error Scenario Handling**
   - Invalid credentials error display
   - Network error handling
   - Timeout error handling
   - Retry mechanism after errors

5. **Authentication State Persistence**
   - Maintain login state after page refresh
   - Automatic logout with invalid tokens

6. **Accessibility and User Experience**
   - Keyboard navigation support
   - Focus management
   - Basic accessibility requirements
   - Prevent duplicate submissions

7. **Performance and Error Handling**
   - Page loading time verification
   - Behavior under slow network conditions
   - JavaScript error detection

## Best Practices

### Page Object Model (POM)

- Use POM pattern to organize E2E test code
- Encapsulate page interaction logic in page classes
- Improve test code maintainability and reusability

### API Mocking

- Use Playwright's route interception to mock API responses
- Test different API response scenarios
- Avoid dependency on real backend services

### Test Data Management

- Use centralized test data configuration
- Prepare different datasets for different test scenarios
- Clean up state before each test

### Waiting Strategies

- Use explicit waits instead of fixed delays
- Wait for network idle state to ensure page fully loaded
- Use Playwright's automatic waiting mechanisms

## Troubleshooting

### Common Issues

1. **Test Timeout**

   ```bash
   # Increase timeout
   npm run test:e2e -- --timeout=60000
   ```

2. **Browser Cannot Start**

   ```bash
   # Reinstall Playwright browsers
   npx playwright install --force
   ```

3. **Development Server Connection Failed**

   ```bash
   # Ensure development server is running
   npm run dev

   # Or let Playwright auto-start server
   # (configured in playwright.config.ts)
   ```

4. **View Detailed Logs**
   ```bash
   # Enable detailed logging
   DEBUG=pw:api npm run test:e2e
   ```

### Debugging Tips

1. **Use Browser Developer Tools**

   ```bash
   npm run test:e2e:debug
   ```

2. **Screenshots and Videos**
   - Failed tests automatically take screenshots
   - Videos saved in `test-results/` directory

3. **Trace Viewer**
   ```bash
   # View test execution trace
   npx playwright show-trace test-results/trace.zip
   ```

## CI/CD Integration

The project includes GitHub Actions workflow (`.github/workflows/e2e-tests.yml`) for running E2E tests in CI environment.

### CI Test Features

- Automatically run on push and PR
- Generate test reports and videos
- Upload debug information on failure
- Support test retry mechanism

## Contribution Guidelines

### Adding New E2E Tests

1. Create new `.spec.ts` file in `tests/e2e/` directory
2. Use existing Page Object Models or create new ones
3. Follow existing test structure and naming conventions
4. Add appropriate test data and API mocks

### Updating Page Object Models

1. Update or create new page classes in `tests/e2e/pages/` directory
2. Encapsulate page interaction logic
3. Provide clear method names and documentation comments

### Test Coverage Requirements

- Unit Tests: Minimum 80% coverage
- Integration Tests: Cover critical user flows
- E2E Tests: Cover end-to-end user journeys
