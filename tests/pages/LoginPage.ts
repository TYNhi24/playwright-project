import { expect, Page } from '@playwright/test';
import { LoginElements } from '../elements/LoginElements';
import { URLS } from '../fixtures/data/test-data';
import { appUrl } from '../support/urls';

/** User-facing actions and assertions for the login page. */
export class LoginPage {
  readonly elements: LoginElements;

  constructor(readonly page: Page) {
    this.elements = new LoginElements(page);
  }

  async navigate() {
    await this.page.goto(appUrl(URLS.login));
    await this.page.waitForLoadState('networkidle');
  }
  async fillEmail(email: string) { await this.elements.emailInput.fill(email); }
  async fillPassword(password: string) { await this.elements.passwordInput.fill(password); }
  async checkRememberMe() { await this.elements.rememberCheckbox.check(); }
  async clickLogin() { await this.elements.loginButton.click(); }
  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }
  async loginWithRememberMe(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.checkRememberMe();
    await this.clickLogin();
  }
  async clickForgotPassword() { await this.elements.forgotPasswordLink.click(); }
  async getAlertText(): Promise<string> {
    await this.elements.alertDanger.waitFor({ state: 'visible', timeout: 10000 });
    return (await this.elements.alertDanger.textContent()) ?? '';
  }
  async getAllAlertsText(): Promise<string> {
    const alerts = this.elements.allDangerAlerts;
    await alerts.first().waitFor({ state: 'visible', timeout: 10000 });
    const texts = await alerts.allTextContents();
    return texts.join('');
  }
  async assertOnLoginPage() {
    await expect(this.page, 'Must be on the Login page').toHaveURL(new RegExp(URLS.login));
  }
  async assertEmailInputVisible() { await expect(this.elements.emailInput).toBeVisible(); }
  async assertPasswordInputVisible() { await expect(this.elements.passwordInput).toBeVisible(); }
  async assertPasswordIsMasked() {
    await expect(this.elements.passwordInput).toHaveAttribute('type', 'password');
  }
  async assertRememberCheckboxUnchecked() {
    await expect(this.elements.rememberCheckbox).not.toBeChecked();
  }
  async assertLoginButtonVisible() { await expect(this.elements.loginButton).toBeVisible(); }
  async assertForgotPasswordLinkVisible() { await expect(this.elements.forgotPasswordLink).toBeVisible(); }
  async assertAlertContains(expectedText: string) {
    expect(await this.getAlertText()).toContain(expectedText);
  }
}
