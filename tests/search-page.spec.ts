import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Search page (/search)', () => {
  // SSR: document navigation → App Shell only (input), searchParams-gated
  // browse grid absent under instant().
  test('SSR — shell only, browse grid is absent', async ({ page }) => {
    await page.goto('/');

    await instant(page, async () => {
      await page.goto('/search');
      await expect(page.locator('input[aria-label="Search tracks"]')).toBeVisible();
      await expect(page.locator('main a[href^="/genre/"]')).toHaveCount(0);
    });
  });

  // Navigation: client nav carries the runtime prefetch → browse grid revealed.
  test('navigation — runtime-prefetched browse grid is revealed', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('aside a[aria-label="Search"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main a[href^="/genre/"]').first()).toBeVisible();
    });
  });
});
