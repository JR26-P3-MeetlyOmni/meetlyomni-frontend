import { expect, test } from '@playwright/test';

import { LoginPage } from './pages/LoginPage';

test.describe('Login Page Basic Tests', () => {
  test.skip(({ browserName: _browserName }) => {
    // Skip if no dev server is running
    return process.env.CI === undefined;
  }, 'Dev server not available');

  test('should load login page and display basic elements', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to login page
    await page.goto('/login');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check basic elements exist
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });

  test('should allow typing in form fields', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    // Test form interaction
    await loginPage.emailInput.fill('test@example.com');
    await loginPage.passwordInput.fill('testpassword');

    // Verify values
    await expect(loginPage.emailInput).toHaveValue('test@example.com');
    await expect(loginPage.passwordInput).toHaveValue('testpassword');
  });
});
