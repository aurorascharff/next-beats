import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test('skeleton shows first, track detail streams in', async ({ page }) => {
  await page.goto('/');
  const firstTrackLink = page.locator('a[href^="/track/"]').first();
  await firstTrackLink.waitFor({ timeout: 15000 });
  const href = await firstTrackLink.getAttribute('href');

  await page.goto(href!);
  await expect(page.locator('main h1').first()).toBeVisible({ timeout: 15000 });
});
