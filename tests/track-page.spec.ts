import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Track page (/track/[id])', () => {
  // SSR (direct visit): the static shell for this URL. The title reads params
  // and streams in behind Suspense, so under instant() (streaming held) it's absent.
  test('SSR — static shell only, title absent', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('main a[href^="/track/"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });
    const href = await link.getAttribute('href');

    await instant(page, async () => {
      await page.goto(href!);
      await expect(page.locator('main h1')).toHaveCount(0);
    });
  });

  // Navigation (client nav): the App Shell plus the per-link runtime prefetch
  // (allow-runtime resolves params/cookies), so the title is already present
  // under instant().
  test('navigation — App Shell + runtime prefetch reveals title', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('main a[href^="/track/"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main h1')).toBeVisible();
    });
  });
});
