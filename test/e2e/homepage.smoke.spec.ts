import { expect, test } from '@playwright/test';

test('the production homepage loads with its primary landmark', async ({ page }) => {
	await page.goto('/');

	await expect(page).toHaveTitle(/Digital Community and Free Software Foundry/i);
	await expect(page.locator('main')).toBeVisible();
});

test('homepage actions predict their destination and follow the keyboard reading order', async ({ page }) => {
	await page.goto('/');
	const hero = page.locator('[data-home-hero]');
	const software = hero.getByRole('link', { name: 'Explore software', exact: true });
	const community = hero.getByRole('link', { name: 'Join the community', exact: true });
	const story = hero.getByRole('link', { name: 'Our story', exact: true });
	await expect(software).toHaveAttribute('href', '/software');
	await expect(community).toHaveAttribute('href', '/contact');
	await expect(story).toHaveAttribute('href', '#timeline');
	expect(await software.evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe(await community.evaluate(el => getComputedStyle(el).backgroundColor));
	await page.keyboard.press('Tab');
	await page.keyboard.press('Enter');
	for (const link of [software, community, story]) {
		await page.keyboard.press('Tab');
		await expect(link).toBeFocused();
		expect(await link.evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe('none');
	}
	await page.keyboard.press('Enter');
	await expect(page).toHaveURL(/#timeline$/);
	await expect(page.locator('#timeline')).toBeVisible();
});

for (const scale of [100, 200]) {
	test(`hero actions and slogan reflow at ${scale}% text scale`, async ({ page }) => {
		await page.goto('/');
		await page.locator('html').evaluate((el, value) => { el.style.fontSize = `${value}%`; }, scale);
		const overflow = await page.locator('[data-home-hero]').evaluate(el => {
			return [...el.querySelectorAll('p:not(.sr-only), a')].filter(node => {
				const range = document.createRange(); range.selectNodeContents(node);
				return [...range.getClientRects()].some(r => r.left < -1 || r.right > innerWidth + 1);
			}).map(node => node.textContent);
		});
		expect(overflow).toEqual([]);
	});
}

test('hero links reflow at 320px', async ({ page }) => {
	await page.setViewportSize({ width: 320, height: 844 });
	await page.goto('/');
	for (const link of await page.locator('[data-home-hero] a').all()) {
		const box = await link.boundingBox();
		expect(box).not.toBeNull();
		expect(box!.x).toBeGreaterThanOrEqual(0);
		expect(box!.x + box!.width).toBeLessThanOrEqual(320);
	}
});

test('narrow homepage headings use the loaded Syne face independently of body text', async ({ page }) => {
	await page.setViewportSize({ width: 320, height: 844 });
	await page.goto('/');
	await page.locator('body').evaluate(body => { body.style.fontFamily = 'monospace'; });
	const load = await page.evaluate(async () => {
		const files = await document.fonts.load('700 32px Syne');
		return files.some(face => face.status === 'loaded');
	});
	expect(load).toBe(true);
	const headline = page.getByRole('heading', { name: 'Free to share code.' });
	await expect(headline).toHaveCSS('font-weight', '700');
	for (const name of ['Free to share code.', 'Who we are', 'Planet Dyne', 'Software you can use']) {
		await expect(page.getByRole('heading', { name, exact: true })).toHaveCSS('font-family', /^Syne, sans-serif$/);
	}
});

test('the homepage preserves its original section order and keyboard-accessible project directory', async ({ page }) => {
	await page.goto('/');
	const highlights = page.locator('[data-project-highlights]');
	await expect(highlights.getByRole('heading', { level: 3 })).toHaveText(['Zenroom', 'Devuan', 'Tomb']);
	expect(await page.evaluate(() => {
		const sections = ['[data-home-hero]', '#who-we-are', '.heritage-action', '[data-home-newsletter]', 'a[href="https://dynebolic.org"]', '[data-home-projects]', '.homepage-testimonials', '[data-home-participation]', '#timeline'].map(selector => document.querySelector(selector));
		return sections.every((section, index) => section && (index === 0 || Boolean(sections[index - 1]!.compareDocumentPosition(section) & Node.DOCUMENT_POSITION_FOLLOWING)));
	})).toBe(true);
	await highlights.getByRole('link', { name: 'Explore Zenroom' }).focus();
	await page.keyboard.press('Tab');
	await expect(highlights.getByRole('link', { name: 'Explore Devuan' })).toBeFocused();
	const directory = highlights.getByRole('link', { name: 'Browse all software' });
	await directory.focus();
	await page.keyboard.press('Enter');
	await expect(page).toHaveURL(/\/software\/?$/);
});

for (const scale of [100, 200]) {
	test(`project highlights and newsletter reflow at ${scale}% text scale`, async ({ page }) => {
		await page.goto('/');
		await page.locator('html').evaluate((el, value) => { el.style.fontSize = `${value}%`; }, scale);
		for (const selector of ['[data-project-highlights]', '[data-home-newsletter]']) {
			const overflow = await page.locator(selector).evaluate(el => [...el.querySelectorAll('p,a,h2,h3')].filter(node => {
				const range = document.createRange(); range.selectNodeContents(node);
				return [...range.getClientRects()].some(r => r.left < -1 || r.right > innerWidth + 1);
			}).map(node => node.textContent));
			expect(overflow).toEqual([]);
		}
		const collisions = await page.locator('[data-project-highlights] li').evaluateAll(rows => rows.filter(row => {
			const purpose = row.querySelector('p')!.getBoundingClientRect();
			const action = row.querySelector('a')!.getBoundingClientRect();
			return purpose.left < action.right && purpose.right > action.left && purpose.top < action.bottom && purpose.bottom > action.top;
		}).map(row => row.querySelector('h3')!.textContent));
		expect(collisions).toEqual([]);
	});
}

test('the homepage keeps image delivery and layout within its initial-load budget', async ({ page }, testInfo) => {
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
	await expect(portraits.first()).toHaveAttribute('width', '320');
	await page.waitForTimeout(250);

	const metrics = await page.evaluate(() => {
		const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
		return {
			transferBytes: resources.reduce((total, entry) => total + entry.transferSize, 0),
			requestCount: resources.length,
			cls: globalThis.cumulativeLayoutShift,
		};
	});
	await testInfo.attach('homepage-initial-load-metrics', {
		body: Buffer.from(JSON.stringify(metrics, null, 2)),
		contentType: 'application/json',
	});

	expect(metrics.transferBytes).toBeLessThanOrEqual(2.5 * 1024 * 1024);
	expect(metrics.requestCount).toBeLessThanOrEqual(30);
	expect(metrics.cls).toBeLessThanOrEqual(0.1);
});

test('defers the testimonial carousel dependency until its section is near the viewport', async ({ page }) => {
	const swiperRequests: string[] = [];
	let releaseStylesheet!: () => void;
	const stylesheetReady = new Promise<void>(resolve => { releaseStylesheet = resolve; });
	await page.route('**/swiper-bundle.min.js', async (route) => {
		swiperRequests.push(route.request().url());
		await route.fulfill({ contentType: 'application/javascript', body: 'window.Swiper = class { constructor(root) { document.querySelector(root).dataset.sliderCreated = "true"; } on() {} };' });
	});
	await page.route('**/swiper-bundle.min.css', async (route) => {
		await stylesheetReady;
		await route.fulfill({ contentType: 'text/css', body: '' });
	});

	const carousel = page.locator('[data-swiper-deferred]');
	try {
		await page.goto('/');
		expect(swiperRequests).toHaveLength(0);
		await carousel.scrollIntoViewIfNeeded();
		await page.waitForFunction(() => 'Swiper' in window);
		await expect(carousel).not.toHaveAttribute('data-slider-created', 'true');
	} finally {
		releaseStylesheet();
	}
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

test('testimonial cards stay centered after scrolling and selecting slides on narrow screens', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	const carousel = page.getByRole('region', { name: 'Testimonials' });
	const controls = carousel.locator('.swiper-pagination-bullet');
	for (const width of [320, 390, 480, 768]) {
		await page.setViewportSize({ width, height: 844 });
		await page.goto('/');
		await carousel.locator('.swiper-slide').first().scrollIntoViewIfNeeded();
		await expect(carousel).toHaveAttribute('data-swiper-ready', 'true');

		for (const control of [controls.first(), controls.last(), controls.nth(1)]) {
			await control.click();
			await expect(control).toHaveClass(/swiper-pagination-bullet-active/);
			await expect.poll(() => carousel.evaluate(element => {
				const bounds = element.getBoundingClientRect();
				const cards = [...element.querySelectorAll('.swiper-slide > div')];
				return cards.filter(card => {
					const rect = card.getBoundingClientRect();
					return rect.right > bounds.left + 1 && rect.left < bounds.right - 1;
				}).map(card => {
					const rect = card.getBoundingClientRect();
					return {
						active: card.parentElement!.classList.contains('swiper-slide-active'),
						centered: Math.abs(rect.left + rect.right - bounds.left - bounds.right) < 2,
						inset: rect.left >= bounds.left + 11 && rect.right <= bounds.right - 11,
					};
				});
			}), { message: `fully visible centered card at ${width}px` }).toEqual([
				{ active: true, centered: true, inset: true },
			]);
		}
	}
});

test.describe('without JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	test('testimonial portraits stay larger and equal across every quote', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		for (const [width, scale, expectedSize] of [[390, 100, 256], [1440, 100, 320], [320, 200, null]] as const) {
			await page.setViewportSize({ width, height: 900 });
			await page.goto('/');
			await page.locator('html').evaluate((element, value) => { element.style.fontSize = `${value}%`; }, scale);
			await page.evaluate(() => document.fonts.ready);
			await page.locator('#testimonials-slider').evaluate(element => element.scrollIntoView({ behavior: 'instant', block: 'start' }));
			await expect.poll(() => page.locator('#testimonials-slider img').first().evaluate(image => image.getBoundingClientRect().width)).toBeGreaterThan(0);
			const sizes = await page.locator('#testimonials-slider img').evaluateAll(images => images.map(image => {
				const portrait = image.getBoundingClientRect();
				const copy = image.closest('.swiper-slide')!.querySelector('.testimonial-copy')!.getBoundingClientRect();
				return { width: portrait.width, height: portrait.height, overlap: portrait.left < copy.right && portrait.right > copy.left && portrait.top < copy.bottom && portrait.bottom > copy.top };
			}));
			expect(sizes).toHaveLength(10);
			for (const size of sizes) {
				expect(size.width).toBeCloseTo(expectedSize ?? sizes[0].width, 0);
				expect(size.height).toBeCloseTo(size.width, 0);
				expect(size.width).toBeGreaterThanOrEqual(200);
				expect(size.overlap).toBe(false);
			}
		}
	});

	test('keeps homepage content and the timeline route available', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('main')).toBeVisible();
		await expect(page.getByText('Browse the full Dyne timeline')).toBeVisible();
		await expect(page.getByRole('link', { name: 'full Dyne timeline' })).toHaveAttribute('href', '/timeline');
		const hero = page.locator('[data-home-hero]');
		await expect(hero.getByRole('link', { name: 'Explore software' })).toHaveAttribute('href', '/software');
		await expect(hero.getByRole('link', { name: 'Join the community' })).toHaveAttribute('href', '/contact');
		await expect(hero.getByRole('link', { name: 'Our story' })).toHaveAttribute('href', '#timeline');
		await expect(page.locator('footer').getByRole('link', { name: 'Privacy policy' })).toHaveAttribute('href', '/privacy');
		const originalViewport = page.viewportSize()!;
		for (const [width, scale] of [[originalViewport.width, 100], [originalViewport.width, 200], [320, 100]]) {
			await page.setViewportSize({ width, height: originalViewport.height });
			await page.locator('html').evaluate((el, value) => { el.style.fontSize = `${value}%`; }, scale);
			for (const link of await hero.getByRole('link').all()) {
				await expect(link).toBeVisible();
				const box = (await link.boundingBox())!;
				expect(box.x).toBeGreaterThanOrEqual(0);
				expect(box.x + box.width).toBeLessThanOrEqual(width);
			}
			const highlights = page.locator('[data-project-highlights]');
			for (const name of ['Explore Zenroom', 'Explore Devuan', 'Explore Tomb', 'Browse all software']) await expect(highlights.getByRole('link', { name, exact: true })).toBeVisible();
			await expect(page.locator('[data-home-newsletter]').getByRole('link', { name: 'Get the newsletter' })).toHaveAttribute('href', 'https://news.dyne.org/#/portal/signup');
		}
	});
});
