import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Home page (/)', () => {
  // SSR: document navigation → App Shell only, track feeds absent under instant().
  test('SSR — shell only, track data is absent', async ({ page }) => {
    await page.goto('/library');

    await instant(page, async () => {
      await page.goto('/');
      await expect(page.locator('main a[href^="/track/"]')).toHaveCount(0);
    });
  });

  // Navigation: client nav carries the runtime prefetch → track feeds revealed.
  test('navigation — runtime-prefetched track data is revealed', async ({ page }) => {
    await page.goto('/library');
    const link = page.locator('aside a[aria-label="Home"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main a[href^="/track/"]').first()).toBeVisible();
    });
  });
});
