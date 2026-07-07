import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test('home page: welcome shell paints instantly, track data streams in', async ({ page }) => {
  await page.goto('/library');

  await instant(page, async () => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'Welcome back' })).toBeVisible();
    await expect(page.locator('main a[href^="/track/"]')).toHaveCount(0);
  });

  await expect(page.locator('main a[href^="/track/"]').first()).toBeVisible({ timeout: 15000 });
});
