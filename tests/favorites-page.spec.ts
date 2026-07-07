import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Favorites page (/favorites)', () => {
  // SSR: document navigation → App Shell only, favorites absent under instant().
  test('SSR — shell only, favorites are absent', async ({ page }) => {
    await page.goto('/');

    await instant(page, async () => {
      await page.goto('/favorites');
      await expect(page.locator('main a[href^="/track/"]')).toHaveCount(0);
    });
  });

  // Navigation: client nav carries the runtime prefetch → favorites revealed.
  test('navigation — runtime-prefetched favorites are revealed', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('aside a[aria-label="Liked Tracks"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main a[href^="/track/"]').first()).toBeVisible();
    });
  });
});
