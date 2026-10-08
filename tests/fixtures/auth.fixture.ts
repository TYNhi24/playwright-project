import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AuthSteps } from '../steps/AuthSteps';
import { VALID_USER } from './data/test-data';
import { clearSession } from '../support/cleanup';

type AuthFixtures = { authPage: Page };

export const test = base.extend<AuthFixtures>({
  authPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await new AuthSteps(loginPage, dashboardPage).signIn(
      page,
      VALID_USER.email,
      VALID_USER.password,
    );
    await use(page);
    await clearSession(page.context());
  },
});
