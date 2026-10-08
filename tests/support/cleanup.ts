import { BrowserContext } from '@playwright/test';

/** Clear authenticated cookies during fixture teardown. */
export async function clearSession(context: BrowserContext) {
  await context.clearCookies();
}
