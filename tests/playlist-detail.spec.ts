import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Playlist detail page (/playlist/[id])', () => {
  // SSR (direct visit): the static shell for this URL. The detail reads params
  // and streams in behind Suspense, so under instant() (streaming held) it's absent.
  test('SSR — static shell only, detail absent', async ({ page }) => {
    await page.goto('/playlist');
    const link = page.locator('main a[href^="/playlist/"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });
    const href = await link.getAttribute('href');

    await instant(page, async () => {
      await page.goto(href!);
      await expect(page.locator('main h1')).toHaveCount(0);
    });
  });

  // Navigation (client nav): the App Shell plus the per-link runtime prefetch
  // (allow-runtime resolves params/cookies), so the detail is already present
  // under instant().
  test('navigation — App Shell + runtime prefetch reveals detail', async ({ page }) => {
    await page.goto('/playlist');
    const link = page.locator('main a[href^="/playlist/"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main h1')).toBeVisible();
    });
  });
});
