# Astro major-upgrade baseline

This is the reproducible Astro 5 contract for the major-upgrade plan. It is
deliberately timestamp-free: run the commands below from a clean checkout to
regenerate and compare it.

```sh
npm ci
node --version
npm --version
sha256sum package-lock.json
npm run build
DYNE_REMOTE_CONTENT_OFFLINE=1 npm run build
npm test
npm run test:e2e
```

## Toolchain and package contract

- CI policy: Node `24.11.1` (`.github/workflows/deploy.yml`); the captured
  clean local install used Node `24.19.0` and npm `11.17.0`.
- `package-lock.json` SHA-256:
  `fc7ef1a0a266c1bb7aabf3ff9528955522f99c509afb82e9ea05524b9ba5c416`.
- Resolved direct framework packages: Astro `5.18.2`, Vite `6.4.3`, MDX
  `4.3.14`, Partytown `2.1.7`, Sitemap `3.7.3`, Svelte integration `7.2.5`,
  Svelte `5.56.10`, Tailwind integration `6.0.2`, and Tailwind `3.4.17`.
- `npm ci` succeeds with the known `glob@10.5.0` deprecation warning and npm's
  four pending install-script approvals; neither changes generated output.

## Static artifact contract

- Online and offline builds both complete with **77 HTML pages**, 34 sitemap
  URLs, 43 static redirect stubs, and the same five JavaScript assets.
- Every normal HTML route has canonical `https://dyne.org` plus its route;
  redirect pages canonically identify their destination. `npm test` enforces
  this, the sitemap, redirects, internal references, public resources, and
  performance budgets.
- Machine-readable resources: `robots.txt`, `sitemap-index.xml`,
  `sitemap-0.xml`, `llms.txt`, and `openapi.json`.
- JavaScript assets (bytes): `TimelineHome.l3SzlO3r.js` 3291,
  `TimelinePage.kt8vxFx5.js` 5463, `client.svelte.DJJImWRv.js` 1132,
  `colors.CV83I4QF.js` 105736, and `render.D7ZL3tbh.js` 31975. Total:
  147597; largest: 105736. Homepage HTML: 257748 bytes online, 257093 bytes
  offline. These remain within 300 KiB HTML, 150 KiB total JS, and 110 KiB
  largest-JS budgets.
- Browser matrix: Playwright runs `chromium-desktop` (1440x900) and
  `chromium-mobile` (390x844, DPR 3, touch) through its configured preview
  server. Failure-only traces/screenshots live under `output/playwright/` and
  are not committed.

### Sorted routes

`/`, `/404.html`, `/99mq/`, `/awards/`, `/blog/`, `/books/`, `/branding/`,
`/connessioni_leggendarie/`, `/conspire/`, `/contact/`, `/diversity-plan/`,
`/diversity/`, `/donate/`, `/dyndy/`, `/equality-plan/`, `/equality/`,
`/feed/`, `/free-beer/`, `/freej/`, `/gestalt-concept/`, `/globaleaks/`,
`/how-open-is-the-future/`, `/i_love_you/`,
`/internet-hackers-y-software-libre/`, `/jaromail/`, `/link_in_bio/`,
`/linktree/`, `/m2m-radio/`, `/museum/`, `/netsukuku/`,
`/networking-net-art/`, `/open-letter-to-the-free-software-movement/`,
`/privacy/`, `/promptline/`, `/rastasoft/`, `/romecall/`, `/shop/`,
`/silente-sonoro/`, `/software-libero-in-italia/`, `/software/`,
`/software/autorg/`, `/software/darkfi/`, `/software/darkice/`,
`/software/decodeos/`, `/software/devuan/`, `/software/dowse/`,
`/software/dynebolic/`, `/software/freej/`, `/software/frei0r/`,
`/software/gitzone/`, `/software/harvest/`, `/software/hasciicam/`,
`/software/jaro-mail/`, `/software/jmx/`, `/software/mactomb/`,
`/software/muse/`, `/software/socialwallet/`, `/software/sup/`,
`/software/tbt/`, `/software/tomb/`, `/software/tortv/`,
`/software/webnomad/`, `/software/yubiswitch/`, `/software/zenbridge/`,
`/software/zenroom/`, `/software/zshaolin/`, `/speaking-out-loud/`,
`/syncstarter/`, `/the-first-devuan-conference/`, `/timeline/`, `/tomb/`,
`/ulterior-states-bitcoin-documentary/`, `/warscape-sonata/`,
`/weaver-birds/`, `/working-computer-museum/`, `/writings/`, and
`/zencode-w3c-vc/`.

### Redirect and sitemap contract

The 43 redirect sources are the redirect-route subset above. Their exact
destinations are derived from the source frontmatter and are asserted by
`test/static-redirects.test.mjs`; all preserve a zero-delay meta refresh,
canonical destination, visible link, and no-JavaScript recovery. Sitemap URLs
are the 34 canonical, non-redirect routes asserted by
`test/machine-indexes.test.mjs`. This query prints both sorted pairs and URLs
from a fresh build without remote-feed data:

```sh
node --input-type=module -e "import{promises as f}from'node:fs';import p from'node:path';const d='dist',a=[];const w=async x=>{for(const e of await f.readdir(x,{withFileTypes:true})){const q=p.join(x,e.name);e.isDirectory()?await w(q):a.push(q)}};await w(d);for(const q of a.filter(x=>x.endsWith('.html')).sort()){const h=await f.readFile(q,'utf8'),u=h.match(/http-equiv=[\"']refresh[\"'][^>]*url=([^\"']+)/i)?.[1];if(u)console.log('/'+p.relative(d,q).replace(/index\\.html$/,''),u)}"
```

## Online/offline delta

`DYNE_REMOTE_CONTENT_OFFLINE=1` bypasses only `loadPlanetDyneFeed()` and uses
`src/fixtures/planet-dyne-feed.json`. Routes, canonicals, sitemap, redirect
pairs, machine resources, JS asset names/sizes, accessibility contract, and
budgets are identical. The homepage HTML is 655 bytes smaller offline because
the bounded newsletter feed content differs; `test/remote-content.test.mjs`
owns the fallback semantics.

## Exact target matrix and acceptance gate

Registry discovery on 2026-08-24 (recorded versions, not a floating `latest`)
and disposable-manifest resolution select:

| Boundary | Astro / Vite | Official integrations and runtime | CSS / Markdown |
| --- | --- | --- | --- |
| Astro 5 rollback | `5.18.2` / `6.4.3` | current lockfile above | Tailwind 3 + `@astrojs/tailwind` |
| Astro 6 checkpoint | `6.4.8` / resolved `7.3.6` | MDX `6.0.3`, markdown-satteri `0.3.0`, Partytown `2.1.7`, Sitemap `3.7.3`, Svelte `8.1.2`, Svelte `5.56.10` | Tailwind `4.3.3` + `@tailwindcss/vite` `4.3.3` |
| Astro 7 final | `7.2.6` / resolved `8.2.2` | MDX `7.0.8`, markdown-remark `7.2.4`, Partytown `2.1.7`, Sitemap `3.7.3`, Svelte `9.0.1`, Svelte `5.56.10` | retain Tailwind `4.3.3` + Vite plugin; use `unified()` until the remark/rehype fixture proves Sätteri equivalent |

Astro 6/7 require Node `>=22.12.0`; the pinned CI Node 24 policy satisfies
that constraint. The temporary manifests resolved with no peer or engine
errors. The current `@astrojs/tailwind@6.0.2` peer range is only Astro 3–5,
so it cannot cross the Astro 6 boundary: move the Tailwind-Vite-plugin work
into that checkpoint or revise the plan ordering before dependency edits.

Use [Astro 6 upgrade](https://docs.astro.build/en/guides/upgrade-to/v6/),
[Astro 7 upgrade](https://docs.astro.build/en/guides/upgrade-to/v7/),
[Astro Markdown processors](https://docs.astro.build/en/guides/markdown-content/),
and [Vite migration](https://vite.dev/guide/migration) as the governing
compatibility references. Each boundary rolls back by reverting only its
accepted checkpoint commit.

`npm audit --json` currently exits 1 with 2 high, 5 low, and 0 critical
findings. The high-path evidence is: direct `astro@5.18.2` at
`node_modules/astro`, affecting MDX, Svelte, Tailwind, and SEO integrations,
with `GHSA-2pvr-wf23-7pc7` (`<6.4.6`) and `GHSA-8hv8-536x-4wqp` (`<6.3.3`);
and transitive `sharp` at `node_modules/sharp`, via Astro, with
`GHSA-f88m-g3jw-g9cj` (`<0.35.0`). The static-only deployment has no SSR or
server-island runtime, but this is exposure reduction rather than an audit
exception: the fixed-version evidence is Astro `>=6.4.6` / `>=6.3.3` and Sharp
`>=0.35.0`. Astro 7.2.6 is outside every current Astro advisory range.

The temporary `scripts/validate-npm-audit.mjs` policy covers only the three
high IDs above. The final Astro 7 resolved tree must have **zero high and
critical advisories**, with no new allowlist entry. Audit acceptance also
requires `npm test`, `npm run test:e2e`, online/offline builds, and the static
contract above to pass.

## Compatibility inventory and ownership

## Astro 7 Markdown processor decision

Use `@astrojs/markdown-remark` with `processor: unified()` for the Astro 7
checkpoint. The site depends on `remark-gfm` tables/task lists and
`rehype-raw` raw-HTML handling; those are explicit semantic contracts, not
incidental byte-level output. Native Sätteri evaluation was not performed in
this Astro 5 checkpoint: the repository's npm policy rejects project-scoped
disposable installs with `EALLOWSCRIPTS`. That limitation is deterministic and
does not alter the conservative choice: Sätteri must not be selected until an
Astro 7 executor can reproduce these plugin-dependent fixtures without
deprecated `remarkPlugins`/`rehypePlugins` configuration.

The Astro 7 executor must replace the current top-level `markdown.remarkPlugins`
and `markdown.rehypePlugins` settings with the supported Markdown Remark
integration and `unified()` configuration in the same dependency change. Keep
`remark-gfm`, `rehype-raw`, and the Dracula Shiki theme initially. The removal
criterion is a future Sätteri evaluation where the semantic-DOM fixtures in
`test/markdown-processor-contracts.test.mjs` pass with equivalent headings,
raw HTML, links/images, code blocks, and visible text; only then may the Remark
integration and its legacy plugins be removed in a dedicated reviewed change.

| Surface | Current result | Later owner, test boundary, rollback symptom |
| --- | --- | --- |
| `Astro.glob` / legacy collection flags | absent | `finish-content-layer-compatibility`; inventory test; removed-API build error |
| Content Layer | `src/content.config.ts` imports `getCollection`/`render` consumers from `astro:content` | `finish-content-layer-compatibility`; content/order tests; missing collections or render failure |
| Vite glob and assets | supported eager `import.meta.glob` in `src/pages/software/index.astro`; `?raw` SVG in `src/pages/index.astro`; `~` alias in config | `upgrade-dependencies-to-astro-six`; software/alias tests; broken URLs or imports |
| Markdown/MDX | `remark-gfm`, `rehype-raw`, raw HTML and MDX components | `decide-markdown-processor`; semantic DOM fixtures; lost GFM/raw HTML/components |
| Template directives | `set:html`, `is:inline`, and `define:vars` appear in layouts, homepage, Swiper, donate and 404 | `harden-astro-markup-for-rust-compiler`; structural/render tests; unsafe/malformed HTML or hydration break |
| Svelte islands | `client:only` timeline and `client:visible` homepage timeline | `stabilize-astro-seven-artifact`; browser timeline tests; hydration failure |
| Tailwind | `@apply` plus dynamic `bg-${...}` in WhoWeAre; dynamic classes in timeline Svelte | `migrate-tailwind-vite-plugin`; emitted-CSS/computed-style tests; missing utility CSS |
| Config/integrations | static output; Tailwind, Partytown, Sitemap redirect filter, Svelte, MDX; Vite alias only | `upgrade-dependencies-to-astro-six`; build/config checks; peer/config failure |
| Redirects/remote endpoint | Markdown redirect layout; bounded Planet Dyne RSS loader and fallback | `stabilize-astro-six-artifact`; redirect/remote tests; lost recovery or offline build failure |
| `src/fetch.*` / custom Vite plugins | absent; `src/components/timeline/dataProcess/fetch.ts` is not reserved `src/fetch.ts` | `upgrade-dependencies-to-astro-seven`; inventory test; advanced-routing collision |
