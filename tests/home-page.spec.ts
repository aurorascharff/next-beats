import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test('shell has heading and skeleton, content streams in', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[href^="/track/"]').first()).toBeVisible({ timeout: 15000 });

  await instant(page, async () => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1, name: 'Welcome back' })).toBeVisible();
  });

  await expect(page.locator('a[href^="/track/"]').first()).toBeVisible({ timeout: 15000 });
});
