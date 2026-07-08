import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Playlist detail page (/playlist/[id])', () => {
  // Static shell (goto): the detail reads params and streams in, so it's absent under instant().
  test('static shell — detail absent', async ({ page }) => {
    await page.goto('/playlist');
    const link = page.locator('main a[href^="/playlist/"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });
    const href = await link.getAttribute('href');

    await instant(page, async () => {
      await page.goto(href!);
      await expect(page.locator('main h1')).toHaveCount(0);
    });
  });

  // Runtime prefetch (client nav): allow-runtime resolves params, so the detail is present under instant().
  test('runtime prefetch — detail revealed', async ({ page }) => {
    await page.goto('/playlist');
    const link = page.locator('main a[href^="/playlist/"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main h1')).toBeVisible();
    });
  });
});
