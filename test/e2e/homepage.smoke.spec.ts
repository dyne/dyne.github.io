import { expect, test } from '@playwright/test';

test('the production homepage loads with its primary landmark', async ({ page }) => {
	await page.goto('/');

	await expect(page).toHaveTitle(/Digital Community and Free Software Foundry/i);
	await expect(page.locator('main')).toBeVisible();
});

test('the homepage keeps image delivery and layout within its initial-load budget', async ({ page }) => {
	await page.addInitScript(() => {
		(globalThis as typeof globalThis & { cumulativeLayoutShift: number }).cumulativeLayoutShift = 0;
		new PerformanceObserver((entries) => {
			for (const entry of entries.getEntries() as Array<PerformanceEntry & { hadRecentInput: boolean; value: number }>) {
				if (!entry.hadRecentInput) globalThis.cumulativeLayoutShift += entry.value;
			}
		}).observe({ type: 'layout-shift', buffered: true });
	});

	await page.goto('/');
	const portraits = page.locator('img[alt="Portrait of testimonial author"]');
	expect(await portraits.count()).toBeGreaterThanOrEqual(10);
	await expect(portraits.first()).toHaveAttribute('loading', 'lazy');
	await expect(portraits.first()).toHaveAttribute('width', '256');
	await page.waitForTimeout(250);

	const metrics = await page.evaluate(() => {
		const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
		return {
			transferBytes: resources.reduce((total, entry) => total + entry.transferSize, 0),
			requestCount: resources.length,
			cls: globalThis.cumulativeLayoutShift,
		};
	});

	expect(metrics.transferBytes).toBeLessThanOrEqual(2.5 * 1024 * 1024);
	expect(metrics.requestCount).toBeLessThanOrEqual(30);
	expect(metrics.cls).toBeLessThanOrEqual(0.1);
});

test('defers the testimonial carousel dependency until its section is near the viewport', async ({ page }) => {
	const swiperRequests: string[] = [];
	await page.route('**/swiper-bundle.min.js', async (route) => {
		swiperRequests.push(route.request().url());
		await route.fulfill({ contentType: 'application/javascript', body: 'window.Swiper = class { on() {} };' });
	});
	await page.route('**/swiper-bundle.min.css', (route) => route.fulfill({ contentType: 'text/css', body: '' }));

	await page.goto('/');
	expect(swiperRequests).toHaveLength(0);
	const carousel = page.locator('[data-swiper-deferred]');
	await carousel.scrollIntoViewIfNeeded();
	await expect(carousel).toHaveAttribute('data-swiper-ready', 'true');
	expect(swiperRequests).toHaveLength(1);
});

test('respects reduced motion when the deferred carousel becomes visible', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.route('**/swiper-bundle.min.js', (route) => route.fulfill({ contentType: 'application/javascript', body: 'window.Swiper = class { on() {} };' }));
	await page.route('**/swiper-bundle.min.css', (route) => route.fulfill({ contentType: 'text/css', body: '' }));
	await page.goto('/');
	const carousel = page.locator('[data-swiper-deferred]');
	await carousel.scrollIntoViewIfNeeded();
	await expect(carousel).toHaveAttribute('data-swiper-autoplay', 'false');
});

test.describe('without JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	test('keeps homepage content and the timeline route available', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('main')).toBeVisible();
		await expect(page.getByText('Browse the full Dyne timeline')).toBeVisible();
		await expect(page.getByRole('link', { name: 'full Dyne timeline' })).toHaveAttribute('href', '/timeline');
	});
});
