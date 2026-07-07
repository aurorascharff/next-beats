import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test('search page: input shell paints instantly, browse grid streams in', async ({ page }) => {
  await page.goto('/');

  await instant(page, async () => {
    await page.goto('/search');
    await expect(page.locator('input[aria-label="Search tracks"]')).toBeVisible();
    await expect(page.locator('main a[href^="/genre/"]')).toHaveCount(0);
  });

  await expect(page.locator('main a[href^="/genre/"]').first()).toBeVisible({ timeout: 15000 });
});
