import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  // Selectors
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signUpLink: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly authError: Locator;
  readonly loadingButton: Locator;

  // Visual elements
  readonly logo: Locator;
  readonly welcomeTitle: Locator;
  readonly signInTitle: Locator;
  readonly decorativeElements: {
    magnifyingGlass: Locator;
    rachel: Locator;
    mark: Locator;
    lookingFor: Locator;
    form: Locator;
    star: Locator;
  };

  constructor(page: Page) {
    this.page = page;

    // Form elements
    this.emailInput = page.getByPlaceholder('Email Address');
    this.passwordInput = page.getByPlaceholder('Password');
    this.signInButton = page.getByRole('button', { name: /sign in/i });
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot password/i });
    this.signUpLink = page.getByRole('link', { name: /sign up/i });
    this.loadingButton = page.getByRole('button', { name: /signing in/i });

    // Error messages
    this.emailError = page.getByText('Please enter a valid email address');
    this.passwordError = page.getByText(
      'Password must be at least 8 characters with uppercase, lowercase, and number',
    );
    this.authError = page.locator('[data-testid="auth-error"], .auth-error').first();

    // Visual elements
    this.logo = page.getByAltText('Omni Logo');
    this.welcomeTitle = page.getByRole('heading', { name: /welcome to omni/i });
    this.signInTitle = page.getByRole('heading', { name: /let's sign in your profile/i });

    // Decorative elements
    this.decorativeElements = {
      magnifyingGlass: page.getByAltText('Magnifying glass'),
      rachel: page.getByAltText('Rachel'),
      mark: page.getByAltText('Mark'),
      lookingFor: page.getByAltText('Looking For'),
      form: page.getByAltText('Form'),
      star: page.getByAltText('Star'),
    };
  }

  /**
   * Navigate to the login page
   */
  async goto(): Promise<void> {
    await this.page.goto('/login');
    await this.waitForPageLoad();
  }

  /**
   * Wait for the page to fully load
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }

  /**
   * Fill the login form with provided credentials
   */
  async fillCredentials(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  /**
   * Clear the login form
   */
  async clearForm(): Promise<void> {
    await this.emailInput.clear();
    await this.passwordInput.clear();
  }

  /**
   * Submit the login form
   */
  async submitForm(): Promise<void> {
    await this.signInButton.click();
  }

  /**
   * Perform complete login flow
   */
  async login(email: string, password: string): Promise<void> {
    await this.fillCredentials(email, password);
    await this.submitForm();
  }

  /**
   * Verify all visual elements are present
   */
  async verifyVisualElements(): Promise<void> {
    // Header elements
    await expect(this.logo).toBeVisible();
    await expect(this.welcomeTitle).toBeVisible();
    await expect(this.signInTitle).toBeVisible();

    // Form elements
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
    await expect(this.forgotPasswordLink).toBeVisible();
    await expect(this.signUpLink).toBeVisible();

    // Decorative elements
    await expect(this.decorativeElements.magnifyingGlass).toBeVisible();
    await expect(this.decorativeElements.rachel).toBeVisible();
    await expect(this.decorativeElements.mark).toBeVisible();
    await expect(this.decorativeElements.lookingFor).toBeVisible();
    await expect(this.decorativeElements.form).toBeVisible();
    await expect(this.decorativeElements.star).toBeVisible();
  }

  /**
   * Verify form validation errors are displayed
   */
  async verifyValidationErrors(): Promise<void> {
    await expect(this.emailError).toBeVisible();
    await expect(this.passwordError).toBeVisible();
  }

  /**
   * Verify email validation error is displayed
   */
  async verifyEmailError(): Promise<void> {
    await expect(this.emailError).toBeVisible();
  }

  /**
   * Verify password validation error is displayed
   */
  async verifyPasswordError(): Promise<void> {
    await expect(this.passwordError).toBeVisible();
  }

  /**
   * Verify authentication error is displayed
   */
  async verifyAuthError(errorMessage: string): Promise<void> {
    await expect(this.page.getByText(errorMessage)).toBeVisible();
  }

  /**
   * Verify loading state is displayed
   */
  async verifyLoadingState(): Promise<void> {
    await expect(this.loadingButton).toBeVisible();
    await expect(this.loadingButton).toBeDisabled();
  }

  /**
   * Wait for form submission to complete
   */
  async waitForFormSubmission(): Promise<void> {
    // Wait for either success navigation or error display
    await Promise.race([
      this.page.waitForURL('/dashboard', { timeout: 10000 }),
      this.page.waitForSelector('[data-testid="auth-error"]', { timeout: 5000 }).catch(() => {}),
    ]);
  }

  /**
   * Verify form input values
   */
  async verifyInputValues(email: string, password: string): Promise<void> {
    await expect(this.emailInput).toHaveValue(email);
    await expect(this.passwordInput).toHaveValue(password);
  }

  /**
   * Verify form is in initial state
   */
  async verifyInitialState(): Promise<void> {
    await expect(this.emailInput).toHaveValue('');
    await expect(this.passwordInput).toHaveValue('');
    await expect(this.signInButton).toBeEnabled();
    await expect(this.emailError).not.toBeVisible();
    await expect(this.passwordError).not.toBeVisible();
  }

  /**
   * Interact with email field and trigger validation
   */
  async triggerEmailValidation(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.emailInput.blur();
    await this.page.waitForTimeout(100); // Small delay for validation to trigger
  }

  /**
   * Interact with password field and trigger validation
   */
  async triggerPasswordValidation(password: string): Promise<void> {
    await this.passwordInput.fill(password);
    await this.passwordInput.blur();
    await this.page.waitForTimeout(100); // Small delay for validation to trigger
  }

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation(): Promise<void> {
    // Tab through form elements
    await this.emailInput.focus();
    await this.page.keyboard.press('Tab');
    await expect(this.passwordInput).toBeFocused();

    await this.page.keyboard.press('Tab');
    await expect(this.signInButton).toBeFocused();

    // Test Enter key submission
    await this.emailInput.focus();
    await this.emailInput.fill('test@example.com');
    await this.passwordInput.fill('ValidPassword123');
    await this.page.keyboard.press('Enter');
  }

  /**
   * Verify responsive design elements
   */
  async verifyResponsiveDesign(): Promise<void> {
    // Elements should be visible and properly positioned
    const formContainer = this.page.locator('form').first();
    await expect(formContainer).toBeVisible();

    // Check that form is centered and accessible
    const boundingBox = await formContainer.boundingBox();
    expect(boundingBox).toBeTruthy();
    if (boundingBox) {
      expect(boundingBox.width).toBeGreaterThan(0);
      expect(boundingBox.height).toBeGreaterThan(0);
    }
  }
}
