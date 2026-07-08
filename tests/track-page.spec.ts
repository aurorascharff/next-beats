import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Track page (/track/[id])', () => {
  // Static shell (goto): the title reads params and streams in, so it's absent under instant().
  test('static shell — title absent', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('main a[href^="/track/"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });
    const href = await link.getAttribute('href');

    await instant(page, async () => {
      await page.goto(href!);
      await expect(page.locator('main h1')).toHaveCount(0);
    });
  });

  // Runtime prefetch (client nav): allow-runtime resolves params, so the title is present under instant().
  test('runtime prefetch — title revealed', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('main a[href^="/track/"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main h1')).toBeVisible();
    });
  });
});
