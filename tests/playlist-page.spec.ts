import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test('playlists page: form shell paints instantly, list streams in', async ({ page }) => {
  await page.goto('/');

  await instant(page, async () => {
    await page.goto('/playlist');
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('main a[href^="/playlist/"]')).toHaveCount(0);
  });

  await expect(page.locator('main a[href^="/playlist/"]').first()).toBeVisible({ timeout: 15000 });
});
