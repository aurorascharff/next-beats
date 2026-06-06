import { test, expect } from '@playwright/test';

test('sidebar has nav links and playlists stream in', async ({ page }) => {
  await page.goto('/library');

  await expect(page.locator('aside a[href="/"][aria-label="Home"]')).toBeVisible();
  await expect(page.locator('aside a[href="/search"]')).toBeVisible();
  await expect(page.locator('aside a[href="/library"]')).toBeVisible();
  await expect(page.locator('aside a[href="/favorites"]')).toBeVisible();
  await expect(page.locator('aside a[href^="/playlist/"]').first()).toBeVisible({ timeout: 15000 });
});
