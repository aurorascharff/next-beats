import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test('shell has heading and form, playlists stream in', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[href^="/track/"]').first()).toBeVisible({ timeout: 15000 });

  await instant(page, async () => {
    await page.goto('/playlist');

    await expect(page.getByRole('heading', { level: 1, name: 'Playlists' })).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('a[href^="/playlist/"]')).toHaveCount(0);
  });

  await expect(page.locator('a[href^="/playlist/"]').first()).toBeVisible({ timeout: 15000 });
});
