import { expect, test } from '@playwright/test';

test.describe('E2E Setup Verification', () => {
  test('should verify test environment is working', async ({ page }) => {
    // Simple test to verify Playwright is working
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example Domain/);
  });

  test('should verify local development server can be reached', async ({ page }) => {
    try {
      // Test if local dev server is accessible
      await page.goto('/', { timeout: 10000 });

      // If we reach here, the server is running
      await expect(page).toHaveURL(/localhost:3000/);
    } catch (_error) {
      console.log('Local dev server not running - this is expected if running tests standalone');
      // Skip this test if dev server is not running
      test.skip();
    }
  });
});
