# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: forgot-password.spec.ts >> M3: Forgot Password >> CRM_LOGIN_TC_021 — Nhập email chưa đăng ký trên Forgot Password
- Location: tests\specs\forgot-password.spec.ts:61:7

# Error details

```
Error: page.goto: net::ERR_NETWORK_ACCESS_DENIED at https://crm.anhtester.com/admin/authentication/forgot_password
Call log:
  - navigating to "https://crm.anhtester.com/admin/authentication/forgot_password", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "Your Internet access is blocked" [level=1] [ref=e7]
    - paragraph [ref=e8]: Firewall or antivirus software may have blocked the connection.
    - generic [ref=e9]:
      - paragraph [ref=e10]: "Try:"
      - list [ref=e11]:
        - listitem [ref=e12]: Checking the connection
        - listitem [ref=e13]:
          - link "Checking firewall and antivirus configurations" [ref=e14] [cursor=pointer]:
            - /url: "#buttons"
        - listitem [ref=e15]:
          - link "Running Windows Network Diagnostics" [ref=e16] [cursor=pointer]:
            - /url: javascript:diagnoseErrors()
    - generic [ref=e17]: ERR_NETWORK_ACCESS_DENIED
  - button "Details" [ref=e19] [cursor=pointer]
```

# Test source

```ts
  1  | import { expect, Page } from '@playwright/test';
  2  | import { ForgotPasswordElements } from '../elements/ForgotPasswordElements';
  3  | import { URLS } from '../fixtures/data/test-data';
  4  | 
  5  | export class ForgotPasswordPage {
  6  |   readonly elements: ForgotPasswordElements;
  7  | 
  8  |   constructor(readonly page: Page) {
  9  |     this.elements = new ForgotPasswordElements(page);
  10 |   }
  11 |   async navigate() {
> 12 |     await this.page.goto(URLS.forgotPassword);
     |                     ^ Error: page.goto: net::ERR_NETWORK_ACCESS_DENIED at https://crm.anhtester.com/admin/authentication/forgot_password
  13 |     await this.page.waitForLoadState('networkidle');
  14 |   }
  15 |   async fillEmail(email: string) { await this.elements.emailInput.fill(email); }
  16 |   async clickConfirm() { await this.elements.confirmButton.click(); }
  17 |   async submitForgotPassword(email: string) {
  18 |     await this.fillEmail(email);
  19 |     await this.clickConfirm();
  20 |   }
  21 |   async assertOnForgotPasswordPage() {
  22 |     await expect(this.page).toHaveURL(new RegExp(URLS.forgotPassword));
  23 |   }
  24 |   async assertEmailInputVisible() { await expect(this.elements.emailInput).toBeVisible(); }
  25 |   async assertConfirmButtonVisible() { await expect(this.elements.confirmButton).toBeVisible(); }
  26 |   async assertSuccessAlertVisible() {
  27 |     await expect(this.elements.alertSuccess).toBeVisible({ timeout: 10000 });
  28 |   }
  29 | }
  30 | 
```