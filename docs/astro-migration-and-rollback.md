# Astro 7 migration, release verification, and rollback

This site is a static GitHub Pages deployment. The final framework boundary is
Astro 7; it is not an adapter or server-runtime migration.

## Supported matrix

| Component | Final version or policy |
| --- | --- |
| Node in GitHub Actions | `24.11.1` |
| Astro / resolved Vite | `7.4.12` / `8.3.8` |
| MDX / Markdown Remark | `8.1.6` / `7.3.9` with `unified()` |
| Partytown / Sitemap / Svelte integration | `2.1.9` / `3.7.5` / `9.1.6` |
| Svelte | `5.56.10` |
| Tailwind / Vite plugin | `4.3.3` / `4.3.3` |

The current Astro and MDX releases require Node `>=22.23.4`; the CI pin meets that requirement.
The migration keeps the Content Layer (`src/content.config.ts`), static output,
the GitHub Pages base/origin, and the existing Vite alias. Markdown deliberately
uses `@astrojs/markdown-remark` with `unified()`, `remark-gfm`, and
`rehype-raw`: the site relies on GFM and raw-HTML fixtures that have not yet
been proven equivalent under native Sätteri.

MDX 8 delegates MDX processing to the configured Markdown processor. Its
[migration notes](https://github.com/withastro/astro/blob/main/packages/integrations/mdx/CHANGELOG.md#800)
require Markdown Remark `>=7.3.0` when using `unified()`; the current version
meets that requirement. The existing configuration keeps `remark-gfm` and
`rehype-raw` active. Regression checks cover MDX headings, emphasis, links and
imported Astro components with props, alongside the Markdown compatibility
fixtures. No content or homepage changes are required for this upgrade.

Partytown 2.1.9 also copies sandbox iframe HTML into `dist/~partytown/`.
These third-party runtime documents are not authored site pages and do not
carry the site's title, description, canonical or explicit-body conventions.
Metadata and document-structure checks exclude only that root asset tree;
all authored HTML, including redirects and error pages, remains covered.

Astro 7 uses its Rust compiler and the default `compressHTML: 'jsx'` setting.
The generated-HTML and text-spacing contracts pass without an override.
`fetchFile: null` is intentionally not configured: the repository has no
`src/fetch.*` conflict and no advanced-routing behavior to disable.

Primary references are the [Astro 6 guide](https://docs.astro.build/en/guides/upgrade-to/v6/),
[Astro 7 guide](https://docs.astro.build/en/guides/upgrade-to/v7/),
[Markdown documentation](https://docs.astro.build/en/guides/markdown-content/),
and [Vite migration guide](https://vite.dev/guide/migration).

## Reproduce the release gates

Run these from a clean checkout using the CI Node version:

```sh
npm ci
npm run build
DYNE_REMOTE_CONTENT_OFFLINE=1 npm run build
npm test
npx playwright install chromium
npm run test:e2e
npm audit --audit-level=high
git diff --check
```

`npm test` validates generated routes, canonicals, redirects, Content Layer,
machine-readable resources, output budgets, dependency policy, and workflow
policy. `npm run test:e2e` serves the built static artifact, not the dev
server, in desktop and mobile Chromium profiles, including no-JavaScript,
reduced-motion, accessibility, and layout checks. The Playwright preview
command explicitly sets `ASTRO_PREVIEW_BACKGROUND=0`; Astro 7 otherwise
backgrounds a preview when it detects an agent process, which is incompatible
with Playwright's attached web-server lifecycle.

The production artifact must contain 77 site HTML routes, 34 sitemap URLs, and the
machine resources `robots.txt`, `sitemap-index.xml`, `sitemap-0.xml`,
`llms.txt`, and `openapi.json`. `/.well-known/nostr.json` is copied from the
upstream identity service with sorted names so its serialized content is
reproducible even if the upstream changes object-key order. See
`docs/astro-upgrade-baseline.md` for baseline route, performance, and online /
offline expectations.

Third-party runtime HTML under `~partytown/` is additional to the site-route
inventory; it is copied unchanged by the integration.

There are no high- or critical-severity audit exceptions. Do not add an
allowlist; update the affected dependency instead.

### Local clean-room certification record

Two independent clean worktrees at `ef09e60` plus the certification changes
were installed with npm `11.17.0` on Node `24.19.0`. Each completed the command
set above with 34 Node tests and 80 Playwright tests passing (two tests are
intentionally skipped), zero high/critical audit findings, 77 generated HTML
routes, and 34 sitemap URLs. Both used lockfile SHA-256
`35aa81e15d3eb80bdc305c3807fe8598690d7cc1a339bf439d9a4df92b0a7fc9` and
produced the same sorted-file content hash:
`00141a7529c37b3fb772044cc72d84099f7bf19a0520046ba42224f33241b037`.
This is local evidence only; it is not a substitute for the CI Node 24.11.1
run or a GitHub-hosted artifact.

## GitHub Pages release boundary

Local gates do not deploy. A pull request must run the SHA-pinned
`.github/workflows/deploy.yml` gates: workflow contract, lockfile install,
audit, production build, browser test of the uploaded `site-dist` artifact,
and Pages artifact packaging. Only a successful push to `main` may deploy;
the deployment job consumes the verified Pages artifact. GitHub Pages cannot
add HTTP response headers, so this static site must not use a meta CSP to
claim `frame-ancestors` enforcement.

Before accepting a release, inspect the downloaded `site-dist` and Pages
artifacts rather than rebuilding in a browser job. Compare route inventory,
canonicals, links, machine resources, and the recorded artifact hashes. A
local clean-room run is evidence of reproducibility, not evidence that a PR
workflow or a Pages deployment completed.

At the time this certification record was written, no pull request or workflow
run existed for `plan/astro-major-upgrade`. Create the PR after its reviewed
certification commit is pushed, then record the run URL, commit SHA, and
downloaded-artifact comparison before merging or deploying.

## Rollback boundaries

Each boundary is a conventional commit and can be reverted without rewriting
history. Start by choosing the narrowest boundary that removes the observed
regression, then rerun the verification commands above.

| Scope | Accepted boundary | Non-destructive recovery |
| --- | --- | --- |
| Source compatibility preflight | `e7fa4bf fix: preflight Astro source compatibility` | `git revert e7fa4bf` only when undoing preflight-only behavior is intended. |
| Astro 6 and Tailwind 4 checkpoint | `05771a4 feat: migrate Astro 6 and Tailwind 4` | `git revert 05771a4` restores Astro 5-era framework and Tailwind integration together. Do not use it merely for an Astro 7 compiler issue. |
| Astro 7 and Vite 8 checkpoint | `ef09e60 feat: migrate Astro 7 and Vite 8` | `git revert ef09e60` returns to the accepted Astro 6/Tailwind 4 checkpoint. This is the normal recovery for an Astro 7, Vite 8, compiler, Markdown, or hydration regression. |
| Final certification changes | the reviewed conventional certification commit | `git revert <certification-commit>` removes only release-harness, deterministic-artifact, and documentation changes. |

To revert the whole upgrade, revert the Astro 7 checkpoint first, then the
Astro 6/Tailwind 4 checkpoint, resolving conflicts only after checking whether
later unrelated work depends on them. To roll back Tailwind only, first
establish that the defect is CSS-scanning/theme behavior rather than Astro 7;
then create a dedicated reviewed change that restores the Astro 5-compatible
Tailwind integration and its package matrix. Do not partially revert the
Astro 6 checkpoint in an emergency branch without re-running the full suite:
Astro 6 and Tailwind 4 were accepted as one compatibility boundary.
