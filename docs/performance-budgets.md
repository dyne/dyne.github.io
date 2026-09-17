# Performance budgets

Production builds enforce these deterministic budgets in `test/performance-budget.test.mjs`:

- Homepage HTML: at most 300 KiB.
- Total built client JavaScript in `dist/_astro`: at most 150 KiB.
- Largest built client JavaScript asset: at most 110 KiB.
- Initial homepage browser resources: at most 2.5 MiB and 30 resource requests.
- Initial homepage cumulative layout shift: at most 0.1.

Run the deterministic checks with:

```sh
npm test
npm run test:e2e
```

Lighthouse is advisory because its synthetic score varies with runtime and network conditions. To capture an optional report, build and preview the site, then run:

```sh
npx -y lighthouse@12 http://127.0.0.1:4321/ --only-categories=performance --output=html --output-path=output/lighthouse/homepage.html
```

Treat a performance score of 90 or higher as a review signal; do not use it as a release gate in this repository.
