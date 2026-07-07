import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Playlist detail page (/playlist/[id])', () => {
  // SSR: document navigation → App Shell only, playlist detail absent under instant().
  test('SSR — shell only, detail is absent', async ({ page }) => {
    await page.goto('/playlist');
    const link = page.locator('main a[href^="/playlist/"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });
    const href = await link.getAttribute('href');

    await instant(page, async () => {
      await page.goto(href!);
      await expect(page.locator('main h1')).toHaveCount(0);
    });
  });

  // Navigation: client nav carries the runtime prefetch → detail revealed.
  test('navigation — runtime-prefetched detail is revealed', async ({ page }) => {
    await page.goto('/playlist');
    const link = page.locator('main a[href^="/playlist/"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main h1')).toBeVisible();
    });
  });
});
