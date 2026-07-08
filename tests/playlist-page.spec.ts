import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Playlists page (/playlist)', () => {
  // Static shell (goto): the playlist list streams in behind Suspense, so it's absent under instant().
  test('static shell — playlist list absent', async ({ page }) => {
    await page.goto('/');

    await instant(page, async () => {
      await page.goto('/playlist');
      await expect(page.locator('main a[href^="/playlist/"]')).toHaveCount(0);
    });
  });

  // Runtime prefetch (client nav): allow-runtime resolves cookies, so the playlist list is present under instant().
  test('runtime prefetch — playlist list revealed', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('aside a[href="/playlist"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main a[href^="/playlist/"]').first()).toBeVisible();
    });
  });
});
