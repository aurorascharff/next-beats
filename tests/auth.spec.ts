import { test, expect } from '@playwright/test';

test.describe('Auth', () => {
  // Unauthed visits redirect to /login.
  test.use({ storageState: { cookies: [], origins: [] } });

  test('unauthed visit redirects to /login', async ({ page }) => {
    await page.goto('/library');
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.locator('input[name="name"]')).toBeVisible();
  });

  test('signing in sets cookie and redirects home', async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[name="name"]').fill('Aurora');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page).toHaveURL('/', { timeout: 15000 });
  });
});
