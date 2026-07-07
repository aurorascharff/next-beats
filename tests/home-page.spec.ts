import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Home page (/)', () => {
  // SSR (direct visit): the static shell for this URL. The track feeds stream in
  // behind Suspense, so under instant() (streaming held) they're absent.
  test('SSR — static shell only, track data absent', async ({ page }) => {
    await page.goto('/library');

    await instant(page, async () => {
      await page.goto('/');
      await expect(page.locator('main a[href^="/track/"]')).toHaveCount(0);
    });
  });

  // Navigation (client nav): the App Shell plus the per-link runtime prefetch
  // (allow-runtime resolves cookies), so the track feeds are already present
  // under instant().
  test('navigation — App Shell + runtime prefetch reveals track data', async ({ page }) => {
    await page.goto('/library');
    const link = page.locator('aside a[aria-label="Home"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main a[href^="/track/"]').first()).toBeVisible();
    });
  });
});
