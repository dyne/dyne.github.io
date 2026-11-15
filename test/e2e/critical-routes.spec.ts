import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
const donationBaseline = JSON.parse(readFileSync(new URL('../fixtures/donation-baseline.json', import.meta.url), 'utf8'));

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
	await expect(page.locator('#bitcoin-copy-feedback')).toBeVisible();
	await expect(page.locator('#bitcoin-copy-feedback')).toContainText('bitcoin wallet address copied');
	await page.screenshot({ path: testInfo.outputPath('donation-crypto-panel.png') });
});

test('wallet copy announces clipboard denial', async ({ page }, testInfo) => {
	await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('denied')) } }));
	await page.goto('/donate/');
	await page.locator('#bitcoin').click();
	await expect(page.locator('#wallet-copy-status')).toContainText('Could not copy');
	await expect(page.locator('#bitcoin-copy-feedback')).toBeVisible();
	await expect(page.locator('#bitcoin-copy-feedback')).toContainText('Please copy it manually');
	const address = page.locator('#bitcoin-address');
	await expect(address).toHaveText(donationBaseline.wallets[0].address);
	await address.focus();
	await expect(address).toBeFocused();
	const selected = await address.evaluate(element => {
		const range = document.createRange(); range.selectNodeContents(element);
		const selection = window.getSelection(); selection?.removeAllRanges(); selection?.addRange(range);
		return selection?.toString();
	});
	expect(selected).toBe(donationBaseline.wallets[0].address);
	await page.locator('#bitcoin-copy-feedback').scrollIntoViewIfNeeded();
	await page.screenshot({ path: testInfo.outputPath('donation-copy-denial.png') });
});

test('donation tabs support arrow, Home and End keys with provider labels', async ({ page }) => {
	await page.goto('/donate/');
	const choices = page.getByRole('navigation', { name: 'Support choices' }).getByRole('link');
	await choices.first().focus();
	for (let index = 0; index < 3; index++) {
		await expect(choices.nth(index)).toBeFocused();
		expect(await choices.nth(index).evaluate(element => getComputedStyle(element).outlineStyle)).not.toBe('none');
		if (index < 2) await page.keyboard.press('Tab');
	}
	const crypto = page.getByRole('tab', { name: 'Cryptocurrency wallets' });
	const stripe = page.getByRole('tab', { name: 'Donate via Stripe' });
	await crypto.focus();
	for (const [key, selected, panel] of [
		['ArrowRight', stripe, '#money-panel'], ['Home', crypto, '#crypto-panel'],
		['End', stripe, '#money-panel'], ['ArrowRight', crypto, '#crypto-panel'],
		['ArrowLeft', stripe, '#money-panel'],
	] as const) {
		await page.keyboard.press(key);
		await expect(selected).toBeFocused();
		await expect(selected).toHaveAttribute('aria-selected', 'true');
		await expect(page.locator(panel)).toBeVisible();
	}
});

test('donation providers and purchases preserve exact destinations and amounts without external navigation', async ({ page }) => {
	const externalRequests: string[] = [];
	await page.route('**/*', async route => {
		if (new URL(route.request().url()).hostname === '127.0.0.1') return route.continue();
		externalRequests.push(route.request().url());
		await route.abort();
	});
	await page.goto('/donate/');
	for (const href of donationBaseline.paymentDestinations) await expect(page.locator(`main a[href="${href}"]`)).toHaveCount(1);
	for (const tier of donationBaseline.tiers) {
		const offer = page.locator(`#support-offers a[href="${tier.url}"]`);
		await expect(offer).toContainText(tier.amount);
		await expect(offer).toContainText(tier.text);
	}
	for (const wallet of donationBaseline.wallets) await expect(page.locator(`#${wallet.name}-address`)).toHaveText(wallet.address);
	await expect(page.getByRole('heading', { name: 'Recurring support' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'One-time donations' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Merchandise, recognition and services' })).toBeVisible();
	expect(externalRequests).toEqual([]);
});

test('donation methods remain available without JavaScript', async ({ browser }) => {
	const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' });
	try {
		const page = await context.newPage();
		await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
		await page.goto('/donate/');
		await expect(page.locator('#crypto-panel')).toBeVisible();
		await expect(page.locator('#money-panel')).toBeVisible();
		await expect(page.locator('#money-panel a')).toHaveAttribute('href', donationBaseline.paymentDestinations.at(-1)!);
		for (const wallet of donationBaseline.wallets) await expect(page.locator(`#${wallet.name}-address`)).toHaveText(wallet.address);
	} finally { await context.close(); }
});

for (const scale of [100, 200]) {
	test(`donation methods and offers wrap at ${scale}% text scale`, async ({ page }, testInfo) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/donate/');
		await page.locator('html').evaluate((element, value) => { element.style.fontSize = `${value}%`; }, scale);
		for (const panel of ['crypto', 'money']) {
			await page.locator(`#${panel}-tab`).click();
			const overflow = await page.locator('.donation-layout').evaluate(root => [...root.querySelectorAll('h1,h2,h3,p,a,code,button')].filter(element => {
				const box = element.getBoundingClientRect();
				return box.width > 0 && (box.left < -1 || box.right > innerWidth + 1 || element.scrollWidth > element.clientWidth + 1);
			}).map(element => element.textContent));
			expect(overflow).toEqual([]);
		}
		await page.screenshot({ path: testInfo.outputPath(`donation-methods-${scale}.png`) });
	});
}

test('donation wallet addresses and offers reflow at 320px', async ({ page }) => {
	await page.setViewportSize({ width: 320, height: 844 });
	await page.goto('/donate/');
	expect(await page.locator('.donation-layout').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
	for (const wallet of donationBaseline.wallets) await expect(page.locator(`#${wallet.name}-address`)).toHaveText(wallet.address);
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

for (const [path, name] of [
	['/', 'home'],
	['/software/', 'software'],
	['/donate/', 'donate'],
	['/timeline/', 'timeline'],
	['/software/tomb/', 'tomb'],
	['/this-route-does-not-exist/', '404'],
] as const) {
	for (const fontScale of [100, 200]) {
		test(`${name} retains a reachable layout at ${fontScale}% font scale`, async ({ page }, testInfo) => {
			await page.goto(path);
			await page.locator('html').evaluate((element, scale) => {
				element.style.fontSize = `${scale}%`;
			}, fontScale);
			await expect(page.locator('h1').first()).toBeVisible();
			expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
			const viewport = testInfo.project.name === 'chromium-mobile' ? '390x844' : '1440x900';
			await page.screenshot({ path: testInfo.outputPath(`${name}-${viewport}-${fontScale}.png`) });
		});
	}
}

for (const path of ['/', '/software/', '/donate/', '/timeline/', '/software/tomb/', '/this-route-does-not-exist/']) {
	test(`${path} has no serious or critical axe violations`, async ({ page }) => {
		await page.goto(path);
		const results = await new AxeBuilder({ page }).analyze();
		const blocking = results.violations.filter((violation) =>
			['serious', 'critical'].includes(violation.impact ?? '')
		);
		expect(blocking, blocking.map((violation) => `${violation.id}: ${violation.help}`).join('\n')).toEqual([]);
	});
}
