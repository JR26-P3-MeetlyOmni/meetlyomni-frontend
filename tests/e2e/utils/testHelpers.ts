import { expect, Page } from '@playwright/test';

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Set up localStorage with authentication token
   */
  async setAuthToken(token: string): Promise<void> {
    await this.page.addInitScript(token => {
      localStorage.setItem('authToken', token);
    }, token);
  }

  /**
   * Clear localStorage
   */
  async clearLocalStorage(): Promise<void> {
    await this.page.addInitScript(() => {
      localStorage.clear();
    });
  }

  /**
   * Get localStorage value
   */
  async getLocalStorageItem(key: string): Promise<string | null> {
    return await this.page.evaluate(key => localStorage.getItem(key), key);
  }

  /**
   * Wait for navigation to specific URL
   */
  async waitForNavigation(url: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForURL(url, { timeout });
  }

  /**
   * Take screenshot with timestamp
   */
  async takeTimestampedScreenshot(name: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({
      path: `test-results/screenshots/${name}-${timestamp}.png`,
      fullPage: true,
    });
  }

  /**
   * Simulate different viewport sizes for responsive testing
   */
  async setViewportSize(width: number, height: number): Promise<void> {
    await this.page.setViewportSize({ width, height });
  }

  /**
   * Test common responsive breakpoints
   */
  async testResponsiveBreakpoints(testCallback: () => Promise<void>): Promise<void> {
    const breakpoints = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 },
    ];

    for (const breakpoint of breakpoints) {
      await this.setViewportSize(breakpoint.width, breakpoint.height);
      await testCallback();
    }
  }

  /**
   * Verify page accessibility
   */
  async checkAccessibility(): Promise<void> {
    // Basic accessibility checks
    await expect(this.page.locator('input[type="email"]')).toHaveAttribute('type', 'email');
    await expect(this.page.locator('input[type="password"]')).toHaveAttribute('type', 'password');

    // Check for proper form labels/placeholders
    const emailInput = this.page.getByPlaceholder('Email Address');
    const passwordInput = this.page.getByPlaceholder('Password');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    // Check for proper heading structure
    const headings = this.page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(0);
  }

  /**
   * Simulate slow network conditions
   */
  async setSlowNetworkConditions(): Promise<void> {
    await this.page.route('**/*', async route => {
      // Add delay to simulate slow network
      await new Promise(resolve => setTimeout(resolve, 100));
      await route.continue();
    });
  }

  /**
   * Restore normal network conditions
   */
  async restoreNetworkConditions(): Promise<void> {
    await this.page.unroute('**/*');
  }

  /**
   * Verify console errors (useful for catching JavaScript errors)
   */
  async expectNoConsoleErrors(): Promise<void> {
    const consoleErrors: string[] = [];

    this.page.on('console', message => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });

    // Allow time for potential console errors
    await this.page.waitForTimeout(1000);

    expect(consoleErrors).toHaveLength(0);
  }

  /**
   * Verify page loading performance
   */
  async verifyPageLoadTime(maxLoadTime: number = 3000): Promise<void> {
    const startTime = Date.now();
    await this.page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(maxLoadTime);
  }

  /**
   * Click element and wait for navigation
   */
  async clickAndWaitForNavigation(selector: string, expectedUrl?: string): Promise<void> {
    await Promise.all([this.page.waitForNavigation(), this.page.click(selector)]);

    if (expectedUrl) {
      await this.waitForNavigation(expectedUrl);
    }
  }

  /**
   * Fill form and verify input
   */
  async fillAndVerifyInput(selector: string, value: string): Promise<void> {
    await this.page.fill(selector, value);
    await expect(this.page.locator(selector)).toHaveValue(value);
  }

  /**
   * Hover over element and verify tooltip or hover state
   */
  async hoverAndVerify(selector: string, expectedChange?: string): Promise<void> {
    await this.page.hover(selector);

    if (expectedChange) {
      await expect(this.page.locator(expectedChange)).toBeVisible();
    }
  }
}
