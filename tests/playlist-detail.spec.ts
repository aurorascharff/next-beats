import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test('playlist detail: app shell paints instantly, detail streams in', async ({ page }) => {
  await page.goto('/playlist');
  const link = page.locator('main a[href^="/playlist/"]').first();
  await link.waitFor({ state: 'visible', timeout: 15000 });
  const href = await link.getAttribute('href');

  await instant(page, async () => {
    await page.goto(href!);
    await expect(page.locator('main .skeleton-animation').first()).toBeVisible();
    await expect(page.locator('main h1')).toHaveCount(0);
  });

  await expect(page.locator('main h1').first()).toBeVisible({ timeout: 15000 });
});
