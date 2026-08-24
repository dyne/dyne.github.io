import { expect, test } from '@playwright/test';

const routes = [
	['/', 200],
	['/software/', 200],
	['/donate/', 200],
	['/timeline/', 200],
	['/this-route-does-not-exist/', 404],
] as const;

for (const [path, status] of routes) {
	test(`${path} renders its primary page heading`, async ({ page }) => {
		const response = await page.goto(path);

		expect(response?.status()).toBe(status);
		await expect(page.locator('h1').first()).toBeVisible();
		if (status === 200) expect(await page.title()).not.toBe('');
	});
}

test('desktop navigation reaches the software index without leaving the site', async ({ page }, testInfo) => {
	test.skip(
		testInfo.project.name !== 'chromium-desktop',
		'The full navigation is replaced by the mobile disclosure menu.'
	);

	await page.goto('/');
	await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Software' }).click();

	await expect(page).toHaveURL(/\/software\/?$/);
	await expect(page.locator('h1').first()).toBeVisible();
});
