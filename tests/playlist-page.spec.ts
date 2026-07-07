import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Playlists page (/playlist)', () => {
  // SSR: document navigation → App Shell only, playlist list absent under instant().
  test('SSR — shell only, playlist list is absent', async ({ page }) => {
    await page.goto('/');

    await instant(page, async () => {
      await page.goto('/playlist');
      await expect(page.locator('main a[href^="/playlist/"]')).toHaveCount(0);
    });
  });

  // Navigation: client nav carries the runtime prefetch → playlist list revealed.
  test('navigation — runtime-prefetched playlist list is revealed', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('aside a[href="/playlist"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main a[href^="/playlist/"]').first()).toBeVisible();
    });
  });
});
