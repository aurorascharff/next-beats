import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test('genre page: app shell paints instantly, heading streams in', async ({ page }) => {
  await page.goto('/search');
  const link = page.locator('main a[href^="/genre/"]').first();
  await link.waitFor({ state: 'visible', timeout: 15000 });
  const href = await link.getAttribute('href');

  await instant(page, async () => {
    await page.goto(href!);
    await expect(page.locator('main .skeleton-animation').first()).toBeVisible();
    await expect(page.locator('main h1')).toHaveCount(0);
  });

  await expect(page.locator('main h1').first()).toBeVisible({ timeout: 15000 });
});
