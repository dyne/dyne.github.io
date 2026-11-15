import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const scale of [100, 200]) {
	test(`contact channels wrap and remain separate at ${scale}% text scale`, async ({ page }, testInfo) => {
		await page.goto('/contact/');
		await page.locator('html').evaluate((element, value) => { element.style.fontSize = `${value}%`; }, scale);
		await expect(page.locator('.channels li')).toHaveCount(29);
		const defects = await page.locator('[data-participation]').evaluate(root => {
			const issues: string[] = [];
			for (const element of root.querySelectorAll('h2,h3,h4,p,a,address')) {
				const box = element.getBoundingClientRect();
				if (box.left < -1 || box.right > innerWidth + 1 || element.scrollWidth > element.clientWidth + 1) issues.push(element.textContent ?? '');
			}
			for (const list of root.querySelectorAll('.channels')) {
				const boxes = [...list.children].map(element => element.getBoundingClientRect());
				for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
					if (boxes[i].left < boxes[j].right && boxes[i].right > boxes[j].left && boxes[i].top < boxes[j].bottom && boxes[i].bottom > boxes[j].top) issues.push('overlapping channels');
				}
			}
			return issues;
		});
		expect(defects).toEqual([]);
		await page.getByRole('heading', { name: 'Dyne.org welcome chat', exact: true }).scrollIntoViewIfNeeded();
		await page.screenshot({ path: testInfo.outputPath(`contact-channels-${scale}.png`) });
	});
}

test('contact supports keyboard routes, 320px reflow and reduced motion', async ({ page }) => {
	await page.setViewportSize({ width: 320, height: 844 });
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/contact/');
	const navigation = page.getByRole('navigation', { name: 'Participation routes' });
	const links = navigation.getByRole('link');
	await links.first().focus();
	for (let index = 0; index < 3; index++) {
		await expect(links.nth(index)).toBeFocused();
		const outline = await links.nth(index).evaluate(element => getComputedStyle(element).outlineStyle);
		expect(outline).not.toBe('none');
		if (index < 2) await page.keyboard.press('Tab');
	}
	await page.keyboard.press('Enter');
	await expect(page).toHaveURL(/#foundation$/);
	expect(await page.locator('[data-participation]').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
});

test('contact keeps all participation links without JavaScript', async ({ browser }) => {
	const context = await browser.newContext({ javaScriptEnabled: false });
	try {
		const page = await context.newPage();
		await page.goto('/contact/');
		await expect(page.locator('.channels a')).toHaveCount(29);
		await page.getByRole('navigation', { name: 'Participation routes' }).getByRole('link', { name: 'Contribute to a project' }).click();
		await expect(page).toHaveURL(/#contribute$/);
		await expect(page.getByRole('link', { name: 'GitHub: explore the code' })).toHaveAttribute('href', 'https://socials.dyne.org/github');
	} finally { await context.close(); }
});

test('contact has no serious or critical accessibility violations', async ({ page }) => {
	await page.goto('/contact/');
	const results = await new AxeBuilder({ page }).analyze();
	expect(results.violations.filter(item => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
});
