import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Favorites page (/favorites)', () => {
  // Static shell (goto): the favorites feed streams in behind Suspense, so it's absent under instant().
  test('static shell — favorites absent', async ({ page }) => {
    await page.goto('/');

    await instant(page, async () => {
      await page.goto('/favorites');
      await expect(page.locator('main a[href^="/track/"]')).toHaveCount(0);
    });
  });

  // Runtime prefetch (client nav): allow-runtime resolves cookies, so the favorites are present under instant().
  test('runtime prefetch — favorites revealed', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('aside a[aria-label="Liked Tracks"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main a[href^="/track/"]').first()).toBeVisible();
    });
  });
});
