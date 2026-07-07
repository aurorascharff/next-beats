import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test('library page: heading shell paints instantly, library grid streams in', async ({ page }) => {
  await page.goto('/');

  await instant(page, async () => {
    await page.goto('/library');
    await expect(page.getByRole('heading', { level: 1, name: 'Library' })).toBeVisible();
    await expect(page.locator('main a[href^="/track/"]')).toHaveCount(0);
  });

  await expect(page.locator('main a[href^="/track/"]').first()).toBeVisible({ timeout: 15000 });
});
