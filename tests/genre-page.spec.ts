import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Genre page (/genre/[genre])', () => {
  // SSR: document navigation → App Shell only, genre heading absent under instant().
  test('SSR — shell only, heading is absent', async ({ page }) => {
    await page.goto('/search');
    const link = page.locator('main a[href^="/genre/"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });
    const href = await link.getAttribute('href');

    await instant(page, async () => {
      await page.goto(href!);
      await expect(page.locator('main h1')).toHaveCount(0);
    });
  });

  // Navigation: client nav carries the runtime prefetch → heading revealed.
  test('navigation — runtime-prefetched heading is revealed', async ({ page }) => {
    await page.goto('/search');
    const link = page.locator('main a[href^="/genre/"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main h1')).toBeVisible();
    });
  });
});
