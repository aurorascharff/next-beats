import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Track page (/track/[id])', () => {
  // SSR: a document navigation (goto) only has the App Shell. The title reads
  // params and streams in, so under instant() (streaming held) it is absent.
  test('SSR — shell only, title is absent', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('main a[href^="/track/"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });
    const href = await link.getAttribute('href');

    await instant(page, async () => {
      await page.goto(href!);
      await expect(page.locator('main h1')).toHaveCount(0);
    });
  });

  // Navigation: a client-side nav carries the per-link runtime prefetch
  // (allow-runtime), so the title is already present under instant().
  test('navigation — runtime-prefetched title is revealed', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('main a[href^="/track/"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await expect(page.locator('main h1')).toBeVisible();
    });
  });
});
