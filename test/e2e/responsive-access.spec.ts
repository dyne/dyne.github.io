import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/software/', '/contact/', '/donate/'];

test('desktop navigation leaves space around the logo at enlarged text', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	for (const route of routes) {
		await page.goto(route); await page.locator('html').evaluate(element => { element.style.fontSize = '200%'; });
		await page.evaluate(() => document.fonts.ready);
		const clear = await page.locator('header').evaluate(header => {
			const logo = header.querySelector('svg')!.getBoundingClientRect();
			return [...header.querySelectorAll('#d-link-container a')].every(link => {
				const box = link.getBoundingClientRect(); return box.left >= logo.right + 16 && box.right <= innerWidth;
			});
		});
		expect(clear).toBe(true);
	}
});

for (const route of routes) {
	test(`${route} recovers open mobile navigation across the desktop breakpoint`, async ({ page }, testInfo) => {
		await page.setViewportSize({ width: 390, height: 844 }); await page.goto(route);
		const trigger = page.locator('[data-aw-toggle-menu]');
		const menu = page.getByRole('navigation', { name: 'Mobile navigation', exact: true });
		await trigger.click();
		await menu.getByRole('link', { name: 'Software', exact: true }).focus();
		await expect(page.locator('#content')).toHaveJSProperty('inert', true);
		await page.setViewportSize({ width: 1440, height: 900 });
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
		await expect(menu).toBeHidden(); await expect(trigger).toBeHidden();
		await expect(page.locator('#content')).toHaveJSProperty('inert', false);
		await expect(page.locator('footer')).toHaveJSProperty('inert', false);
		await expect(page.locator('body')).not.toHaveClass(/overflow-hidden/);
		const desktopLink = page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Software', exact: true });
		await expect(desktopLink).toBeFocused(); await expect(desktopLink).toBeVisible();
		await page.screenshot({ path: testInfo.outputPath(`breakpoint-${route.replaceAll('/', '') || 'home'}-desktop-recovered.png`) });
		await page.setViewportSize({ width: 390, height: 844 });
		await expect(trigger).toBeFocused(); await expect(trigger).toBeVisible();
		await expect(menu).toBeHidden();
		await page.keyboard.press('Enter'); await expect(menu).toBeVisible();
		await expect(page.locator('#content')).toHaveJSProperty('inert', true);
		await page.keyboard.press('Escape'); await expect(trigger).toBeFocused();
		await expect(page.locator('#content')).toHaveJSProperty('inert', false);
		await expect(page.locator('body')).not.toHaveClass(/overflow-hidden/);
		// Exercise the exact Tailwind lg boundary as well as the requested sizes.
		await page.setViewportSize({ width: 1023, height: 900 }); await trigger.click();
		await page.setViewportSize({ width: 1024, height: 900 });
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
		await expect(page.locator('#content')).toHaveJSProperty('inert', false);
		await expect(page.locator('footer')).toHaveJSProperty('inert', false);
		await expect(page.locator('body')).not.toHaveClass(/overflow-hidden/);
		await expect(desktopLink).toBeFocused(); await expect(desktopLink).toBeVisible();
	});

	test(`${route} keeps enlarged text and footer within a 320px viewport`, async ({ page }) => {
		await page.setViewportSize({ width: 320, height: 844 });
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto(route);
		await page.locator('html').evaluate(element => { element.style.fontSize = '200%'; });
		await page.evaluate(() => document.fonts.ready);
		expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
		await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
		await page.locator('footer').scrollIntoViewIfNeeded();
		const footer = await page.locator('footer').evaluate(element => {
			const logo = element.querySelector('svg')!.getBoundingClientRect();
			return [...element.querySelectorAll('a[aria-label]')].filter(link => link.getBoundingClientRect().width > 0).map(link => {
				const box = link.getBoundingClientRect();
				return { within: box.left >= 0 && box.right <= innerWidth, clear: box.top >= logo.bottom || box.left >= logo.right };
			});
		});
		expect(footer.every(item => item.within && item.clear)).toBe(true);
		const trigger = await page.locator('[data-aw-toggle-menu]').boundingBox();
		expect(trigger!.y + trigger!.height).toBeLessThan(0);
	});

	test(`${route} provides equivalent mobile navigation without JavaScript`, async ({ browser }) => {
		const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
		try {
			const page = await context.newPage(); await page.goto(route);
			const navigation = page.getByRole('navigation', { name: 'Main navigation without JavaScript' });
			await expect(navigation).toBeVisible();
			await expect(navigation.getByRole('link', { name: 'Software', exact: true })).toHaveAttribute('href', '/software');
			await expect(navigation.getByRole('link')).toHaveCount(6);
			await expect(page.locator('[data-aw-toggle-menu]')).toBeHidden();
		} finally { await context.close(); }
	});
}

test('mobile menu supports touch, keyboard containment, scrolling and Escape at enlarged text', async ({ page }, testInfo) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');
	await page.locator('html').evaluate(element => { element.style.fontSize = '200%'; });
	const trigger = page.locator('[data-aw-toggle-menu]');
	if (testInfo.project.use.hasTouch) await trigger.tap();
	else await trigger.click();
	const menu = page.getByRole('navigation', { name: 'Mobile navigation', exact: true });
	await expect(menu).toBeVisible();
	await expect(menu.getByRole('link').first()).toBeFocused();
	await menu.getByRole('link').last().focus();
	await page.keyboard.press('Tab'); await expect(trigger).toBeFocused();
	await page.keyboard.press('Shift+Tab'); await expect(menu.getByRole('link').last()).toBeFocused();
	await menu.getByRole('link', { name: 'Donate', exact: true }).focus();
	await expect(menu.getByRole('link', { name: 'Donate', exact: true })).toBeInViewport();
	await page.keyboard.press('Escape'); await expect(trigger).toBeFocused();
	await expect(menu).toBeHidden();
	await expect(page.locator('#content')).toHaveJSProperty('inert', false);
	await expect(page.locator('body')).not.toHaveClass(/overflow-hidden/);
	await trigger.focus(); await page.keyboard.press('Enter');
	const results = await new AxeBuilder({ page }).analyze();
		expect(results.violations.filter(item => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
	await page.keyboard.press('Escape');
});

test('homepage support copy and action fit enlarged text', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 }); await page.goto('/');
	await page.locator('html').evaluate(element => { element.style.fontSize = '200%'; });
	const defects = await page.locator('[data-home-participation]').evaluate(root => [...root.querySelectorAll('h2,p,a')].map(element => {
		const box = element.getBoundingClientRect(); return box.left >= 0 && box.right <= innerWidth && element.scrollWidth <= element.clientWidth + 1;
	}));
	expect(defects.every(Boolean)).toBe(true);
});

test('enlarged mobile homepage sections keep their restored order without overlap or clipped titles', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 }); await page.goto('/');
	await page.locator('html').evaluate(element => { element.style.fontSize = '200%'; });
	await page.evaluate(() => document.fonts.ready);
	const hero = await page.locator('[data-home-hero]').boundingBox();
	const background = await page.locator('#who-we-are > div').first().boundingBox();
	expect(hero!.y + hero!.height).toBeLessThanOrEqual(background!.y + 1);
	const newsletter = await page.locator('[data-home-newsletter]').boundingBox();
	const announcement = await page.locator('a[href="https://dynebolic.org"]').boundingBox();
	expect(newsletter!.y + newsletter!.height).toBeLessThanOrEqual(announcement!.y + 1);
	for (const id of ['who-we-are', 'timeline']) {
		const title = page.locator(`#${id} > div > div > div`).first();
		expect(await title.evaluate(element => {
			const box = element.getBoundingClientRect(); return box.left >= 0 && box.right <= innerWidth && element.scrollWidth <= element.clientWidth + 1;
		})).toBe(true);
	}
});

for (const route of ['/software/', '/contact/']) {
	test(`${route} keeps enlarged title words intact`, async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 }); await page.goto(route);
		await page.locator('html').evaluate(element => { element.style.fontSize = '200%'; });
		await page.evaluate(() => document.fonts.ready);
		const fragments = await page.locator(route === '/software/' ? 'h1,.catalog-group > h2' : 'h1').evaluateAll(headings => headings.flatMap(heading => {
			const text = heading.firstChild;
			if (!text || text.nodeType !== Node.TEXT_NODE) return ['missing heading text'];
			return [...(text.textContent ?? '').matchAll(/\S+/g)].filter(word => {
				const range = document.createRange(); range.setStart(text, word.index!); range.setEnd(text, word.index! + word[0].length);
				return range.getClientRects().length > 1;
			}).map(word => word[0]);
		}));
		expect(fragments).toEqual([]);
	});
}
