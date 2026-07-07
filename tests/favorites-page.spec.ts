import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Favorites page (/favorites)', () => {
  // SSR (direct visit): the static shell for this URL. The favorites feed streams
  // in behind Suspense, so under instant() (streaming held) it's absent.
  test('SSR — static shell only, favorites absent', async ({ page }) => {
    await page.goto('/');

    await instant(page, async () => {
      await page.goto('/favorites');
      await expect(page.locator('main a[href^="/track/"]')).toHaveCount(0);
    });
  });

  // Navigation (client nav): the App Shell plus the per-link runtime prefetch
  // (allow-runtime resolves cookies), so the favorites are already present
  // under instant().
  test('navigation — App Shell + runtime prefetch reveals favorites', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('aside a[aria-label="Liked Tracks"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main a[href^="/track/"]').first()).toBeVisible();
    });
  });
});
