import { expect, Page } from '@playwright/test';
import { ForgotPasswordElements } from '../elements/ForgotPasswordElements';
import { URLS } from '../fixtures/data/test-data';
import { appUrl } from '../support/urls';

export class ForgotPasswordPage {
  readonly elements: ForgotPasswordElements;

  constructor(readonly page: Page) {
    this.elements = new ForgotPasswordElements(page);
  }
  async navigate() {
    await this.page.goto(appUrl(URLS.forgotPassword));
    await this.page.waitForLoadState('networkidle');
  }
  async fillEmail(email: string) { await this.elements.emailInput.fill(email); }
  async clickConfirm() { await this.elements.confirmButton.click(); }
  async submitForgotPassword(email: string) {
    await this.fillEmail(email);
    await this.clickConfirm();
  }
  async assertOnForgotPasswordPage() {
    await expect(this.page).toHaveURL(new RegExp(URLS.forgotPassword));
  }
  async assertEmailInputVisible() { await expect(this.elements.emailInput).toBeVisible(); }
  async assertConfirmButtonVisible() { await expect(this.elements.confirmButton).toBeVisible(); }
  async assertSuccessAlertVisible() {
    await expect(this.elements.alertSuccess).toBeVisible({ timeout: 10000 });
  }
}
