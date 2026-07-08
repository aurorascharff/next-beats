import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Search page (/search)', () => {
  // Static shell (goto): input only; the searchParams-gated browse grid streams in, so it's absent under instant().
  test('static shell — browse grid absent', async ({ page }) => {
    await page.goto('/');

    await instant(page, async () => {
      await page.goto('/search');
      await expect(page.locator('input[aria-label="Search tracks"]')).toBeVisible();
      await expect(page.locator('main a[href^="/genre/"]')).toHaveCount(0);
    });
  });

  // Runtime prefetch (client nav): allow-runtime resolves searchParams, so the browse grid is present under instant().
  test('runtime prefetch — browse grid revealed', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('aside a[aria-label="Search"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main a[href^="/genre/"]').first()).toBeVisible();
    });
  });
});
