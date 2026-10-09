import { defineConfig, devices } from "@playwright/test";
import { BASE_URL } from "./tests/support/urls";

export default defineConfig({
  testDir: "./tests/specs",
  timeout: 30000,
  retries: 2,
  workers: 1,
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["list"],
    ["allure-playwright"],
  ],
  use: {
    baseURL: BASE_URL,
    headless: !!process.env.CI,
    viewport: { width: 1920, height: 1080 },
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
