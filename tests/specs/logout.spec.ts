import { expect } from '@playwright/test';
import { test } from '../fixtures/auth.fixture';
import { URLS } from '../fixtures/data/test-data';
import { appUrl } from '../support/urls';

test.describe('M4: Logout', () => {
  test('CRM_LOGIN_TC_023 — Đăng xuất từ Dashboard → quay về trang Login', async ({ authPage }) => {
    await authPage.goto(appUrl(URLS.logout));
    await authPage.waitForLoadState('networkidle');
    await expect(authPage, 'Sau logout phải redirect về trang Login').toHaveURL(
      new RegExp(URLS.login),
    );
  });

  test('CRM_LOGIN_TC_024 — Sau logout, nhấn nút Back → không quay lại Dashboard', async ({ authPage }) => {
    await authPage.goto(appUrl(URLS.logout));
    await authPage.waitForLoadState('networkidle');
    await expect(authPage).toHaveURL(new RegExp(URLS.login));

    await authPage.goBack();
    await authPage.waitForLoadState('networkidle');
    await expect(authPage, 'Sau khi nhấn Back phải quay về trang Login').toHaveURL(
      new RegExp(URLS.login),
    );
  });
});
