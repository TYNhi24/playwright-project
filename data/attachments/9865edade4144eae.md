# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login-auth.spec.ts >> M2: Login Authentication >> CRM_LOGIN_TC_013 — Đăng nhập thành công với "Remember me"
- Location: tests\specs\login-auth.spec.ts:102:7

# Error details

```
Error: page.goto: net::ERR_NETWORK_ACCESS_DENIED at https://crm.anhtester.com/admin/authentication
Call log:
  - navigating to "https://crm.anhtester.com/admin/authentication", waiting until "load"

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
  2  | import { LoginElements } from '../elements/LoginElements';
  3  | import { URLS } from '../fixtures/data/test-data';
  4  | 
  5  | /** User-facing actions and assertions for the login page. */
  6  | export class LoginPage {
  7  |   readonly elements: LoginElements;
  8  | 
  9  |   constructor(readonly page: Page) {
  10 |     this.elements = new LoginElements(page);
  11 |   }
  12 | 
  13 |   async navigate() {
> 14 |     await this.page.goto(URLS.login);
     |                     ^ Error: page.goto: net::ERR_NETWORK_ACCESS_DENIED at https://crm.anhtester.com/admin/authentication
  15 |     await this.page.waitForLoadState('networkidle');
  16 |   }
  17 |   async fillEmail(email: string) { await this.elements.emailInput.fill(email); }
  18 |   async fillPassword(password: string) { await this.elements.passwordInput.fill(password); }
  19 |   async checkRememberMe() { await this.elements.rememberCheckbox.check(); }
  20 |   async clickLogin() { await this.elements.loginButton.click(); }
  21 |   async login(email: string, password: string) {
  22 |     await this.fillEmail(email);
  23 |     await this.fillPassword(password);
  24 |     await this.clickLogin();
  25 |   }
  26 |   async loginWithRememberMe(email: string, password: string) {
  27 |     await this.fillEmail(email);
  28 |     await this.fillPassword(password);
  29 |     await this.checkRememberMe();
  30 |     await this.clickLogin();
  31 |   }
  32 |   async clickForgotPassword() { await this.elements.forgotPasswordLink.click(); }
  33 |   async getAlertText(): Promise<string> {
  34 |     await this.elements.alertDanger.waitFor({ state: 'visible', timeout: 10000 });
  35 |     return (await this.elements.alertDanger.textContent()) ?? '';
  36 |   }
  37 |   async getAllAlertsText(): Promise<string> {
  38 |     const alerts = this.elements.allDangerAlerts;
  39 |     await alerts.first().waitFor({ state: 'visible', timeout: 10000 });
  40 |     const texts = await alerts.allTextContents();
  41 |     return texts.join('');
  42 |   }
  43 |   async assertOnLoginPage() {
  44 |     await expect(this.page, 'Must be on the Login page').toHaveURL(new RegExp(URLS.login));
  45 |   }
  46 |   async assertEmailInputVisible() { await expect(this.elements.emailInput).toBeVisible(); }
  47 |   async assertPasswordInputVisible() { await expect(this.elements.passwordInput).toBeVisible(); }
  48 |   async assertPasswordIsMasked() {
  49 |     await expect(this.elements.passwordInput).toHaveAttribute('type', 'password');
  50 |   }
  51 |   async assertRememberCheckboxUnchecked() {
  52 |     await expect(this.elements.rememberCheckbox).not.toBeChecked();
  53 |   }
  54 |   async assertLoginButtonVisible() { await expect(this.elements.loginButton).toBeVisible(); }
  55 |   async assertForgotPasswordLinkVisible() { await expect(this.elements.forgotPasswordLink).toBeVisible(); }
  56 |   async assertAlertContains(expectedText: string) {
  57 |     expect(await this.getAlertText()).toContain(expectedText);
  58 |   }
  59 | }
  60 | 
```