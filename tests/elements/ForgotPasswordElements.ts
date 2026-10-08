import { Locator, Page } from '@playwright/test';

export class ForgotPasswordElements {
  readonly emailInput: Locator;
  readonly confirmButton: Locator;
  readonly alertSuccess: Locator;
  readonly alertDanger: Locator;

  constructor(page: Page) {
    this.emailInput = page.locator('#email');
    this.confirmButton = page.getByRole('button', { name: 'Confirm' });
    this.alertSuccess = page.locator('div.alert.alert-success');
    this.alertDanger = page.locator('div.alert.alert-danger');
  }
}
