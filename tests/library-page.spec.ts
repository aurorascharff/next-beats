import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Library page (/library)', () => {
  // Static shell (goto): the library grid streams in behind Suspense, so it's absent under instant().
  test('static shell — library grid absent', async ({ page }) => {
    await page.goto('/');

    await instant(page, async () => {
      await page.goto('/library');
      await expect(page.locator('main a[href^="/track/"]')).toHaveCount(0);
    });
  });

  // Runtime prefetch (client nav): allow-runtime, so the library grid is present under instant().
  test('runtime prefetch — library grid revealed', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('aside a[aria-label="Library"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main a[href^="/track/"]').first()).toBeVisible();
    });
  });
});
