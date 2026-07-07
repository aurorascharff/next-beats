import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Library page (/library)', () => {
  // SSR: document navigation → App Shell only, library grid absent under instant().
  test('SSR — shell only, library grid is absent', async ({ page }) => {
    await page.goto('/');

    await instant(page, async () => {
      await page.goto('/library');
      await expect(page.locator('main a[href^="/track/"]')).toHaveCount(0);
    });
  });

  // Navigation: client nav carries the runtime prefetch → library grid revealed.
  test('navigation — runtime-prefetched library grid is revealed', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('aside a[aria-label="Library"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main a[href^="/track/"]').first()).toBeVisible();
    });
  });
});
