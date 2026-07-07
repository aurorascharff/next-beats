import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Search page (/search)', () => {
  // SSR (direct visit): the static shell for this URL — search input only. The
  // searchParams-gated browse grid streams in behind Suspense, so under
  // instant() (streaming held) it's absent.
  test('SSR — static shell only, browse grid absent', async ({ page }) => {
    await page.goto('/');

    await instant(page, async () => {
      await page.goto('/search');
      await expect(page.locator('input[aria-label="Search tracks"]')).toBeVisible();
      await expect(page.locator('main a[href^="/genre/"]')).toHaveCount(0);
    });
  });

  // Navigation (client nav): the App Shell plus the per-link runtime prefetch
  // (allow-runtime resolves searchParams), so the browse grid is already present
  // under instant().
  test('navigation — App Shell + runtime prefetch reveals browse grid', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('aside a[aria-label="Search"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main a[href^="/genre/"]').first()).toBeVisible();
    });
  });
});
