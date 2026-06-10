import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test('shell has heading, favorites stream in', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[href^="/track/"]').first()).toBeVisible({ timeout: 15000 });

  await instant(page, async () => {
    await page.goto('/favorites');

    await expect(page.getByRole('heading', { level: 1, name: 'Liked Tracks' })).toBeVisible();
  });

  await expect(page.locator('a[href^="/track/"]').first()).toBeVisible({ timeout: 15000 });
});
