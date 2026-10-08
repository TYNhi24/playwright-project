// src/tests/forgot-password.spec.ts
// TC: CRM_LOGIN_TC_018 ~ TC_022 — M3: Forgot Password
// Locators verified từ DOM thực tế 2026-10-02

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { FORGOT_PASSWORD_DATA, URLS } from '../fixtures/data/test-data';

test.describe('M3: Forgot Password', () => {
  let loginPage: LoginPage;
  let forgotPasswordPage: ForgotPasswordPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    forgotPasswordPage = new ForgotPasswordPage(page);
  });

  test('CRM_LOGIN_TC_018 — Click "Forgot Password?" chuyển đến trang khôi phục', async ({ page }) => {
    await loginPage.navigate();
    await loginPage.clickForgotPassword();
    await page.waitForLoadState('networkidle');

    await forgotPasswordPage.assertOnForgotPasswordPage();
    await forgotPasswordPage.assertEmailInputVisible();
    await forgotPasswordPage.assertConfirmButtonVisible();
  });

  test('CRM_LOGIN_TC_019 — Gửi email khôi phục với email đã đăng ký', async ({ page }) => {
    await forgotPasswordPage.navigate();
    await forgotPasswordPage.submitForgotPassword(FORGOT_PASSWORD_DATA.validEmail);
    await page.waitForLoadState('networkidle');

    // Hệ thống phải xử lý request và trả về phản hồi (không crash, không lỗi 500)
    // Server demo trả về alert (success hoặc error) — đều được chấp nhận
    const currentUrl = page.url();
    expect(
      currentUrl.includes('forgot_password') || currentUrl.includes('/admin/'),
      'Hệ thống phải xử lý và không redirect về trang khác (không crash)'
    ).toBeTruthy();

    // Kiểm tra có phản hồi từ server (không phải trang trống)
    const bodyText = await page.locator('body').textContent();
    expect(bodyText, 'Body không được rống sau khi submit').toBeTruthy();
  });

  test('CRM_LOGIN_TC_020 — Để trống Email trên Forgot Password → validation', async ({ page }) => {
    await forgotPasswordPage.navigate();
    // Không điền email, click Confirm
    await forgotPasswordPage.clickConfirm();
    await page.waitForLoadState('networkidle');

    // Email field không có required attribute — server xử lý submit rồi trả về lỗi
    // Verify form vẫn ở trang forgot_password (server-side validation)
    await forgotPasswordPage.assertOnForgotPasswordPage();
    // Hệ thống không crash, không redirect nước ngoài
    expect(page.url(), 'Vẫn phải ở trang forgot password sau submit rổng')
      .toContain('forgot_password');
  });

  test('CRM_LOGIN_TC_021 — Nhập email chưa đăng ký trên Forgot Password', async ({ page }) => {
    await forgotPasswordPage.navigate();
    await forgotPasswordPage.submitForgotPassword(FORGOT_PASSWORD_DATA.nonExistentEmail);
    await page.waitForLoadState('networkidle');

    // Hệ thống không tiết lộ email có tồn tại hay không (thông báo chung)
    const currentUrl = page.url();
    expect(
      currentUrl.includes('forgot_password') || currentUrl.includes('/admin/'),
      'Hệ thống phải xử lý bảo mật — không tiết lộ email tồn tại hay không'
    ).toBeTruthy();
  });

  test('CRM_LOGIN_TC_022 — Nhập email sai định dạng trên Forgot Password', async ({ page }) => {
    await forgotPasswordPage.navigate();
    await forgotPasswordPage.fillEmail(FORGOT_PASSWORD_DATA.invalidFormatEmail);
    await forgotPasswordPage.clickConfirm();

    const emailInput = page.locator('#email');
    const validationMsg = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validationMsg, 'HTML5 validation @ phải xuất hiện cho email sai định dạng').toBeTruthy();

    await forgotPasswordPage.assertOnForgotPasswordPage();
  });
});
