import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Playlists page (/playlist)', () => {
  // SSR (direct visit): the static shell for this URL — create form only. The
  // playlist list streams in behind Suspense, so under instant() (streaming
  // held) it's absent.
  test('SSR — static shell only, playlist list absent', async ({ page }) => {
    await page.goto('/');

    await instant(page, async () => {
      await page.goto('/playlist');
      await expect(page.locator('main a[href^="/playlist/"]')).toHaveCount(0);
    });
  });

  // Navigation (client nav): the App Shell plus the per-link runtime prefetch
  // (allow-runtime resolves cookies), so the playlist list is already present
  // under instant().
  test('navigation — App Shell + runtime prefetch reveals playlist list', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('aside a[href="/playlist"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main a[href^="/playlist/"]').first()).toBeVisible();
    });
  });
});
