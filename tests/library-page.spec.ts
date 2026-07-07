import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Library page (/library)', () => {
  // SSR (direct visit): the static shell for this URL. The library grid streams
  // in behind Suspense, so under instant() (streaming held) it's absent.
  test('SSR — static shell only, library grid absent', async ({ page }) => {
    await page.goto('/');

    await instant(page, async () => {
      await page.goto('/library');
      await expect(page.locator('main a[href^="/track/"]')).toHaveCount(0);
    });
  });

  // Navigation (client nav): the App Shell plus the per-link runtime prefetch
  // (allow-runtime), so the library grid is already present under instant().
  test('navigation — App Shell + runtime prefetch reveals library grid', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('aside a[aria-label="Library"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main a[href^="/track/"]').first()).toBeVisible();
    });
  });
});
