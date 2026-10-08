// src/tests/login-ui.spec.ts
// TC: CRM_LOGIN_TC_001 ~ TC_003 — M1: Login Form UI
// Locators verified từ DOM thực tế 2026-10-02

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('M1: Login Form UI', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('CRM_LOGIN_TC_001 — Trang Login hiển thị đầy đủ các thành phần giao diện', async () => {
    await loginPage.assertEmailInputVisible();
    await loginPage.assertPasswordInputVisible();
    await loginPage.assertRememberCheckboxUnchecked();
    await loginPage.assertLoginButtonVisible();
    await loginPage.assertForgotPasswordLinkVisible();
  });

  test('CRM_LOGIN_TC_002 — Trường Password hiển thị dạng masked', async () => {
    await loginPage.fillPassword('TestPassword123');
    await loginPage.assertPasswordIsMasked();
  });

  test('CRM_LOGIN_TC_003 — CSRF token hidden field tồn tại trong form', async ({ page }) => {
    const csrfInput = loginPage.elements.csrfInput;
    await expect(csrfInput, 'CSRF token hidden field phải tồn tại').toBeAttached();

    const csrfValue = await csrfInput.getAttribute('value');
    expect(csrfValue, 'CSRF token value không được rỗng').toBeTruthy();
    expect(csrfValue!.length, 'CSRF token phải có độ dài hợp lý').toBeGreaterThan(10);
  });
});
