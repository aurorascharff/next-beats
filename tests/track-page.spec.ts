import { test, expect } from '@playwright/test';

test('track starter stub renders', async ({ page }) => {
  await page.goto('/track/t1');
  await expect(page.getByText('Track', { exact: true })).toBeVisible();
});
