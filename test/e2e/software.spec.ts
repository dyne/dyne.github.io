import { expect, test } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
import { canonicalSoftwareId } from '../../src/lib/software-catalog.mjs';

const local = JSON.parse(readFileSync('src/content/software.json', 'utf8'));
const expectedIds = [...new Set([...local.map(project => project.id), ...readdirSync('src/pages/software').filter(path => path.endsWith('.md')).map(path => canonicalSoftwareId(path.slice(0, -3)))])];

test('authored catalog and honest actions work without JavaScript', async ({ browser, baseURL }) => {
	const context = await browser.newContext({ javaScriptEnabled: false });
	try {
		const page = await context.newPage(); await page.goto(`${baseURL}/software/`);
		const ids = await page.locator('[data-project-id]').evaluateAll(nodes => nodes.map(node => node.getAttribute('data-project-id')));
		expect(new Set(ids).size).toBe(ids.length);
		for (const id of expectedIds) expect(ids).toContain(id);
		const jumps = page.getByRole('navigation', { name: 'Software by purpose' });
		await expect(jumps.getByRole('link')).toHaveCount(5);
		await jumps.getByRole('link', { name: 'General', exact: true }).click();
		await expect(page).toHaveURL(/#software-general$/);
		await expect(page.locator('#software-general').getByRole('heading', { name: 'General', exact: true })).toBeVisible();
		await expect(page.locator('#software-general [data-project-id="gestalt"]')).toBeAttached();
		await expect(page.locator('[data-project-id="devuan"]').getByRole('link', { name: 'Download', exact: true })).toHaveAttribute('href', 'https://files.devuan.org/');
		await expect(page.locator('[data-project-id="harvest"]').getByRole('link', { name: 'Documentation', exact: true })).toHaveAttribute('href', '/software/harvest');
		for (const link of await page.locator('[data-software-catalog] a').filter({ hasText: /^Download$/ }).all()) expect(await link.getAttribute('href')).not.toMatch(/github\.com/);
	} finally { await context.close(); }
});

for (const scale of [100, 200]) {
	test(`catalog content and actions reflow at ${scale}% text scale`, async ({ page }) => {
		await page.goto('/software/'); await page.locator('html').evaluate((el, value) => { el.style.fontSize = `${value}%`; }, scale);
		const titleOverflow = await page.locator('h1').evaluate(node => {
			const range = document.createRange(); range.selectNodeContents(node);
			return [...range.getClientRects()].some(rect => rect.left < -1 || rect.right > innerWidth + 1);
		});
		expect(titleOverflow).toBe(false);
		const overflow = await page.locator('[data-software-catalog]').evaluate(root => [...root.querySelectorAll('a,p')].filter(node => {
			const range = document.createRange(); range.selectNodeContents(node);
			return [...range.getClientRects()].some(rect => rect.left < -1 || rect.right > innerWidth + 1);
		}).map(node => node.textContent));
		expect(overflow).toEqual([]);
	});
}

test('catalog supports keyboard focus, reduced motion and 320px reflow', async ({ page }) => {
	await page.setViewportSize({ width: 320, height: 844 }); await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto('/software/');
	const website = page.locator('#devuan').getByRole('link', { name: 'Project website', exact: true });
	await website.focus(); await expect(website).toBeFocused();
	expect(await website.evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe('none');
	await page.keyboard.press('Tab'); await expect(page.locator('#devuan').getByRole('link', { name: 'Download', exact: true })).toBeFocused();
	const overflow = await page.locator('[data-software-catalog]').evaluate(root => [...root.querySelectorAll('a,p')].filter(node => {
		const range=document.createRange(); range.selectNodeContents(node);
		return [...range.getClientRects()].some(rect=>rect.left < -1 || rect.right > innerWidth + 1);
	}).map(node=>node.textContent));
	expect(overflow).toEqual([]);
});

test('purpose jumps support keyboard navigation and transfer focus to the chosen section', async ({ page }) => {
	await page.goto('/software/');
	const jumps = page.getByRole('navigation', { name: 'Software by purpose' });
	await jumps.getByRole('link', { name: 'Creative media', exact: true }).focus();
	await page.keyboard.press('Tab');
	const operatingSystems = jumps.getByRole('link', { name: 'Operating systems', exact: true });
	await expect(operatingSystems).toBeFocused();
	expect(await operatingSystems.evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe('none');
	await page.keyboard.press('Enter');
	await expect(page).toHaveURL(/#software-operating-systems$/);
	await expect(page.locator('#software-operating-systems')).toBeFocused();
	await page.keyboard.press('Tab'); await expect(page.locator('#devuan a').first()).toBeFocused();
});
