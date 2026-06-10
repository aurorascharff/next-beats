import { test, expect } from '@playwright/test';

test('search input is static, results stream in after typing', async ({ page }) => {
  await page.goto('/search');

  const input = page.locator('input[aria-label="Search tracks"]');
  await expect(input).toBeVisible();

  await input.fill('midnight');
  await expect(page.locator('a[href^="/track/"]').first()).toBeVisible({ timeout: 15000 });
});
