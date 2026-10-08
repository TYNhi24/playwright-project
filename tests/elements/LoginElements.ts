import { Locator, Page } from '@playwright/test';

/** Locators for the CRM login and authentication forms. */
export class LoginElements {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberCheckbox: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly alertDanger: Locator;
  readonly allDangerAlerts: Locator;
  readonly csrfInput: Locator;

  constructor(page: Page) {
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.rememberCheckbox = page.locator('#remember');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.forgotPasswordLink = page.getByText('Forgot Password?');
    this.alertDanger = page.locator('div.alert.alert-danger').first();
    this.allDangerAlerts = page.locator('div.alert.alert-danger');
    this.csrfInput = page.locator('input[name="csrf_token_name"][type="hidden"]');
  }
}
