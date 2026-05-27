import { test, expect } from '@playwright/test';

test.describe('Prefetch toggle', () => {
  test('toggle is visible and shows prefetch on by default', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: /prefetch on/i });
    await expect(toggle).toBeVisible();
  });

  test('clicking toggle switches to prefetch off', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: /prefetch on/i });
    await toggle.click();

    await page.waitForLoadState('networkidle');
    const toggleOff = page.getByRole('button', { name: /prefetch off/i });
    await expect(toggleOff).toBeVisible({ timeout: 10000 });
  });
});
