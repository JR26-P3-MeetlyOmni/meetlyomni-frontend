import { expect, test } from '@playwright/test';

import { testData } from './fixtures/testData';
import { LoginPage } from './pages/LoginPage';
import { ApiMocks } from './utils/apiMocks';
import { TestHelpers } from './utils/testHelpers';

test.describe('Login E2E Tests', () => {
  let loginPage: LoginPage;
  let apiMocks: ApiMocks;
  let testHelpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    apiMocks = new ApiMocks(page);
    testHelpers = new TestHelpers(page);

    // Clear localStorage before each test
    await testHelpers.clearLocalStorage();

    // Navigate to login page
    await loginPage.goto();
  });

  test.afterEach(async ({ page: _page }) => {
    // Clear API mocks after each test
    await apiMocks.clearMocks();

    // Take screenshot on failure
    if (test.info().status === 'failed') {
      await testHelpers.takeTimestampedScreenshot(`failed-${test.info().title}`);
    }
  });

  test.describe('Page Loading and Visual Elements', () => {
    test('should load login page and display all visual elements correctly', async () => {
      // Verify page load performance
      await testHelpers.verifyPageLoadTime(3000);

      // Verify all visual elements are present
      await loginPage.verifyVisualElements();

      // Verify initial form state
      await loginPage.verifyInitialState();

      // Check for console errors
      await testHelpers.expectNoConsoleErrors();
    });

    test('should display correct page title and meta information', async ({ page }) => {
      await expect(page).toHaveTitle(/meetlyomni|login/i);

      // Verify meta tags if they exist
      const metaDescription = page.locator('meta[name="description"]');
      if ((await metaDescription.count()) > 0) {
        await expect(metaDescription).toHaveAttribute('content');
      }
    });

    test('should display properly on different screen sizes', async () => {
      await testHelpers.testResponsiveBreakpoints(async () => {
        await loginPage.verifyVisualElements();
        await loginPage.verifyResponsiveDesign();
      });
    });
  });

  test.describe('Form Interaction and Validation', () => {
    test('should allow user input in form fields', async () => {
      const { email, password } = testData.validCredentials;

      await loginPage.fillCredentials(email, password);
      await loginPage.verifyInputValues(email, password);
    });

    test('should display validation errors for invalid email', async () => {
      const { email } = testData.validationTestCases.invalidEmail;

      await loginPage.triggerEmailValidation(email);
      await loginPage.submitForm();
      await loginPage.verifyEmailError();
    });

    test('should display validation errors for invalid password', async () => {
      const { email, password } = testData.validationTestCases.shortPassword;

      await loginPage.fillCredentials(email, password);
      await loginPage.submitForm();
      await loginPage.verifyPasswordError();
    });

    test('should display validation errors for both invalid email and password', async () => {
      const { email } = testData.validationTestCases.invalidEmail;
      const invalidPassword = 'short';

      await loginPage.fillCredentials(email, invalidPassword);
      await loginPage.submitForm();
      await loginPage.verifyValidationErrors();
    });

    test('should clear validation errors when user corrects input', async () => {
      // First trigger validation errors
      await loginPage.fillCredentials('invalid-email', 'short');
      await loginPage.submitForm();
      await loginPage.verifyValidationErrors();

      // Then correct the email
      await loginPage.clearForm();
      await loginPage.fillCredentials(
        testData.validCredentials.email,
        testData.validCredentials.password,
      );

      // Errors should be cleared
      await expect(loginPage.emailError).not.toBeVisible();
      await expect(loginPage.passwordError).not.toBeVisible();
    });

    test('should support keyboard navigation', async () => {
      await loginPage.testKeyboardNavigation();
    });
  });

  test.describe('Successful Login Flow', () => {
    test('should successfully log in with valid credentials', async ({ page }) => {
      // Mock successful API response
      await apiMocks.mockSuccessfulLogin();

      const { email, password } = testData.validCredentials;

      // Fill and submit form
      await loginPage.login(email, password);

      // Verify loading state appears briefly
      await loginPage.verifyLoadingState();

      // Wait for navigation to dashboard
      await testHelpers.waitForNavigation(testData.routes.dashboard);

      // Verify URL changed to dashboard
      await expect(page).toHaveURL(/.*\/dashboard/);

      // Verify token is stored in localStorage
      const token = await testHelpers.getLocalStorageItem('authToken');
      expect(token).toBe(testData.mockApiResponses.successfulLogin.token);
    });

    test('should maintain loading state until response received', async () => {
      // Mock slow API response
      await apiMocks.mockSlowResponse(2000);

      const { email, password } = testData.validCredentials;

      await loginPage.fillCredentials(email, password);
      await loginPage.submitForm();

      // Verify loading state is maintained
      await loginPage.verifyLoadingState();

      // Form should be disabled during submission
      await expect(loginPage.signInButton).toBeDisabled();
    });
  });

  test.describe('Login Error Scenarios', () => {
    test('should display error message for invalid credentials', async () => {
      // Mock invalid credentials error
      await apiMocks.mockInvalidCredentials();

      const { email, password } = testData.invalidCredentials;

      await loginPage.login(email, password);
      await loginPage.waitForFormSubmission();

      // Verify error message is displayed
      await loginPage.verifyAuthError(testData.expectedMessages.invalidCredentials);

      // Verify user stays on login page
      await expect(loginPage.page).toHaveURL(/.*\/login/);

      // Verify no token is stored
      const token = await testHelpers.getLocalStorageItem('authToken');
      expect(token).toBeNull();
    });

    test('should display error message for network errors', async () => {
      // Mock network error
      await apiMocks.mockNetworkError();

      const { email, password } = testData.validCredentials;

      await loginPage.login(email, password);
      await loginPage.waitForFormSubmission();

      // Verify network error message is displayed
      await loginPage.verifyAuthError(testData.expectedMessages.networkError);
    });

    test('should handle timeout errors gracefully', async () => {
      // Mock timeout error
      await apiMocks.mockTimeoutError();

      const { email, password } = testData.validCredentials;

      await loginPage.login(email, password);

      // Wait for timeout error to appear
      await loginPage.page.waitForTimeout(3000);

      // Verify error handling
      await loginPage.verifyAuthError('timeout');
    });

    test('should allow retry after failed login attempt', async () => {
      // First attempt with mocked error
      await apiMocks.mockInvalidCredentials();

      await loginPage.login(
        testData.invalidCredentials.email,
        testData.invalidCredentials.password,
      );
      await loginPage.waitForFormSubmission();

      // Verify error is displayed
      await loginPage.verifyAuthError(testData.expectedMessages.invalidCredentials);

      // Clear the mock and set up successful response
      await apiMocks.clearMocks();
      await apiMocks.mockSuccessfulLogin();

      // Retry with valid credentials
      await loginPage.clearForm();
      await loginPage.login(testData.validCredentials.email, testData.validCredentials.password);

      // Should succeed this time
      await testHelpers.waitForNavigation(testData.routes.dashboard);
    });
  });

  test.describe('Authentication State Persistence', () => {
    test('should persist authentication state after page refresh', async ({ page }) => {
      // Set up authenticated state
      await testHelpers.setAuthToken(testData.mockApiResponses.successfulLogin.token);
      await apiMocks.mockAuthCheck(true);

      // Refresh the page
      await page.reload();

      // Should redirect to dashboard if already authenticated
      await testHelpers.waitForNavigation(testData.routes.dashboard);

      // Verify token is still in localStorage
      const token = await testHelpers.getLocalStorageItem('authToken');
      expect(token).toBe(testData.mockApiResponses.successfulLogin.token);
    });

    test('should clear authentication state when token is invalid', async () => {
      // Set up invalid token state
      await testHelpers.setAuthToken('invalid-token');
      await apiMocks.mockAuthCheck(false);

      // Visit a protected route
      await loginPage.page.goto(testData.routes.dashboard);

      // Should redirect back to login
      await testHelpers.waitForNavigation(testData.routes.login);

      // Token should be cleared
      const token = await testHelpers.getLocalStorageItem('authToken');
      expect(token).toBeNull();
    });
  });

  test.describe('Accessibility and User Experience', () => {
    test('should meet basic accessibility requirements', async () => {
      await testHelpers.checkAccessibility();
    });

    test('should provide proper focus management', async () => {
      // Email field should be focused on page load
      await expect(loginPage.emailInput).toBeFocused();

      // Tab navigation should work properly
      await loginPage.testKeyboardNavigation();
    });

    test('should handle form submission with Enter key', async ({ page }) => {
      await apiMocks.mockSuccessfulLogin();

      await loginPage.fillCredentials(
        testData.validCredentials.email,
        testData.validCredentials.password,
      );

      // Submit form using Enter key
      await page.keyboard.press('Enter');

      // Should trigger login flow
      await testHelpers.waitForNavigation(testData.routes.dashboard);
    });

    test('should prevent multiple form submissions', async () => {
      await apiMocks.mockSlowResponse(3000);

      const { email, password } = testData.validCredentials;

      await loginPage.fillCredentials(email, password);

      // Submit form multiple times quickly
      await loginPage.submitForm();
      await loginPage.submitForm();
      await loginPage.submitForm();

      // Button should be disabled to prevent multiple submissions
      await expect(loginPage.signInButton).toBeDisabled();
    });
  });

  test.describe('Navigation and Links', () => {
    test('should navigate to forgot password page', async () => {
      await loginPage.forgotPasswordLink.click();
      await testHelpers.waitForNavigation(testData.routes.passwordReset);
    });

    test('should navigate to sign up page', async () => {
      await loginPage.signUpLink.click();
      await testHelpers.waitForNavigation(testData.routes.signup);
    });

    test('should have working logo link if it exists', async ({ page }) => {
      // Check if logo is clickable
      const logoLink = page.locator('a').filter({ has: loginPage.logo });
      if ((await logoLink.count()) > 0) {
        await logoLink.click();
        // Should navigate to home page or stay on current page
        await page.waitForLoadState('networkidle');
      }
    });
  });

  test.describe('Performance and Loading', () => {
    test('should load page within acceptable time limits', async () => {
      await testHelpers.verifyPageLoadTime(3000);
    });

    test('should handle slow network conditions gracefully', async () => {
      await testHelpers.setSlowNetworkConditions();

      // Page should still function correctly
      await loginPage.verifyVisualElements();

      await testHelpers.restoreNetworkConditions();
    });

    test('should not have JavaScript errors during normal usage', async () => {
      await loginPage.fillCredentials(
        testData.validCredentials.email,
        testData.validCredentials.password,
      );
      await testHelpers.expectNoConsoleErrors();
    });
  });
});
