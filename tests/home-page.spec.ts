import { test, expect } from '@playwright/test';

test('home renders starter stub', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('main').getByText('Home', { exact: true })).toBeVisible();
});
