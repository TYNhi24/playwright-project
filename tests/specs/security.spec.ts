// src/tests/security.spec.ts
// TC: CRM_LOGIN_TC_025 ~ TC_030 — M5: Security
// Locators verified từ DOM thực tế 2026-10-02

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { VALID_USER, INVALID_USERS, SECURITY_PAYLOADS, ERROR_MESSAGES, URLS } from '../fixtures/data/test-data';

test.describe('M5: Security', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('CRM_LOGIN_TC_025 — SQL Injection vào trường Email', async ({ page }) => {
    await loginPage.login(SECURITY_PAYLOADS.sqlInjectionEmail, 'anything');
    await page.waitForLoadState('networkidle');

    // Hệ thống phải xử lý an toàn — không login thành công, không lỗi 500
    const currentUrl = page.url();
    expect(
      currentUrl.includes('/admin/authentication'),
      'SQL Injection không được bypass login'
    ).toBeTruthy();

    // Không lỗi 500
    const bodyText = await page.locator('body').textContent() ?? '';
    expect(bodyText, 'Không được hiển thị lỗi SQL').not.toContain('SQL');
    expect(bodyText, 'Không được lỗi 500').not.toContain('500 Internal Server Error');
  });

  test('CRM_LOGIN_TC_026 — XSS Script Injection vào trường Email', async ({ page }) => {
    const dialogMessages: string[] = [];
    page.on('dialog', async dialog => {
      dialogMessages.push(dialog.message());
      await dialog.dismiss();
    });

    // Attach before submission so synchronous dialogs cannot be missed.
    await loginPage.login(SECURITY_PAYLOADS.xssEmail, '123456');
    await page.waitForLoadState('networkidle');

    expect(dialogMessages.length, 'XSS script không được thực thi (không có alert popup)').toBe(0);
    expect(page.url(), 'Vẫn ở trang login sau XSS attempt').toContain('/admin/authentication');
  });

  test('CRM_LOGIN_TC_027 — SQL Injection vào trường Password', async ({ page }) => {
    await loginPage.login(VALID_USER.email, SECURITY_PAYLOADS.sqlInjectionPassword);
    await page.waitForLoadState('networkidle');

    // Không login thành công
    expect(page.url(), 'SQL Injection trong Password không được bypass').toContain('/admin/authentication');

    const bodyText = await page.locator('body').textContent() ?? '';
    expect(bodyText, 'Không được lỗi SQL').not.toContain('SQL syntax');
    expect(bodyText, 'Không được lỗi 500').not.toContain('500 Internal Server Error');
  });

  test('CRM_LOGIN_TC_029 — Đăng nhập sai nhiều lần liên tiếp (Brute-force)', async ({ page }) => {
    // Thử 5 lần sai liên tiếp để verify hệ thống không crash
    for (let i = 1; i <= 5; i++) {
      if (i > 1) {
        await loginPage.navigate();
      }
      await loginPage.login(VALID_USER.email, `SaiPass_20261002_${i}`);
      await page.waitForLoadState('networkidle');

      // Mỗi lần phải hiển thị lỗi và ở lại trang login
      expect(page.url(), `Lần ${i}: Phải ở lại trang login`).toContain('/admin/authentication');
    }

    // Hệ thống không crash — vẫn hiển thị trang login bình thường
    await loginPage.assertEmailInputVisible();
    await loginPage.assertLoginButtonVisible();
  });

  test('CRM_LOGIN_TC_030 — Thông báo lỗi không tiết lộ email tồn tại hay không', async () => {
    // Lần 1: email tồn tại + password sai
    await loginPage.login(VALID_USER.email, 'WrongP_20261002');
    const alertTextA = await loginPage.getAlertText();

    // Lần 2: email không tồn tại + password sai
    await loginPage.navigate();
    await loginPage.login(INVALID_USERS.nonExistentEmail.email, 'WrongP_20261002');
    const alertTextB = await loginPage.getAlertText();

    // Cả 2 thông báo phải giống nhau
    expect(
      alertTextA.trim(),
      'Thông báo lỗi phải giống nhau dù email có tồn tại hay không'
    ).toContain(ERROR_MESSAGES.invalidCredentials);
    expect(
      alertTextB.trim(),
      'Thông báo lỗi phải giống nhau dù email có tồn tại hay không'
    ).toContain(ERROR_MESSAGES.invalidCredentials);
  });
});
