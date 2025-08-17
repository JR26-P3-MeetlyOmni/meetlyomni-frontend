import { Page, Route } from '@playwright/test';

import { testData } from '../fixtures/testData';

export class ApiMocks {
  constructor(private page: Page) {}

  /**
   * Mock successful login API response
   */
  async mockSuccessfulLogin(): Promise<void> {
    await this.page.route('**/api/auth/signin', async (route: Route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(testData.mockApiResponses.successfulLogin),
      });
    });
  }

  /**
   * Mock invalid credentials error
   */
  async mockInvalidCredentials(): Promise<void> {
    await this.page.route('**/api/auth/signin', async (route: Route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({
          error: testData.mockApiResponses.invalidCredentialsError.error,
        }),
      });
    });
  }

  /**
   * Mock network error
   */
  async mockNetworkError(): Promise<void> {
    await this.page.route('**/api/auth/signin', async (route: Route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          error: testData.mockApiResponses.networkError.error,
        }),
      });
    });
  }

  /**
   * Mock timeout error
   */
  async mockTimeoutError(): Promise<void> {
    await this.page.route('**/api/auth/signin', async (route: Route) => {
      // Delay the response to simulate timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.fulfill({
        status: 408,
        contentType: 'application/json',
        body: JSON.stringify({
          error: testData.mockApiResponses.timeoutError.error,
        }),
      });
    });
  }

  /**
   * Mock slow API response for loading state testing
   */
  async mockSlowResponse(delayMs: number = 2000): Promise<void> {
    await this.page.route('**/api/auth/signin', async (route: Route) => {
      await new Promise(resolve => setTimeout(resolve, delayMs));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(testData.mockApiResponses.successfulLogin),
      });
    });
  }

  /**
   * Clear all API mocks
   */
  async clearMocks(): Promise<void> {
    await this.page.unroute('**/api/auth/signin');
  }

  /**
   * Mock authentication check endpoint (for persistence testing)
   */
  async mockAuthCheck(isAuthenticated: boolean = true): Promise<void> {
    if (isAuthenticated) {
      await this.page.route('**/api/auth/me', async (route: Route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(testData.mockApiResponses.successfulLogin.user),
        });
      });
    } else {
      await this.page.route('**/api/auth/me', async (route: Route) => {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Unauthorized' }),
        });
      });
    }
  }
}
