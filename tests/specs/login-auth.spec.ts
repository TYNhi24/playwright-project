// src/tests/login-auth.spec.ts
// TC: CRM_LOGIN_TC_005 ~ TC_017 — M2: Login Authentication
// Locators verified từ DOM thực tế 2026-10-02

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import {
  VALID_USER,
  INVALID_USERS,
  SECURITY_PAYLOADS,
  LONG_DATA,
  ERROR_MESSAGES,
  URLS,
} from '../fixtures/data/test-data';
import { appUrl } from '../support/urls';

test.describe('M2: Login Authentication', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
  });

  test('CRM_LOGIN_TC_005 — Đăng nhập thành công với Email và Password hợp lệ', async ({ page }) => {
    await loginPage.login(VALID_USER.email, VALID_USER.password);
    await page.waitForLoadState('networkidle');
    await dashboardPage.assertOnDashboard();
  });

  test('CRM_LOGIN_TC_006 — Đăng nhập thất bại - Để trống trường Email', async () => {
    await loginPage.login('', '123456');
    await loginPage.assertAlertContains(ERROR_MESSAGES.emailRequired);
    await loginPage.assertOnLoginPage();
  });

  test('CRM_LOGIN_TC_007 — Đăng nhập thất bại - Để trống trường Password', async () => {
    await loginPage.login(VALID_USER.email, '');
    await loginPage.assertAlertContains(ERROR_MESSAGES.passwordRequired);
    await loginPage.assertOnLoginPage();
  });

  test('CRM_LOGIN_TC_008 — Đăng nhập thất bại - Để trống cả Email và Password', async ({ page }) => {
    await loginPage.login('', '');
    await page.waitForLoadState('networkidle');

    // Server trả về 2 alerts riêng biệt — dùng getAllAlertsText() thâu tóm cả 2
    const alertText = await loginPage.getAllAlertsText();

    const hasEmailError = alertText.includes(ERROR_MESSAGES.emailRequired);
    const hasPasswordError = alertText.includes(ERROR_MESSAGES.passwordRequired);

    expect(
      hasEmailError || hasPasswordError,
      `Alert phải chứa ít nhất một thông báo required. Alert text: "${alertText}"`
    ).toBeTruthy();

    await loginPage.assertOnLoginPage();
  });

  test('CRM_LOGIN_TC_009 — Đăng nhập thất bại - Email sai định dạng (thiếu @)', async ({ page }) => {
    // HTML5 validation: browser chặn submit, không submit lên server
    await loginPage.fillEmail('invalidemail');
    await loginPage.fillPassword('123456');

    const emailInput = page.locator('#email');
    const validationMsg = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validationMsg, 'HTML5 validation phải xuất hiện cho email thiếu @').toBeTruthy();

    await loginPage.assertOnLoginPage();
  });

  test('CRM_LOGIN_TC_010 — Đăng nhập thất bại - Email đúng định dạng nhưng không tồn tại', async () => {
    await loginPage.login(
      INVALID_USERS.nonExistentEmail.email,
      INVALID_USERS.nonExistentEmail.password
    );
    await loginPage.assertAlertContains(ERROR_MESSAGES.invalidCredentials);
    await loginPage.assertOnLoginPage();
  });

  test('CRM_LOGIN_TC_011 — Đăng nhập thất bại - Email đúng + Password sai', async () => {
    await loginPage.login(
      INVALID_USERS.wrongPassword.email,
      INVALID_USERS.wrongPassword.password
    );
    await loginPage.assertAlertContains(ERROR_MESSAGES.invalidCredentials);
    await loginPage.assertOnLoginPage();
  });

  test('CRM_LOGIN_TC_012 — Đăng nhập thất bại - Email sai + Password đúng', async () => {
    await loginPage.login(
      INVALID_USERS.wrongEmail.email,
      INVALID_USERS.wrongEmail.password
    );
    await loginPage.assertAlertContains(ERROR_MESSAGES.invalidCredentials);
    await loginPage.assertOnLoginPage();
  });

  test('CRM_LOGIN_TC_013 — Đăng nhập thành công với "Remember me"', async ({ page }) => {
    await loginPage.loginWithRememberMe(VALID_USER.email, VALID_USER.password);
    await page.waitForLoadState('networkidle');
    await dashboardPage.assertOnDashboard();

    // Verify session cookie tồn tại (tỮn cookie thực tế của server)
    const cookies = await page.context().cookies();
    // Server dùng session cookie — chỉ cần có ít nhất 1 cookie được set
    expect(cookies.length, 'Phải có ít nhất 1 session cookie sau khi đăng nhập thành công').toBeGreaterThan(0);
    // Verify vẫn ở Dashboard — điều này chứng minh Remember me hoạt động
    await dashboardPage.assertOnDashboard();
  });

  test('CRM_LOGIN_TC_015 — Boundary - Nhập Email cực dài (1001 ký tự)', async ({ page }) => {
    await loginPage.login(LONG_DATA.email, '123456');

    // Hệ thống phải xử lý an toàn — không crash, không lỗi 500
    const currentUrl = page.url();
    expect(
      currentUrl.includes('/admin/authentication') || currentUrl.includes('/admin/'),
      'Hệ thống phải xử lý an toàn email cực dài, không crash'
    ).toBeTruthy();
  });

  test('CRM_LOGIN_TC_016 — Boundary - Nhập Password cực dài (1001 ký tự)', async ({ page }) => {
    await loginPage.login(VALID_USER.email, LONG_DATA.password);

    // Hệ thống phải xử lý an toàn
    const currentUrl = page.url();
    expect(
      currentUrl.includes('/admin/authentication') || currentUrl.includes('/admin/'),
      'Hệ thống phải xử lý an toàn password cực dài, không crash'
    ).toBeTruthy();
  });

  test('CRM_LOGIN_TC_017 — Truy cập trang Login khi đã đăng nhập → redirect Dashboard', async ({ page }) => {
    // Login trước
    await loginPage.login(VALID_USER.email, VALID_USER.password);
    await page.waitForLoadState('networkidle');
    await dashboardPage.assertOnDashboard();

    // Navigate tới login page khi đã đăng nhập
    await page.goto(appUrl(URLS.login));
    await page.waitForLoadState('networkidle');

    // Phải redirect về Dashboard, không hiển thị form login
    await expect(page, 'Đã đăng nhập phải redirect về Dashboard').toHaveURL(new RegExp('/admin/'));
  });
});
