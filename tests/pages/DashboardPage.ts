import { expect, Page } from '@playwright/test';
import { DashboardElements } from '../elements/DashboardElements';
import { URLS } from '../fixtures/data/test-data';
import { appUrl } from '../support/urls';

export class DashboardPage {
  readonly elements: DashboardElements;

  constructor(readonly page: Page) {
    this.elements = new DashboardElements(page);
  }
  async assertOnDashboard() {
    await expect(this.page).toHaveURL(/\/admin\//);
    await expect(this.page).toHaveTitle('Dashboard');
  }
  async logout() {
    await this.page.goto(appUrl(URLS.logout));
    await this.page.waitForLoadState('networkidle');
  }
  async assertNotOnDashboard() {
    await expect(this.page).not.toHaveURL(/\/admin\/$/);
  }
}
