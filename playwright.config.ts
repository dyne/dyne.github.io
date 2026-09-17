import { defineConfig } from '@playwright/test';

const previewPort = Number(process.env.PLAYWRIGHT_PREVIEW_PORT ?? 4321);

export default defineConfig({
	testDir: './test/e2e',
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI
		? [['github'], ['html', { outputFolder: 'output/playwright/report', open: 'never' }]]
		: 'list',
	outputDir: 'output/playwright/test-results',
	use: {
		baseURL: `http://127.0.0.1:${previewPort}`,
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
		video: 'off',
	},
	projects: [
		{
			name: 'chromium-desktop',
			use: { browserName: 'chromium', viewport: { width: 1440, height: 900 } },
		},
		{
			name: 'chromium-mobile',
			use: {
				browserName: 'chromium',
				viewport: { width: 390, height: 844 },
				deviceScaleFactor: 3,
				isMobile: true,
				hasTouch: true,
			},
		},
	],
	webServer: {
		// Astro 7 backgrounds previews when it detects an agent process. Playwright
		// requires this command to remain attached for the duration of the suite.
		command: `ASTRO_PREVIEW_BACKGROUND=0 npm run preview -- --host 127.0.0.1 --port ${previewPort}`,
		url: `http://127.0.0.1:${previewPort}`,
		reuseExistingServer: !process.env.CI,
		timeout: 30_000,
	},
});
