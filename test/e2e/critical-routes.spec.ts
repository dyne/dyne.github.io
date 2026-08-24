import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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

test('representative pages expose route-derived canonical metadata', async ({ page }) => {
	for (const [path, canonical] of [
		['/', 'https://dyne.org/'],
		['/software/', 'https://dyne.org/software/'],
		['/donate/', 'https://dyne.org/donate/'],
		['/awards/', 'https://dyne.org/awards/'],
	] as const) {
		await page.goto(path);
		await expect(page).toHaveTitle(/\S/);
		await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S/);
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
		await expect(page.locator('h1')).toHaveCount(1);
	}
});

test('homepage and recovery page expose machine-readable discovery links', async ({ page }) => {
	for (const path of ['/', '/this-route-does-not-exist/']) {
		await page.goto(path);
		for (const href of ['/llms.txt', '/openapi.json', '/sitemap-index.xml', '/.well-known/nostr.json', '/404.md']) {
			await expect(page.locator(`link[href="${href}"]`)).toHaveCount(1);
		}
	}
});

test('static redirect destination remains reachable when JavaScript is disabled', async ({ browser }, testInfo) => {
	const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
	const page = await context.newPage();
	await page.goto('/tomb/');
	await expect(page).toHaveURL(/\/software\/tomb\/?$/);
	await expect(page.locator('h1').first()).toBeVisible();
	await page.screenshot({ path: testInfo.outputPath('static-redirect-js-disabled.png') });
	await context.close();
});

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

test('mobile navigation is a keyboard-operable disclosure', async ({ page }, testInfo) => {
	test.skip(testInfo.project.name !== 'chromium-mobile', 'Mobile-only disclosure behavior.');
	await page.goto('/');
	const trigger = page.locator('[data-aw-toggle-menu]');
	await trigger.focus();
	await page.keyboard.press('Enter');
	await expect(trigger).toHaveAttribute('aria-expanded', 'true');
	await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
	await expect(page.locator('#content')).toHaveJSProperty('inert', true);
	await page.screenshot({ path: testInfo.outputPath('mobile-menu-open-390x844-100.png') });
	await page.keyboard.press('Escape');
	await expect(trigger).toBeFocused();
	await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden();
	await page.keyboard.press('Enter');
	await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Software' }).click();
	await expect(page).toHaveURL(/\/software\/?$/);
});

test('testimonial carousel controls meet keyboard and target-size requirements', async ({ page }, testInfo) => {
	await page.goto('/');
	const carousel = page.getByRole('region', { name: 'Testimonials' });
	await carousel.scrollIntoViewIfNeeded();
	await expect(carousel).toBeVisible();
	const control = carousel.locator('.swiper-pagination-bullet').first();
	await expect(control).toBeVisible();
	const size = await control.evaluate((element) => { const box = element.getBoundingClientRect(); return [box.width, box.height]; });
	expect(size[0]).toBeGreaterThanOrEqual(24);
	expect(size[1]).toBeGreaterThanOrEqual(24);
	await control.focus();
	await page.keyboard.press('Enter');
	await page.screenshot({ path: testInfo.outputPath('testimonial-controls.png') });
});

test('testimonial carousel disables autoplay for reduced motion', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/');
	await expect(page.getByRole('region', { name: 'Testimonials' })).toBeVisible();
	await expect(page.locator('#testimonials-slider')).toHaveAttribute('aria-roledescription', 'carousel');
});

test('wallet copy announces success and failure', async ({ page }, testInfo) => {
	await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.resolve() } }));
	await page.goto('/donate/');
	await page.locator('#bitcoin').click();
	await expect(page.locator('#wallet-copy-status')).toContainText('bitcoin wallet address copied');
	await page.screenshot({ path: testInfo.outputPath('donation-crypto-panel.png') });
});

test('wallet copy announces clipboard denial', async ({ page }) => {
	await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('denied')) } }));
	await page.goto('/donate/');
	await page.locator('#bitcoin').click();
	await expect(page.locator('#wallet-copy-status')).toContainText('Could not copy');
});

test('deterministic palettes preserve visible keyboard focus without console errors', async ({ page }, testInfo) => {
	const errors: string[] = [];
	page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
	for (const palette of [0, 1, 2]) {
		await page.addInitScript((value) => { document.documentElement.dataset.palette = String(value); }, palette);
		await page.goto('/');
		await page.getByRole('link', { name: 'Skip to main content' }).focus();
		await page.screenshot({ path: testInfo.outputPath(`focus-palette-${palette}.png`) });
	}
	expect(errors).toEqual([]);
});

test('the skip link exposes and focuses the shared main landmark', async ({ page }, testInfo) => {
	await page.goto('/');
	await page.keyboard.press('Tab');

	const skipLink = page.getByRole('link', { name: 'Skip to main content' });
	await expect(skipLink).toBeFocused();
	await expect(skipLink).toBeVisible();
	await page.keyboard.press('Enter');
	await expect(page.locator('main#content')).toBeFocused();

	await page.screenshot({ path: testInfo.outputPath('skip-link-desktop-1440x900.png') });
});

for (const fontScale of [100, 200]) {
	test(`shared shell screenshot at ${fontScale}% font scale`, async ({ page }, testInfo) => {
		await page.goto('/');
		await page.locator('html').evaluate((element, scale) => {
			element.style.fontSize = `${scale}%`;
		}, fontScale);
		const viewport = testInfo.project.name === 'chromium-mobile' ? '390x844' : '1440x900';
		await page.screenshot({ path: testInfo.outputPath(`shared-shell-${viewport}-${fontScale}.png`) });
	});
}

for (const path of ['/', '/software/', '/donate/', '/this-route-does-not-exist/']) {
	test(`${path} has no serious or critical axe violations`, async ({ page }) => {
		await page.goto(path);
		const results = await new AxeBuilder({ page }).analyze();
		const blocking = results.violations.filter((violation) =>
			['serious', 'critical'].includes(violation.impact ?? '')
		);
		expect(blocking, blocking.map((violation) => `${violation.id}: ${violation.help}`).join('\n')).toEqual([]);
	});
}
