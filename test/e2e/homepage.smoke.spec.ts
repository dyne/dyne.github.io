import { expect, test } from '@playwright/test';

test('the production homepage loads with its primary landmark', async ({ page }) => {
	await page.goto('/');

	await expect(page).toHaveTitle(/Digital Community and Free Software Foundry/i);
	await expect(page.locator('main')).toBeVisible();
});
