import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test('shell has heading, genre cards stream in', async ({ page }) => {
  await page.goto('/library');
  await expect(page.locator('a[href^="/track/"]').first()).toBeVisible({ timeout: 15000 });

  await instant(page, async () => {
    await page.goto('/genre');

    await expect(page.getByRole('heading', { level: 1, name: 'Browse All' })).toBeVisible();
  });

  await expect(page.locator('a[href^="/genre/"]').first()).toBeVisible({ timeout: 15000 });
});
