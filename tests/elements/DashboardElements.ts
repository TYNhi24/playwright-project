import { Locator, Page } from '@playwright/test';

export class DashboardElements {
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.logoutButton = page.locator('a.btn.btn-danger[href*="logout"]');
  }
}
