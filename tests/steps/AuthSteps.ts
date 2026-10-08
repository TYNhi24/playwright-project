import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

export class AuthSteps {
  constructor(
    private readonly loginPage: LoginPage,
    private readonly dashboardPage: DashboardPage,
  ) {}

  async signIn(page: Page, email: string, password: string) {
    await this.loginPage.navigate();
    await this.loginPage.login(email, password);
    await page.waitForLoadState('networkidle');
    await this.dashboardPage.assertOnDashboard();
  }
}
