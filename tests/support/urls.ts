/** Base address can be overridden when running against another CRM environment. */
export const BASE_URL = process.env.BASE_URL ?? 'https://crm.anhtester.com';

/** Resolve application paths even when Playwright was started without its config. */
export function appUrl(path: string): string {
  return new URL(path, BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`).toString();
}
