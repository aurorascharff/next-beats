import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  reporter: 'html',
  retries: process.env.CI ? 2 : 0,
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3002',
    storageState: {
      cookies: [
        {
          name: 'beats-user',
          value: 'e2e',
          domain: 'localhost',
          path: '/',
          httpOnly: false,
          secure: false,
          sameSite: 'Lax',
          expires: -1,
        },
      ],
      origins: [],
    },
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm dev --port 3002',
    reuseExistingServer: true,
    stdout: 'pipe',
    url: 'http://localhost:3002/login',
  },
  workers: process.env.CI ? 1 : undefined,
});
