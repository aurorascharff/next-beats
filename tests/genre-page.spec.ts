import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Genre page (/genre/[genre])', () => {
  // Static shell (goto): the heading reads params and streams in, so it's absent under instant().
  test('static shell — heading absent', async ({ page }) => {
    await page.goto('/search');
    const link = page.locator('main a[href^="/genre/"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });
    const href = await link.getAttribute('href');

    await instant(page, async () => {
      await page.goto(href!);
      await expect(page.locator('main h1')).toHaveCount(0);
    });
  });

  // Runtime prefetch (client nav): allow-runtime resolves params, so the heading is present under instant().
  test('runtime prefetch — heading revealed', async ({ page }) => {
    await page.goto('/search');
    const link = page.locator('main a[href^="/genre/"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main h1')).toBeVisible();
    });
  });
});
