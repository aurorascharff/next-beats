import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Sidebar', () => {
  // The sidebar's nav links are static (part of the static shell). The user's
  // playlists read cookies and stream in behind Suspense, so under instant()
  // (streaming held) the nav links are present but the playlists are absent —
  // then they stream in once the lock releases.
  test('SSR — static nav links present, playlists absent then stream in', async ({ page }) => {
    await page.goto('/');

    await instant(page, async () => {
      await page.goto('/');
      await expect(page.locator('aside a[aria-label="Home"]')).toBeVisible();
      await expect(page.locator('aside a[aria-label="Search"]')).toBeVisible();
      await expect(page.locator('aside a[aria-label="Library"]')).toBeVisible();
      await expect(page.locator('aside a[aria-label="Liked Tracks"]')).toBeVisible();
      await expect(page.locator('aside a[href^="/playlist/"]')).toHaveCount(0);
    });

    await expect(page.locator('aside a[href^="/playlist/"]').first()).toBeVisible({ timeout: 15000 });
  });
});
