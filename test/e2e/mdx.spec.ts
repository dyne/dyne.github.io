import { expect, test } from '@playwright/test';

test('MDX routes retain their layouts and rendered Astro component content', async ({ page }) => {
	await page.route('https://cdn.jsdelivr.net/ghost/**', route => route.fulfill({ contentType: 'application/javascript', body: '' }));
	for (const route of ['conspire', 'freej', 'gestalt-concept', 'jaromail', 'promptline']) {
		const response = await page.goto(`/${route}/`);
		expect(response?.status()).toBe(200);
		await expect(page.locator('main')).toBeVisible();
		await expect(page.locator('main h1').first()).toBeVisible();
		if (route === 'freej') await expect(page.getByRole('heading', { name: 'Features', level: 1, exact: true })).toBeVisible();
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://dyne.org/${route}/`);
	}
	// This MDX entry is a legacy redirect; inspect the stub without visiting the external blog.
	const writings = await page.request.get('/writings/');
	expect(writings.status()).toBe(200);
	expect(await writings.text()).toMatch(/<meta\b[^>]*http-equiv="refresh"[^>]*content="0;url=https:\/\/news\.dyne\.org\/tag\/think-do-tank\/"/);
	await page.goto('/jaromail/');
	await expect(page.getByRole('heading', { name: 'Features', exact: true })).toBeVisible();
	await expect(page.locator('section#tomb').getByRole('heading')).toContainText('Tomb');
	await expect(page.locator('section#tomb img')).toBeVisible();
});

test('Astro components imported by MDX retain their client event handlers', async ({ page }) => {
	await page.goto('/conspire/');
	// Observe the handler without opening a popup or contacting the chat service.
	await page.evaluate(() => {
		window.open = (url) => {
			document.documentElement.dataset.mdxOpened = String(url);
			return null;
		};
	});
	await page.getByRole('button', { name: 'Public Channel', exact: true }).click();
	await expect(page.locator('html')).toHaveAttribute('data-mdx-opened', 'https://conspire.dyne.org:8443/room/lobby');
});
